'use client'
import React from "react";
import { SafeReservations, SafeUser } from "../types"
import axios from "axios";
import { toast } from "react-hot-toast";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import Heading from "../components/Heading";
import Container from "../components/container";
import ListingCard from "../components/listings/listingcard";


interface ReservationClientProps {
  reservations: SafeReservations[];
  currentUser?: SafeUser | null;
}


const ReservationClient : React.FC<ReservationClientProps> = ({
    reservations,
    currentUser
})=>{

    const [deleteingId, setdeletingId] = useState('')
    const router = useRouter()

    const onCancel = useCallback((id : string)=>{
        setdeletingId(id)

        axios.delete(`/api/reservations/${id}`)
        .then(()=>{
            toast.success('reservation Cancelled')
            router.refresh()
        })
        .catch((error : any)=>{
            toast.error('something went wrong')
        })
        .finally(()=>{
            setdeletingId('')
        })
    },[router])




    return (
        <Container>
            <Heading
                title="Resrevations"
                subTitle="booking on your properties"
            />
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                {
                    reservations.map((reservation)=>
                        <ListingCard
                            key={reservation.id}
                            data={reservation.listings}
                            reservation={reservation}
                            actionId={reservation.id}
                            onAction={onCancel}
                            disabled={deleteingId === reservation.id}
                            actionLabel="Cancel Guests reservation"
                            currentUser={currentUser}
                        />
                    )
                }
            </div>
        </Container>
    )
}

export default ReservationClient