import React from 'react'
import { Main } from '@/components/Main/Main'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <Main>{children}</Main>
}
