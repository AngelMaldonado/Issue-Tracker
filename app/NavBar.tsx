'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { AiFillBug } from 'react-icons/ai'
import classNames from 'classnames'
import { useSession } from 'next-auth/react'
import { Box, Container, Flex } from '@radix-ui/themes'

export default function NavBar() {
  const currentPath = usePathname()
  const { status, data: session } = useSession()

  const links = [
    { label: 'Dasboard', href: '/' },
    { label: 'Issues', href: '/issues/list' }
  ]

  return (
    <nav className='border-b mb-5 px-5 py-3'>
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/"><AiFillBug /></Link>
            <ul className='flex space-x-6'>
              {links.map(({ label, href }) => (
                <li className={classNames({
                  'text-zinc-900': href === currentPath,
                  'text-zinc-500': href !== currentPath,
                  'hover:text-zinc-800 transition-colors': true
                })} key={href}>
                  <Link href={href}>{label}</Link>
                </li>
              ))}
            </ul>
          </Flex>
          <Box>
            {status === 'authenticated' && <Link href="/api/auth/signout">Log out</Link>}
            {status === 'unauthenticated' && <Link href="/api/auth/signin">Login</Link>}
          </Box>
        </Flex>
      </Container>
    </nav>
  )
}
