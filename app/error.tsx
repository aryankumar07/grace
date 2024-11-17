'use client'

import React, { useEffect } from "react"
import EmptyState from "./components/emptystate"

interface ErrorStateProps {
    error : Error
}

const ErrorState : React.FC<ErrorStateProps> = ({
    error
}) => {


    useEffect(()=>{
        console.log(error)
    },[error])

    return (
        <EmptyState
            title="oh Ho"
            subTitle="Something went wrong!"
        />
    )
}

export default ErrorState