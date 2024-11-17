import ClientOnly from "../components/clientonly";
import EmptyState from "../components/emptystate";
import getCurrentUser from "../actions/getCurrentuser";
import getReservations from "../actions/getReservatios";
import TripsClient from "./Tripsclinet";

const TripsPage = async () => {

    const currentuser = await getCurrentUser();

    if(!currentuser){
        return (
            <ClientOnly>
                <EmptyState
                    title="Unauthorized user"
                    subTitle="please Login"
                />
            </ClientOnly>
        )
    }

    const reservations = await getReservations({userId : currentuser.id})


    if(reservations.length == 0){
        return (
            <ClientOnly>
                <EmptyState 
                    title="No Trips Found"
                    subTitle="Looks like you have not reserved any trips"
                />
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <TripsClient 
                reservations={reservations}
                currentUser={currentuser}
            />
        </ClientOnly>
    )


}

export default TripsPage;