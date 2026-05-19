'use client'

import { initializePaddle, type Environments, type Paddle } from '@paddle/paddle-js'

let paddlePromise: Promise<Paddle | undefined> | null = null
let runtimeEnvironment: Environments | null = null

function maskToken(token: string) {
  const trimmed = token.trim()
  if (trimmed.length <= 12) return '(set, too short to preview)'
  return `${trimmed.slice(0, 8)}...${trimmed.slice(-4)}`
}

export function logPaddleEnvConfig() {
  const env = process.env.NEXT_PUBLIC_PADDLE_ENV
  const token = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN?.trim()

  console.log('[Paddle] NEXT_PUBLIC_PADDLE_ENV:', env ?? '(unset)')
  console.log(
    '[Paddle] NEXT_PUBLIC_PADDLE_CLIENT_TOKEN:',
    token ? maskToken(token) : '(unset)',
  )
}

function paddleEnvironmentFromPublicEnv(): Environments {
  return process.env.NEXT_PUBLIC_PADDLE_ENV === 'production' ? 'production' : 'sandbox'
}

function resolvePaddleEnvironment(): Environments {
  return runtimeEnvironment ?? paddleEnvironmentFromPublicEnv()
}

async function resolvePaddleClientToken(): Promise<string | undefined> {
  const fromBuild = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN?.trim()
  if (fromBuild) return fromBuild

  try {
    const response = await fetch('/api/billing/paddle-config', { cache: 'no-store' })
    const result = await response.json()

    if (!response.ok || !result?.clientToken) {
      console.error('[Paddle] Unable to load client token from /api/billing/paddle-config', result?.error)
      return undefined
    }

    if (result.environment === 'production' || result.environment === 'sandbox') {
      runtimeEnvironment = result.environment
    }

    return String(result.clientToken).trim()
  } catch (error) {
    console.error('[Paddle] Failed to fetch client token from /api/billing/paddle-config', error)
    return undefined
  }
}

export function initializePaddleClient() {
  if (typeof window === 'undefined') {
    return Promise.resolve(undefined)
  }

  if (paddlePromise) {
    return paddlePromise
  }

  paddlePromise = (async () => {
    logPaddleEnvConfig()

    const token = await resolvePaddleClientToken()
    const environment = resolvePaddleEnvironment()

    console.log('[Paddle] Initializing with environment:', environment)
    console.log('[Paddle] Client token:', token ? maskToken(token) : '(unset)')

    if (!token) {
      console.error(
        'Paddle checkout unavailable: set NEXT_PUBLIC_PADDLE_CLIENT_TOKEN or PADDLE_CLIENT_TOKEN on the server.',
      )
      paddlePromise = null
      return undefined
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || window.location.origin

    try {
      const paddle = await initializePaddle({
        token,
        environment,
        eventCallback: (data) => {
          console.log('[Paddle Event]', JSON.stringify(data))
        },
        checkout: {
          settings: {
            displayMode: 'overlay',
            successUrl: `${appUrl}/dashboard/billing?billing=success`,
          },
        },
      })

      if (!paddle) {
        console.error('[Paddle] initializePaddle returned no instance (CDN or init failure).')
        paddlePromise = null
        return undefined
      }

      return paddle
    } catch (error) {
      console.error('[Paddle] Initialization failed:', error)
      paddlePromise = null
      return undefined
    }
  })()

  return paddlePromise
}

export async function getPaddleClient() {
  return initializePaddleClient()
}
