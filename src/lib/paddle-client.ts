'use client'

import { initializePaddle, type Environments, type Paddle } from '@paddle/paddle-js'

let paddlePromise: Promise<Paddle | undefined> | null = null

function paddleEnvironment(): Environments {
  return process.env.NEXT_PUBLIC_PADDLE_ENV === 'production' ? 'production' : 'sandbox'
}

export function initializePaddleClient() {
  if (typeof window === 'undefined') {
    return Promise.resolve(undefined)
  }

  if (paddlePromise) {
    return paddlePromise
  }

  const token = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN
  if (!token) {
    console.error('NEXT_PUBLIC_PADDLE_CLIENT_TOKEN is not configured.')
    return Promise.resolve(undefined)
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || window.location.origin

  paddlePromise = initializePaddle({
    token,
    environment: paddleEnvironment(),
    checkout: {
      settings: {
        displayMode: 'overlay',
        successUrl: `${appUrl}/dashboard/billing?billing=success`,
      },
    },
  })

  return paddlePromise
}

export async function getPaddleClient() {
  return initializePaddleClient()
}
