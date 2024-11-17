'use client'

import { categories } from "@/app/components/navbar/categories"
import { SafeListing, SafeUser,SafeReservations } from "@/app/types"
import React, { useCallback, useEffect, useMemo, useState } from "react"
import ListingHead from "./locationhead"
import Container from "@/app/components/container"
import ListingInfo from "./listinginfo"
import useLoginModel from "@/app/hooks/useLoginModel"
import { useRouter } from "next/navigation"
import { eachDayOfInterval, differenceInDays } from "date-fns"
import axios from "axios"
import toast from "react-hot-toast"
import ListingReservation from "./listingreservations"


const IntialDateRange = {
    startDate : new Date(),
    endDate : new Date(),
    key : 'selection'
}

interface ListingClientProps {
    reservations? : SafeReservations[]
    listing : SafeListing & {
        user : SafeUser
    }
    currentuser? : SafeUser | null
}

const ListingClient : React.FC<ListingClientProps> = ({
    listing,
    currentuser,
    reservations = []
})=>{

    const loginModel = useLoginModel()
    const router = useRouter()

    const disabledDates = useMemo(()=>{
        let dates : Date[] = [];

        reservations.forEach((reservations)=>{
            const range = eachDayOfInterval({
                start : new Date(reservations.startDate),
                end : new Date(reservations.endDate)
            });

            dates = [...dates, ...range]
        })

        return dates
    },[reservations])

    const [loading, setisloading] = useState(false)
    const [totalPrice, setTotalPrice] = useState(listing.price)
    const [dateRange, setdateRange] = useState(IntialDateRange);



    const onCreateReservation = useCallback(()=>{
        if(!currentuser){
            return loginModel.onOpen()
        }

        setisloading(true)

        axios.post('/api/reservations',{
            totalPrice,
            startDate : dateRange.startDate,
            endDate : dateRange.endDate,
            listingId : listing?.id
        })
        .then(()=>{
            toast.success("listing reserved")
            setdateRange(IntialDateRange)
            router.push('/trips')
        })
        .catch(()=>{
            toast.error("something went wrong")
        })
        .finally(()=>{
            setisloading(false)
        })
        

    },[totalPrice,dateRange,listing?.id,router,currentuser,loginModel])



    useEffect(()=>{
        if(dateRange.startDate && dateRange.endDate){
            const dayCount = differenceInDays(
              dateRange.endDate,
              dateRange.startDate
            );


            if(dayCount && listing.price){
                setTotalPrice(dayCount*listing.price)
            }else{
                setTotalPrice(listing.price)
            }

        }

    },[dateRange,listing.price])








    const category = useMemo(()=>{
        return categories.find((item)=>{
            return item.label === listing.category
        })
    },[listing.category])



    return (
      <Container>
        <div className="max-w-screen-lg mx-auto">
          <div className="flex flex-col gap-6">
            <ListingHead
              title={listing.title}
              imageSrc={listing.imageSrc}
              loactionValue={listing.loactionValue}
              id={listing.id}
              currentUser={currentuser}
            />
            <div className="grid grid-cols-7 gap-10 mt-6">
              <ListingInfo
                user={listing.user}
                description={listing.description}
                roomCount={listing.roomCount}
                guestCount={listing.guestCount}
                bathroomCount={listing.bathroomCount}
                locationValue=""
                category={category}
              />
              <div className="order-first mb-10 md:order-last md:col-span-3">
                <ListingReservation
                  price={listing.price}
                  totalPrice={totalPrice}
                  // @ts-expect-error : just ignore it
                  onChangeDate={(value) => setdateRange(value)}
                  dateRange={dateRange}
                  onSubmit={onCreateReservation}
                  disabled={loading}
                  disabledDates={disabledDates}
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    );

}

export default ListingClient
