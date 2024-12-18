'use client'

import useCountries from "@/app/hooks/useCountries";
import React from "react";
import Select from "react-select";

export type CountrySelectValue = {
    flag : string,
    label : string,
    latlng : number[],
    region : string,
    value : string
}

interface CountrySelectProps {
    value : CountrySelectValue | undefined,
    onchange : (value : CountrySelectValue) => void
}

const CountrySelect : React.FC<CountrySelectProps> = ({
    value,
    onchange
})=>{

    const { getAll } = useCountries();


    return (
        <div>
            <Select 
                placeholder="Anywhere"
                isClearable
                options={getAll()}
                value={value}
                onChange={(value)=>onchange(value as CountrySelectValue)}
                formatOptionLabel={(Option)=>(
                    <div className="flex flex-row items-center gap-3">
                        <div>{Option.flag}</div>
                        <div>
                            {Option.label}
                            <span className="text-neutral-500 ml-1">
                                {Option.region}
                            </span>
                        </div>
                    </div>
                )}
                classNames={{
                    control: ()=> 'p-3 border-2',
                    input : ()=> 'text-lg',
                    option : ()=> 'text-lg',
                }}
                theme={(theme)=>({
                    ...theme,
                    borderRadius: 6,
                    colors : {
                        ...theme.colors,
                        primary : 'black',
                        primary25 : "#ffe4e6"
                    }
                })}
             />
        </div>
    )
}


export default CountrySelect;