import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentuser";

export default async function getFavourite() {
    try{
        const currentuser = await getCurrentUser();

        if(!currentuser){
            return []
        }

        const favourites =  await prisma.listings.findMany({
            where : {
                id : {
                    in: [...(currentuser.favouriteIds || [])]
                }
            }
        })

        const safeFav = favourites.map((favourite)=>{
            return {
                ...favourite,
                createdAt : favourite.createdAt.toISOString() 
            }
        })

        return safeFav

    }catch(error : any){
        throw new Error(error)
    }
}
