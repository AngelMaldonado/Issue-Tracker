import Link from 'next/link'
import React from 'react'
import { AiFillBug } from 'react-icons/ai'

export default function NavBar() {
  const links = [
    { label: 'Dasboard', href: '/' },
    { label: 'Issues', href: '/issues' }
  ]
  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
      <Link href="/"><AiFillBug /></Link>
      <ul className='flex space-x-6'>
        {links.map(({ label, href }) => (
          <li className='text-zinc-500 hover:text-zinc-800 transition-colors' key={href}>
            <Link href={href}>{label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
