import axios from "axios";
import { useCallback,useMemo } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { SafeUser } from "../types";
import useLoginModel from "./useLoginModel";

interface IuseFavourites {
    listingid : string,
    currentUser? : SafeUser | null
}

const useFavourite = ({
    listingid,
    currentUser
} : IuseFavourites)=>{
    const router = useRouter()
    const loginmodel = useLoginModel()
    
    const hasFavourited = useMemo(()=>{
        const list = currentUser?.favouriteIds || []
        return list.includes(listingid);
    },[currentUser,listingid])

    const toggleFavourite = useCallback(async(
        e : React.MouseEvent<HTMLDivElement>
    )=>{
        e.stopPropagation();

        if(!currentUser){
            return loginmodel.onOpen()
        }

        try {
            let request;
            if(hasFavourited){
                request = ()=>axios.delete(`/api/favorites/${listingid}`)
            }else{
                request = ()=>axios.post(`/api/favorites/${listingid}`)
            }

            await request()
            router.refresh()
            toast.success("Success")
        }catch(e){
            console.log(e)
            toast.error("something went wrong")
        }



    },[
        currentUser,
        hasFavourited,
        listingid,
        loginmodel,
        router
    ])

    return {hasFavourited, toggleFavourite};

}

export default useFavourite

