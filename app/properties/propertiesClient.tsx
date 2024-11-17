'use client'
import  Container  from "@/app/components/container";
import { SafeListing, SafeUser } from "../types"
import Heading from "../components/Heading";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "../components/listings/listingcard";

interface PropertiesClinetProps {
  listings: SafeListing[];
  currentUser?: SafeUser | null;
}


const TripsClient: React.FC<PropertiesClinetProps> = ({
  listings,
  currentUser,
}) => {
    const router = useRouter()
    const [deletingId,setdeletingId] = useState('')

    const onCancel = useCallback((id : string)=>{
        setdeletingId(id)

        axios.delete(`/api/listings/${id}`)
        .then(()=>{
            toast.success('Lisiting deleted')
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
            title="Properties"
            subTitle="List of Your Properties"
        />
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
            {
                listings.map((listing)=>{
                    return (
                        <ListingCard
                            key={listing.id}
                            data={listing}
                            actionId={listing.id}
                            onAction={onCancel}
                            disabled={deletingId === listing.id}
                            actionLabel="Delete Proprerty"
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