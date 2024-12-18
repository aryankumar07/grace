import Avatar from "@/app/components/avatar";
import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types"
import React from "react";
import { IconType } from "react-icons";
import ListingCategory from "./listingcategory";
import dynamic from "next/dynamic";

const Map = dynamic(()=>import('@/app/components/map'),{
    ssr : false
})

interface ListingInfoProps {
  user: SafeUser;
  category:
    {
        icon: IconType;
        label: string;
        description: string;
      }
    | undefined;
  description: string;
  roomCount: number;
  guestCount: number;
  bathroomCount: number;
  locationValue: string;
}

const ListingInfo : React.FC<ListingInfoProps> = ({
    user,
    category,
    description,
    roomCount,
    guestCount,
    bathroomCount,
    locationValue
})=>{

    const { getByValue } = useCountries()

    const cord = getByValue(locationValue)?.latlng

    return (
        <div className="col-span-4 flex flex-col gap-8">
            <div className="flex flx-col gap-2">
                <div className="text-xl font-semibold flex flex-row items-center gap-2">
                    <div>Hosted By : { user?.name } </div>
                    <Avatar src={user.image} />
                </div>
               <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
                <div>
                    { roomCount.toString() } rooms
                </div>
                <div>
                    { guestCount.toString() } guests
                </div>
                <div>
                    {bathroomCount.toString()} bathrooms
                </div>
               </div>
            </div>
            <hr />
            {
                category && (
                    <ListingCategory 
                        icon = {category.icon}
                        label = {category.label}
                        description = {category.description}
                    />
                )
            }
            <hr />
            <div className="text-lg font-light text-neutral-500">
                {description}
            </div>
            <hr />
            <Map center={cord!} />
        </div>
    )
}

export default ListingInfo