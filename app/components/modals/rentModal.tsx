'use client'
import useRentModel from "@/app/hooks/useRentModel"
import Modal from "./Modal"
import { useMemo, useState } from "react"
import Heading from "../Heading"
import { categories } from "../navbar/categories"
import CategoryInput from "../inputs/categoryInput"
import { FieldValues, useForm } from "react-hook-form"
import CountrySelect from "../inputs/countrySelect"
import dynamic from "next/dynamic"


enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}


const RentModel = ()=>{

    const rentModel = useRentModel()

    const {
      register,
      handleSubmit,
      getValues,
      setValue,
      watch,
      formState: { errors },
    } = useForm<FieldValues>({
      defaultValues: {
        category: '',
        location: null,
        guestCount: 1,
        roomCount: 1,
        bathroomCount: 1,
        imageSrc: "",
        price: 1,
        title: '',
        description : '',
      },
    });

    const category = watch('category')
    const location = watch('location')

    const Maps = useMemo(() => dynamic(() => import('../map'),{
      ssr : false
    }) ,[location])

    const setCustomValue = (id : string, value : any)=>{
        setValue(id,value,{
            shouldDirty : true,
            shouldTouch : true,
            shouldValidate : true,
        })
    }


    const [step, setStep] = useState(STEPS.CATEGORY);

    const onBack = () => {
      setStep((prev) => prev - 1);
    };

    const onNext = () => {
      setStep((prev) => prev + 1);
    };

    const actionLabel = useMemo(() => {
      if (step === STEPS.PRICE) {
        return "create";
      }
      return "next";
    }, [step]);

    const secondartactionLabel = useMemo(() => {
      if (step === STEPS.CATEGORY) {
        return "undefined";
      }

      return "back";
    }, [step]);

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
                title="Which Text Describe Your Place the best?"
                subTitle="Pick a Category"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
                {categories.map((item,index)=>{
                    return (
                        <div key={item.label} className="col-span-1">
                            <CategoryInput
                                onClick={(category)=>{
                                    setCustomValue('category',category);
                                }}
                                selected={category === item.label}
                                label={item.label}
                                icon={item.icon}
                            />
                        </div>
                    )
                })}
            </div>
        </div>
    )

    if(step === STEPS.LOCATION){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Where is Your Place Located?"
                    subTitle="help Guest Find You!" />
                  <CountrySelect
                  value={location}
                  onchange={ (value) => {
                      console.log(value)
                      setCustomValue("location", value);
                  }}/>
                <Maps center={location?.latlng} />
            </div>
        )
    }


    return (
        <Modal 
        isOpen = {rentModel.isOpen}
        onClose={rentModel.onClose}
        onSubmit={onNext}
        actionLabel={actionLabel}
        secondaryActionLabel={secondartactionLabel}
        secondaryAction={step===STEPS.CATEGORY ? undefined : onBack}
        title="AirBnb Your Home"
        body={bodyContent}
        />
    )
}

export default RentModel