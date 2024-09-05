'use client'
import { Grip } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import IconButton from '../IconButton'

const Header = () => {
  return (
    <header>
        <div className="flex items-center-space-x-2">
            {/* <Sidebar />  */}
            <Link href="/" className='flex items-center space-x-1'>
            <img src="test forge.jpg" className='w-24' alt="" />
            <p className='text-xl text-neutral-500'>Forms</p></Link>
        </div>

<div className='flex itsm-center'>
    <IconButton Icon={Grip} />

</div>

    </header>
  )
}

export default Header