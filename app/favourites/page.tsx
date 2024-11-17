import getCurrentUser from "../actions/getCurrentuser"
import EmptyState from "../components/emptystate"
import ClientOnly from "../components/clientonly"
import getFavourite from "../actions/getFavourite"
import FavouriteClient from "./favouirteclinet"



const FavouritePage = async ()=>{

    const currentUser = await getCurrentUser()
    const favourites = await getFavourite()

    if(favourites.length === 0){
        return (
            <ClientOnly>
                <EmptyState
                    title="No Favourites Found"
                    subTitle="Looks Like You dont have a favourite listing"
                />
            </ClientOnly>
        )
    }



    return (
        <ClientOnly>
            <FavouriteClient
                favourites={favourites}
                currentUser={currentUser}
            />
        </ClientOnly>
    )
}

export default FavouritePage

export const dynamic = "force-dynamic";