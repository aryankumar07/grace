'use client'
import  Container  from "@/app/components/container";
import { SafeReservations, SafeUser } from "../types"
import Heading from "../components/Heading";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "../components/listings/listingcard";

interface TripsClinetProps {
  reservations: SafeReservations[];
  currentUser?: SafeUser | null;
}


const TripsClient: React.FC<TripsClinetProps> = ({
  reservations,
  currentUser,
}) => {
    const router = useRouter()
    const [deletingId,setdeletingId] = useState('')

    const onCancel = useCallback((id : string)=>{
        setdeletingId(id)

        axios.delete(`/api/reservations/${id}`)
        .then(()=>{
            toast.success('Reservation Cancelled')
            router.refresh()
        })
        .catch((error)=>{
            toast.error(error?.response?.data?.error)
        })
        .finally(()=>{
            setdeletingId('')
        })


    },[router])

  return (
    <Container>
        <Heading
            title="Trips"
            subTitle="Where You Have Been and Where You Have Been going"
        />
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
            {
                reservations.map((reservation)=>{
                    return (
                        <ListingCard
                            key={reservation.id}
                            data={reservation.listings}
                            reservation={reservation}
                            actionId={reservation.id}
                            onAction={onCancel}
                            disabled={deletingId === reservation.id}
                            actionLabel="Cancel reservation"
                            currentUser={currentUser}
                        />
                    )
                })
            }
        </div>
    </Container>
  )
};

export default TripsClient