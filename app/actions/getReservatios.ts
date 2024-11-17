import prisma from '@/app/libs/prismadb'
import { Reservations } from '@prisma/client'

interface Iparams {
    listingId? : string,
    userId? : string,
    authorId? : string
}

export default async function getReservations(params:Iparams) {

    try{
        const {listingId,userId,authorId} = params

        const query : Record<string,unknown> = {}

        if(listingId){
            query.listingId = listingId
        }

        if(userId){
            query.userId = userId
        }

        if(authorId){
            query.listings = {userId : authorId}
        }


        const reservations = await prisma.reservations.findMany({
            where : query,
            include : {
                listings : true
            },
            orderBy : {
                createdAt : 'desc'
            }
        })

        const safeReservations = reservations.map(
          (reservation: Reservations) => ({
            ...reservation,
            createdAt: reservation.createdAt.toISOString(),
            startDate: reservation.startDate.toISOString(),
            endDate: reservation.endDate.toISOString(),
            listings: {
              // @ts-expect-error : just ignore it
              ...reservation.listings,
              // @ts-expect-error : just ignore it
              createdAt: reservation.listings.createdAt.toISOString(),
            },
          })
        );

        return safeReservations

    }catch(error){
        console.log(error)
    }
}