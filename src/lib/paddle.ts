import { Environment, Paddle } from '@paddle/paddle-node-sdk'

function paddleEnvironment() {
  return process.env.PADDLE_ENVIRONMENT === 'production' || process.env.NEXT_PUBLIC_PADDLE_ENV === 'production'
    ? Environment.production
    : Environment.sandbox
}

let paddleClient: Paddle | null = null

export function getPaddleClient() {
  const apiKey = process.env.PADDLE_API_KEY
  if (!apiKey) {
    throw new Error('PADDLE_API_KEY is not configured.')
  }

  paddleClient ??= new Paddle(apiKey, {
    environment: paddleEnvironment(),
  })

  return paddleClient
}

export const paddle = new Proxy({} as Paddle, {
  get(_target, property, receiver) {
    const client = getPaddleClient()
    const value = Reflect.get(client, property, receiver)
    return typeof value === 'function' ? value.bind(client) : value
  },
})
