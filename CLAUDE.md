# ModlyAI — working notes

Next.js App Router, TypeScript, Tailwind 3, InstantDB, NextAuth (JWT), Paddle billing.
A chat / room-planner / customizer widget furniture retailers embed on their storefront, plus a merchant dashboard.

`main` auto-deploys to Vercel. Never leave it in a half-refactored state.

---

## Traps — read before touching the dashboard

**`<header>` in `DashboardShell` has `backdrop-blur`.** A non-`none` `backdrop-filter` makes an element a containing block for `position: fixed` descendants, so any overlay rendered inside that subtree sizes itself to the header's ~90px box instead of the viewport. **Portal every overlay to `document.body`** with `createPortal` plus a `mounted` guard for SSR. Done already for the mobile drawer and the widget preview modal.

**`PATCH /api/stores/[storeId]` is a field-guarded partial update.** Every field gated on `typeof body.X === 'string'`; omitted keys are skipped, not nulled. That's what lets `StoreSettingsForm` and `WhiteLabelSettingsForm` write to it with different payloads. Don't replace it with a spread.

**Settings tab dirty tracking is in `src/lib/settings-tab-dirty.ts`.** Forms report their own `isDirty` via `useSettingsTabDirty(tabId)`. Panels lazily mount on first visit then persist under `hidden` — never unmounted, so switching tabs cannot discard edits. There is deliberately **no** confirm-on-switch: switching is non-destructive, and prompting on a safe action trains people to dismiss prompts.

**`FurnitureAIWidget` takes `hideNav`.** Hides the tab strip and stays in chat view — used for the inline sticky preview at storefront width. The full preview modal renders the same component without it.

**Editing widget source requires a rebuild.** `npm run build` inside `widget/` regenerates `src/generated/widget-bundle.ts`, `widget/dist/`, and `public/widget.js`. The dashboard preview imports widget *source* and updates without it; merchant storefronts don't. Stage the regenerated artifacts.

**This machine's shell mangles UTF-8 in heredocs** (`·` → `Â·`). Write anything non-ASCII with Write/Edit, and keep commit messages ASCII-only.

---

## Conventions

- **Stage by explicit path.** Never `git add -A` or `git add -u`.
- **`tsc --noEmit` and `next lint` before reporting.** 7 pre-existing lint errors are the baseline — only flag new ones.
- **`next build` is required, not optional, whenever a change touches routing, layouts, the server/client boundary, or metadata.** TypeScript has no concept of that boundary — a server component importing something that needs client context compiles clean and fails at build. The dev server is more forgiving than the production compiler, so rendering a page in dev doesn't substitute either.
- **Don't commit until asked.** Present a diff summary for review first.
- **Verify by using it, not by building it.** Type-checking proves it compiles, not that a drawer opens or a save persists. This is about not letting a green build stand in for opening the page — it is not permission to skip the build. Every bug that reached production here passed `tsc` — the hardcoded onboarding checklist, the invisible mobile drawer, a 500 on every logged-out `/dashboard/*` route, an "All time" filter silently showing 30 days. The ones caught were caught by opening the page.
- **Destructive verification gets confirmed first**, or runs against records it created itself.
- **Say what you checked and how.** Cite the line you read. Name anything you couldn't verify as unverified rather than omitting it.

---

## Architecture notes

- **Auth is in `src/middleware.ts`** (`withAuth`, matcher `/dashboard/:path*`), not per-page. It handles authentication and the `emailVerified` check. `storeId` / store-existence checks are business logic and stay in the pages.
- **Nav lives in `src/lib/dashboard-navigation.ts`** — one array shared by Sidebar and the mobile drawer, with `isDashboardNavItemActive` for prefix matching. Don't add a second list.
- **Marketing pages are in `src/app/(marketing)/`**, which owns `SiteFooter`. `/dashboard`, `/api`, and the app-surface routes (`catalog`, `configurator`, `onboarding`, `room-planner`, `store-setup`) sit outside it and get no footer. Note `Navbar.tsx` still uses its own `usePathname` list — two definitions of "marketing" that could drift.
- **The Header owns the page `<h1>`.** Page content starts at `<h2>`. The widget's own title is `<h2>` for the same reason.

See `DASHBOARD-CHANGELOG.md` for what changed in the dashboard overhaul and what's still open.
