import Image from "next/image";
import ClientOnly from "./components/clientonly";
import Container from "./components/container";
import EmptyState from "./components/emptystate";
import getListings from "./actions/getListings";
import ListingCard from "./components/listings/listingcard";
import getCurrentUser from "./actions/getCurrentuser";

export default async function Home() {

  const isEmpty = true

  const listings = await getListings()
  const currentUser = await getCurrentUser()


  if(listings.length === 0){
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    )
  }




  return (
    <ClientOnly>
      <Container>
        <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
            {
              listings.map((listing : any)=>{
                return (
                  <ListingCard 
                    key = {listing.id}
                    data = {listing}
                    currentUser = {currentUser}
                  />
                )
              })
            }
        </div>
      </Container>
    </ClientOnly>
  );
}
