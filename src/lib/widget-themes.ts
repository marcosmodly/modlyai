// Single source of truth for named widget colour presets, shared by the
// dashboard settings form and the /demo page so a preset picked in one
// place is findable by the same name in the other.
export type WidgetTheme = {
  id: string
  name: string
  primaryColor: string
  titleColor: string
  messageTextColor: string
  // A real CSS font-family stack, not a Tailwind class - this has to render
  // correctly inside the standalone widget bundle shipped to merchant sites
  // (no next/font webfonts available there), so web-safe fonts only.
  fontFamily: string
}

const SANS_STACK = 'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif'
const SERIF_STACK = 'Georgia, "Times New Roman", serif'

// White title text on each primaryColor is WCAG AA (>=4.5:1) at every entry
// below (Brass is tightest at 5.02:1) - don't darken titleColor or lighten
// a primaryColor without re-checking contrast.
export const WIDGET_THEMES: WidgetTheme[] = [
  { id: 'charcoal', name: 'Charcoal', primaryColor: '#1F2937', titleColor: '#FFFFFF', messageTextColor: '#1F2937', fontFamily: SERIF_STACK },
  { id: 'forest', name: 'Forest', primaryColor: '#3D543F', titleColor: '#FFFFFF', messageTextColor: '#1F2937', fontFamily: SANS_STACK },
  { id: 'walnut', name: 'Walnut', primaryColor: '#7A4A2B', titleColor: '#FFFFFF', messageTextColor: '#1F2937', fontFamily: SERIF_STACK },
  { id: 'brass', name: 'Brass', primaryColor: '#8A6A2F', titleColor: '#FFFFFF', messageTextColor: '#1F2937', fontFamily: SANS_STACK },
]
