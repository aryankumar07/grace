import { NextResponse } from "next/server";
import prisma from "../../libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentuser";


export async function POST ( 
    request : Request
) {
    console.log("entered here")

    const currentuser = await getCurrentUser()
    
    if(!currentuser){
        return NextResponse.error()
    }
    
    const body = await request.json()
    
    const {
        listingId,
        startDate,
        endDate,
        totalPrice
    } = body
    
    if(!listingId || !startDate || !endDate || !totalPrice){
        return NextResponse.error()
    }
    
    const listingandreservations = await prisma.listings.update({
        where : {
            id : listingId
        },
        data : {
            reservations : {
                create : {
                    userId : currentuser.id,
                    startDate,
                    endDate,
                    totalPrice
                }
            }
        }
    })
    return NextResponse.json(listingandreservations)
}
