'use client'

import { useRouter } from "next/navigation"
import React from "react"
import Heading from "./Heading"
import Button from "./button"

interface EmptyStateProps {
    title? : string,
    subTitle? : string,
    showReset? : boolean 
}

const EmptyState : React.FC<EmptyStateProps> = ({
    title = "No exact matches",
    subTitle = "Try changing or removing some of the filters",
    showReset
})=>{

    const router = useRouter()

    return (
        <div className="h-[60vh] flex flex-col gap-2 justify-center items-center ">
            <Heading center title={title} subTitle={subTitle}/>
            <div className="w-48 mt-4">
                {
                    showReset && (
                        <Button 
                            outline
                            label="Remove All Filters"
                            onClick={() => router.push('/')}
                        />
                    )
                }
            </div>
        </div>
    )
}

export default EmptyState