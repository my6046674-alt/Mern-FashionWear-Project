import { HOME_ROUTE } from '@/constants/routes'
import logo from "@/assets/images/logo.png";

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
        <Link href={HOME_ROUTE} className="flex items-center gap-2">
                <Image 
                  src={logo}
                  alt="FashionWear"
                  height={32}
                  width={32}
                  className="h-9"
                />
                <h1 className="text-2xl font-bold mt-1 text-transparent bg-linear-to-r from-primary to-secondary bg-clip-text">
                  FashionWear
                </h1>
              </Link>
  )
}

export default Logo