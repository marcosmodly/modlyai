'use client'

import { useEffect } from 'react'
import { initializePaddleClient } from '@/lib/paddle-client'

export default function PaddleProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    void initializePaddleClient()
  }, [])

  return <>{children}</>
}
