'use client'

import React from "react"
import { SafeListing, SafeUser } from "../types"
import Container from "../components/container"
import Heading from "../components/Heading"
import ListingCard from "../components/listings/listingcard"


interface FavouriteClientProps {
  favourites : SafeListing[],
  currentUser? : SafeUser | null
}

const FavouriteClient : React.FC<FavouriteClientProps> = ({
    favourites,
    currentUser
})=>{
    return (
        <Container>
            <Heading
                title="Favouites"
                subTitle="List of Favourites graces"
            />
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                {
                    favourites.map((favourite)=>
                        <ListingCard
                            currentUser={currentUser}
                            key={favourite.id}
                            data={favourite}
                        />
                    )
                }
            </div>
        </Container>
    )
}

export default FavouriteClient