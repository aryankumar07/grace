'use client'

import { TbBeach, TbMountain, TbPool } from "react-icons/tb"
import Container from "../container"
import { GiBarn, GiBoatFishing, GiCactus, GiCaveEntrance, GiDiamonds, GiForestCamp, GiIsland, GiWindmill } from "react-icons/gi"
import { MdOutlineVilla } from "react-icons/md";
import CategoryBox from "../categoryBox";
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";




export const categories = [
  {
    label: "Beach",
    icon: TbBeach,
    description: "This Property is close to the beach",
  },
  {
    label: "WindMills",
    icon: GiWindmill,
    decsription: "This Property has windmills",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    decsription: "This Property is mordern",
  },
  {
    label: "CountrySide",
    icon: TbMountain,
    decsription: "This Property is countryside",
  },
  {
    label: "Pools",
    icon: TbPool,
    decsription: "This Property has a pool",
  },
  {
    label: "islands",
    icon: GiIsland,
    decsription: "This Property is on a lake",
  },
  {
    label: "Lake",
    icon: GiBoatFishing,
    decsription: "This Property is on a lake",
  },
  {
    label: "sking",
    icon: FaSkiing,
    decsription: "This Property has skiing activities",
  },
  {
    label: "camping",
    icon: GiForestCamp,
    decsription: "This Property is near a forest",
  },
  {
    label: "artic",
    icon: BsSnow,
    decsription: "This Property is near snow",
  },
  {
    label: "cave",
    icon: GiCaveEntrance,
    decsription: "This Property is near a cave",
  },
  {
    label: "desert",
    icon: GiCactus,
    decsription: "This Property is in the desert",
  },
  {
    label: "barns",
    icon: GiBarn,
    decsription: "This Property is in the barn",
  },
  {
    label: "lux",
    icon: GiDiamonds,
    decsription: "This Property is luxuroius",
  },

];


const Categories = () => {

    const param = useSearchParams()
    const pathname = usePathname();

    const category = param?.get('category')

    const mainpage = pathname === '/'

    if(!mainpage){
        return null;
    }


    return (
        <Container>
            <div className="flex flex-row items-center justify-between overflow-x-scroll">
                {
                    categories.map((item,index)=>(
                        <CategoryBox key={index} label={item.label} selected={category === item.label}  icon={item.icon}/>
                    ))
                }
            </div>
        </Container>
    )
}

export default Categories
