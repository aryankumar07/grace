import prisma  from "@/app/libs/prismadb";


export default async function getListings() {
    try{
        const listings = await prisma.listings.findMany({
            orderBy : {
                createdAt : 'desc'
            }
        })
        const safeListing = listings.map((listing)=>{
            return {
                ...listing,
                createdAt : listing.createdAt.toISOString()
            }
        })
        return safeListing
    }catch (error : any) {
        throw new Error(error);
    }
}