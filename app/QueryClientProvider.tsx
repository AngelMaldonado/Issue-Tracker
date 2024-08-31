"use client"
import { PropsWithChildren } from 'react'
import { QueryClient, QueryClientProvider as ReactQueryClientProivder } from 'react-query'

const queryClient = new QueryClient()

export default function QueryClientProvider({ children }: PropsWithChildren) {
  return (
    <ReactQueryClientProivder client={queryClient}>
      {children}
    </ReactQueryClientProivder>
  )
}
