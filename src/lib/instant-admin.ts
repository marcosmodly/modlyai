import { id, init } from '@instantdb/admin'
import schema from '../../instant.schema'

const publicAppId = process.env.NEXT_PUBLIC_INSTANTDB_APP_ID ?? process.env.NEXT_PUBLIC_INSTANT_APP_ID
const adminAppId = process.env.INSTANT_APP_ID ?? process.env.INSTANTDB_APP_ID ?? publicAppId
const adminToken = process.env.INSTANTDB_ADMIN_TOKEN

if (!publicAppId || !adminAppId || !adminToken) {
  throw new Error('InstantDB is not configured. Set NEXT_PUBLIC_INSTANTDB_APP_ID and INSTANTDB_ADMIN_TOKEN.')
}

if (publicAppId !== adminAppId) {
  throw new Error('InstantDB app ID mismatch. NEXT_PUBLIC_INSTANTDB_APP_ID must match INSTANT_APP_ID.')
}

export const adminDb = init({
  appId: adminAppId,
  adminToken,
  schema,
})

export const adminDbLenient = init({
  appId: adminAppId,
  adminToken,
})

export { id }
