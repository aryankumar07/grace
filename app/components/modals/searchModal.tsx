'use client'
import Modal from "./Modal";

import useSearchModel from "@/app/hooks/useSearchModel";
import { useSearchParams,useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { Range } from "react-date-range";
import dynamic from "next/dynamic";
import CountrySelect, { CountrySelectValue } from "../inputs/countrySelect";
import qs from "query-string";
import { formatISO } from "date-fns";
import Heading from "../Heading";
import Calender from "../inputs/calender";
import Counter from "../inputs/counter";



enum STEPS {
    LOCATION = 0,
    DATE = 1,
    INFO = 2
}

const SearchModel = ()=>{

    const searchModel = useSearchModel();
    const router = useRouter()
    const params = useSearchParams()

    const [step, setStep] = useState(STEPS.LOCATION)
    const [location, setLocation] = useState<CountrySelectValue>()
    const [guestCount , setGuestCount] = useState(1)
    const [roomCount, setRoomCount] = useState(1)
    const [bathroomCount, setBathroomCount] = useState(1)
    const [dateRange, setDateRange] = useState<Range>({
        startDate : new Date(),
        endDate : new Date(),
        key : 'selection'
    })


    const Map = useMemo(()=>dynamic(()=> import('../map'),{
        ssr : false
    }),[location])

    const onBack = useCallback(()=>{
        setStep((value)=>value-1)
    },[])

    const onNext = useCallback(()=>{
        setStep((value)=>value + 1)
    },[])


    const onSubmit = useCallback( async ()=>{
        if(step !== STEPS.INFO){
            return onNext()
        }
        let currentQuery = {}

        if(params) {
            currentQuery = qs.parse(params.toString())
        }

        const updatedQuery : unknown = {
            ...currentQuery,
            locationValue : location?.value,
            guestCount,
            roomCount,
            bathroomCount
        }

        if(dateRange.startDate){
          // @ts-expect-error : just ignore it
          updatedQuery.startDate = formatISO(dateRange.startDate);
        }

        if(dateRange.endDate){
          // @ts-expect-error : just ignore it
          updatedQuery.endDate = formatISO(dateRange.endDate);
        }

        const url = qs.stringifyUrl(
          {
            url: "/",
            // @ts-expect-error : just ignore it
            query: updatedQuery,
          },
          { skipNull: true }
        );

        setStep(STEPS.LOCATION);
        searchModel.onClose()
        router.push(url);
    },[
        step,
        searchModel,
        location,
        router,
        guestCount,
        roomCount,
        bathroomCount,
        dateRange,
        onNext,
        params
    ])

    const actionLabel = useMemo(()=>{
        if( step === STEPS.INFO ){
            return 'Search';
        }

        return 'Next'
    },[step])

    const secondaryActionLabel = useMemo(()=>{
        if( step === STEPS.LOCATION ){
            return undefined
        }

        return "Back"
    },[step])

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
                title="Where Do You Wanna Go?"
                subTitle="Find The Perfect Location!"
            />
            <CountrySelect
                value={location}
                onchange={(value)=>{
                    setLocation(value as CountrySelectValue)
                }}
            />
            <hr />
            <Map center={location?.latlng}/>
        </div>
    )

    if(step === STEPS.DATE){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="When do You plan to go"
                    subTitle="make sure everyone is free!"
                />
                <Calender
                    value={dateRange}
                    onChange={(value)=>setDateRange(value.selection)}
                />
            </div>
        )
    }

    if(step === STEPS.INFO ){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="More Infotmation"
                    subTitle="Find Your Perfect place"
                />
                <Counter
                    title="Guests"
                    SubTitle="How many guest are coming"
                    value={guestCount}
                    onChange={(value)=>setGuestCount(value)}
                />
                <Counter
                    title="Rooms"
                    SubTitle="How many Rooms do you need"
                    value={roomCount}
                    onChange={(value)=>setRoomCount(value)}
                />
                <Counter
                    title="Bathrooms"
                    SubTitle="How many bathRooms do you need"
                    value={bathroomCount}
                    onChange={(value)=>setBathroomCount(value)}
                />
            </div>
        )
    }



    return (
        <Modal
            isOpen={searchModel.isOpen}
            onClose={searchModel.onClose}
            onSubmit={onSubmit}
            title="Filters"
            actionLabel={actionLabel}
            secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
            secondaryActionLabel={secondaryActionLabel}
            body={bodyContent}
        />
    )
}

export default SearchModel