'use client'

import { AiOutlineMenu } from "react-icons/ai"
import Avatar from "../avatar"
import { useCallback, useState } from "react"
import MenuItem from "./MenuItem"
import RegisterModel from "../modals/registerModal"
import useRegisterModel from "@/app/hooks/useRegisterModal"

const UserMenu = () => {

    const registerModel = useRegisterModel();

    const [isOpen, setIsOpen] = useState(false)

    const toggleOpen = useCallback(()=>{
        setIsOpen((value)=>!value)
    },[])


    return (
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <div className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
                onClick={()=>{}}
                >
                    Set Grace at Home
                </div>
                <div className="py-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
                onClick={toggleOpen}
                >
                    <AiOutlineMenu/>
                    <div>
                        <Avatar/>
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12">
                    <div className="flex flex-col cursor-pointer">
                        <>
                             <MenuItem onClick={()=>{}} label="login"/>
                             <MenuItem onClick={registerModel.onOpen} label="SignUp"/>
                        </>
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserMenu