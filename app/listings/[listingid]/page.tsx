import getCurrentUser from "@/app/actions/getCurrentuser"
import getListingById from "@/app/actions/getListingById"
import ClientOnly from "@/app/components/clientonly"
import EmptyState from "@/app/components/emptystate"
import ListingClient from "./listingclient"
import getReservations from "@/app/actions/getReservatios"

interface Iparams {
    listingId? : string
}

const ListingPage = async ( { params } : { params : Iparams} )=>{

    const listing = await getListingById(params)
    const reservations = await getReservations(params)
    const currentuser = await getCurrentUser()


    if(!listing){
        return (
            <ClientOnly>
                <EmptyState/>
            </ClientOnly>
        )
    }

    return (
        <div>
            <ListingClient
                listing = { listing }
                reservations={reservations}
                currentuser = { currentuser }
            />
        </div>
    )
}

export default ListingPage

export const dynamic = "force-dynamic";