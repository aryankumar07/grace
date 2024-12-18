'use client'

import { AiOutlineMenu } from "react-icons/ai"
import Avatar from "../avatar"
import { useCallback, useState } from "react"
import MenuItem from "./MenuItem"
import useLoginModel from '../../hooks/useLoginModel'
import useRegisterModel from "@/app/hooks/useRegisterModal"
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types"
import useRentModel from "@/app/hooks/useRentModel"
import { useRouter } from "next/navigation"


interface userMenuProps {
    currentUser? : SafeUser | null
}



const UserMenu : React.FC<userMenuProps> = ({
    currentUser
}) => {

    const registerModel = useRegisterModel();
    const loginModel = useLoginModel();
    const rentModel = useRentModel()
    const router = useRouter()

    const [isOpen, setIsOpen] = useState(false)
    

    const toggleOpen = useCallback(()=>{
        setIsOpen((value)=>!value)
    },[]);

    const onRent = useCallback(()=>{
      if(!currentUser){
        return loginModel.onOpen();
      }
      rentModel.onOpen()
    },[loginModel,currentUser,rentModel]);


    return (
      <div className="relative">
        <div className="flex flex-row items-center gap-3">
          <div
            className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
            onClick={onRent}
          >
            Set Grace at Home
          </div>
          <div
            className="py-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
            onClick={toggleOpen}
          >
            <AiOutlineMenu />
            <div>
              <Avatar src={currentUser?.image} />
            </div>
          </div>
        </div>
        {isOpen && (
          <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12">
            <div className="flex flex-col cursor-pointer">
              {currentUser ? (
                <>
                    <MenuItem onClick={()=> router.push('/trips') } label="MY Trips" />
                    <MenuItem onClick={()=> router.push('/favourites')} label="My Favourities" />
                    <MenuItem onClick={()=>router.push('/reservations')} label="My Reservations" />
                    <MenuItem onClick={()=> router.push('/favourites')} label="My Properties" />
                    <MenuItem onClick={rentModel.onOpen} label="Grace Your Home" />
                    <hr />
                    <MenuItem onClick={()=>signOut()} label="Sign Out" />
                </>
              ) : (
                <>
                  <>
                    <MenuItem onClick={loginModel.onOpen} label="login" />
                    <MenuItem onClick={registerModel.onOpen} label="SignUp" />
                  </>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    );
}

export default UserMenu