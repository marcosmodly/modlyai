import { init } from '@instantdb/react'

const APP_ID = process.env.NEXT_PUBLIC_INSTANTDB_APP_ID ?? process.env.NEXT_PUBLIC_INSTANT_APP_ID

if (!APP_ID) {
  throw new Error('InstantDB is not configured. Set NEXT_PUBLIC_INSTANTDB_APP_ID.')
}

export const db = init({ appId: APP_ID })
