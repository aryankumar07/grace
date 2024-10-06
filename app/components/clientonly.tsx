'use client'

import { useEffect, useState } from "react"

interface ClientOnlyProps {
    children : React.ReactNode;
}

const ClientOnly : React.FC<ClientOnlyProps> = ({
    children
})=>{

    const [hasmounted, sethasmounted] = useState(false)

    useEffect(()=>{
        sethasmounted(true)
    },[])

    if(!hasmounted){
        return null;
    }

    return(
        <>
            {children}
        </>
    )
}

export default ClientOnly