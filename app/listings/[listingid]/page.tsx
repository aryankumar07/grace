import getCurrentUser from "@/app/actions/getCurrentuser"
import getListingById from "@/app/actions/getListingById"
import ClientOnly from "@/app/components/clientonly"
import EmptyState from "@/app/components/emptystate"
import ListingClient from "./listingclient"

interface Iparams {
    listingid? : string | null
}

const ListingPage = async ( { params } : { params : Iparams} )=>{

    const { listingid }  = params

    const listing = await getListingById(listingid ?? '')
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
                currentuser = { currentuser }
            />
        </div>
    )
}

export default ListingPage