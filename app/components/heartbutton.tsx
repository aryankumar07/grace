'use client'

import React from "react";
import { SafeUser } from "../types";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import useFavourite from "../hooks/useFavourites";

interface HeartButtonProps {
    listingid : string,
    currentUser? : SafeUser | null
}


const HeartButton : React.FC<HeartButtonProps> = ({
    listingid,
    currentUser
})=>{

    const { hasFavourited, toggleFavourite } = useFavourite({
        listingid,
        currentUser
    });


    return (
        <div onClick={toggleFavourite} className="relative hover:opacity-80 transition cursor-pointer" >
            <AiOutlineHeart size={28} className="fill-white absolute -top-[2px] -right-[2px]"/>
            <AiFillHeart size={24} className={hasFavourited ? 'fill-rose-500' : 'fill-neutral-500'} />
        </div>
    )
}

export default HeartButton;