import EmptyState from "../components/emptystate";
import ClientOnly from "../components/clientonly";

import getCurrentUser from "../actions/getCurrentuser";
import getReservations from "../actions/getReservatios";
import ReservationClient from "./reservationsclient";

const ReservationPage = async ()=>{

    const currentUser = await getCurrentUser()

    if(!currentUser){
        return (
            <ClientOnly>
                <EmptyState
                    title="Unauthorized"
                    subTitle="Please Login"
                />
            </ClientOnly>
        )
    }

    const reservations = await getReservations({authorId : currentUser.id})

    if(reservations.length === 0){
        return (
            <ClientOnly>
                <EmptyState
                    title="No Reservations Found"
                    subTitle="Looks like No One reserved or did any booking"
                />
            </ClientOnly>
        )
    }


    return (
        <ClientOnly>
            <ReservationClient
                reservations={reservations}
                currentUser={currentUser}
            />
        </ClientOnly>
    )
}
export default ReservationPage