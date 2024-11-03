import Heading from "@/app/components/Heading";
import HeartButton from "@/app/components/heartbutton";
import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types"
import Image from "next/image";

interface ListingHeadProps {
  title: string;
  imageSrc: string;
  id: string;
  currentUser?: SafeUser | null;
  loactionValue : string
}


const ListingHead : React.FC<ListingHeadProps> = ({
    title,
    imageSrc,
    id,
    currentUser,
    loactionValue
})=>{

    const { getByValue } = useCountries()

    const location = getByValue(loactionValue)

    return (
        <>
            <Heading
                title={title}
                subTitle={`${location?.region}, ${location?.label}`}
            />
            <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
                 <Image
                    alt=""
                    src={imageSrc}
                    className="object-cover w-full rounded-xl"
                    width={100}
                    height={0}
                 />
                 <div className="absolute top-5 right-5">
                    <HeartButton 
                        listingid={id}
                        currentUser={currentUser}
                    />
                 </div>
            </div>
        </>
    )
}

export default ListingHead