
import { NextResponse } from 'next/server';
import getCurrentUser from '../../actions/getCurrentuser'
import prisma from "../../libs/prismadb";

export async function POST(
    request :Request
) {
    const currentUser = await getCurrentUser()
    const body = await request.json();

    if(!currentUser){
        NextResponse.error()
    }


    const {
        title,
        description,
        imageSrc,
        category,
        roomCount,
        bathroomCount,
        guestCount,
        price,
        location
    } = body

    Object.keys(body).forEach((value : any)=>{
        if(!body[value]){
            return NextResponse.error()
        }
    })

    const listing = await prisma.listings.create({
        data : {
            title,
            description, 
            imageSrc,
            category,
            roomCount,
            bathroomCount,
            guestCount,
            price : parseInt(price, 10),
            loactionValue : location.value,
            userId : currentUser!.id
        }
    })


    return NextResponse.json(listing)
}