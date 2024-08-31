'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { AiFillBug } from 'react-icons/ai'
import classNames from 'classnames'

export default function NavBar() {
  const currentPath = usePathname()

  const links = [
    { label: 'Dasboard', href: '/' },
    { label: 'Issues', href: '/issues/list' }
  ]

  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
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
    </nav>
  )
}
