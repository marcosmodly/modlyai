import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '@/lib/auth-options'
import { adminDb } from '@/lib/instant-admin'
import { getCurrentStoreForUser } from '@/lib/current-store'

// Deliberately separate from the NextAuth session/JWT: avatarUrl and
// storeLogoUrl can be base64 data URLs up to ~2MB, and NextAuth's session is
// stored in a browser cookie (capped around 4KB by every browser). Putting
// image data in the JWT would get silently dropped by the browser. Response
// bodies have no such limit, so this is fetched separately by any client
// component that needs to display these images (Header, Sidebar) instead of
// reading them off useSession().
export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userResult = await adminDb.query({
      users: { $: { where: { id: session.user.id } } },
    })
    const user = userResult.users?.[0]

    const store = session.user.storeId
      ? await getCurrentStoreForUser({ id: session.user.id, email: session.user.email ?? null, storeId: session.user.storeId })
      : null

    return NextResponse.json({
      name: user?.name || null,
      avatarUrl: user?.avatarUrl || null,
      controlPanelAvatarUrl: user?.controlPanelAvatarUrl || null,
      storeLogoUrl: store?.widgetLogoUrl || null,
    })
  } catch (error) {
    console.error('[Profile summary] Failed:', error)
    return NextResponse.json({ error: 'Unable to load profile.' }, { status: 500 })
  }
}
