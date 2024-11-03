import prisma from '@/app/libs/prismadb'


interface Iparams {
    listingId? : string | null
}

export default async function getListingById( listingId : string) {

    try{
        const listing = await prisma.listings.findUnique({
            where : {
                id : listingId!
            },
            include : {
                user : true
            }
        })
    
        if(!listing){
            return null;
        }
    
    
        return {
            ...listing,
            createdAt : listing.createdAt.toISOString(),
            user : {
                ...listing.user,
                createdAt : listing.user.createdAt.toISOString(),
                updatedAt : listing.user.updatedAt.toISOString(),
                emailVerified : listing.user.emailVerified?.toISOString() || null
            }
        }
    }catch(e : any){
        throw new Error(e)
    }
}