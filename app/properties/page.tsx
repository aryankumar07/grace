import ClientOnly from "../components/clientonly";
import EmptyState from "../components/emptystate";
import getCurrentUser from "../actions/getCurrentuser";
import PropertiesClient from "./propertiesClient";
import getListings from "../actions/getListings";

const propertiesPage = async () => {

    const currentuser = await getCurrentUser();

    if(!currentuser){
        return (
            <ClientOnly>
                <EmptyState
                    title="Unauthorized"
                    subTitle="please Login"
                />
            </ClientOnly>
        )
    }

    const listings = await getListings({userId : currentuser.id})


    if(listings.length == 0){
        return (
            <ClientOnly>
                <EmptyState 
                    title="No Properties Found"
                    subTitle="Looks like you have no properties"
                />
            </ClientOnly>
        )
    }

    return (
      <ClientOnly>
        <PropertiesClient
          listings={listings}
          currentUser={currentuser}
        />
      </ClientOnly>
    );


}

export default propertiesPage;

export const dynamic = "force-dynamic";