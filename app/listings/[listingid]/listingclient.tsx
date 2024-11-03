'use client'

import { categories } from "@/app/components/navbar/categories"
import { SafeListing, SafeUser } from "@/app/types"
import { Reservations } from "@prisma/client"
import React, { useMemo } from "react"
import ListingHead from "./locationhead"
import Container from "@/app/components/container"
import ListingInfo from "./listinginfo"

interface ListingClientProps {
    reservations? : Reservations[]
    listing : SafeListing & {
        user : SafeUser
    }
    currentuser? : SafeUser | null
}

const ListingClient : React.FC<ListingClientProps> = ({
    listing,
    currentuser
})=>{

    const category = useMemo(()=>{
        return categories.find((item)=>{
            return item.label === listing.category
        })
    },[listing.category])



    return (
        <Container>
            <div className="max-w-screen-lg mx-auto">
                <div className="flex flex-col gap-6">
                    <ListingHead
                        title = {listing.title}
                        imageSrc = {listing.imageSrc}
                        loactionValue = {listing.loactionValue}
                        id = { listing.id }
                        currentUser = {currentuser}
                    />
                    <div className="grid grid-cols-7 gap-10 mt-6">
                        <ListingInfo
                            user={listing.user}
                            description={listing.description}
                            roomCount = {listing.roomCount}
                            guestCount = {listing.guestCount}
                            bathroomCount = {listing.bathroomCount}
                            locationValue=""
                            category={category}
                        />
                    </div>
                </div>
            </div>
        </Container>
    )

}

export default ListingClient