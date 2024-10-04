"use client"

import Image from "next/image"

import { useRouter } from "next/router"


const Logo = ()=> {

    const router = useRouter


    return (
        <Image className="hidden md:block  cursor-pointer" 
            height={60} 
            width={60} 
            src="/images/logo.png" 
            alt="Logo" />
    )
}

export default Logo