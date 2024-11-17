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
import Counter from "../inputs/counter"
import ImageUpload from "../inputs/imageUpload"
import Input from "../inputs/Input"
import axios from "axios"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"


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
    const [isLoading,setisLoading] = useState(false)
    const router = useRouter()

    const {
      register,
      handleSubmit,
      setValue,
      watch,
      reset,
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
    const guestCount = watch('guestCount');
    const roomCount = watch("roomCount");
    const bathroomCount = watch("bathroomCount");
    const imageSrc = watch("imageSrc");

    const Maps = useMemo(() => dynamic(() => import('../map'),{
      ssr : false
    }) ,[location])

    const setCustomValue = (id : string, value : unknown)=>{
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

    const onSubmit = (data : FieldValues)=>{
      if(step !== STEPS.PRICE){
        return onNext();
      }

      if(data.imageSrc === ''){
        toast.error('please Provide a single Image')
        return;
      }

      setisLoading(true)
      axios.post('/api/listings',data)
      .then(()=>{
        toast.success("New Grace Has Been Created")
        router.refresh()
        reset()
        setStep(STEPS.CATEGORY)
        rentModel.onClose()
      })
      .catch(()=>{
        toast.error('Something Went Wrong')
      })
      .finally(()=>{
        setisLoading(false)
      })

    }

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
                {categories.map((item)=>{
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
                      setCustomValue("location", value);
                  }}/>
                <Maps center={location?.latlng} />
            </div>
        )
    }

    if(step === STEPS.INFO){
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading
            title="Share Some Basic About the Place"
            subTitle="What Ammeneties Do You Have"
          />
          <Counter
            title="Guest"
            SubTitle="how Many Guests"
            value={guestCount}
            onChange={(value) => setCustomValue("guestCount", value)}
          />
          <hr />
          <Counter
            title="Rooms"
            SubTitle="How Many Rooms"
            value={roomCount}
            onChange={(value) => setCustomValue("roomCount", value)}
          />
          <hr />
          <Counter
            title="BathRooms"
            SubTitle="How Many BathRoom"
            value={bathroomCount}
            onChange={(value) => setCustomValue("bathroomCount", value)}
          />
        </div>
      );
    }


    if(step === STEPS.IMAGES){
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading
            title="ADD A PHOTO OF YOUR PLACE"
            subTitle="show Your guest how does it look like"
          />
          <ImageUpload
            value={imageSrc}
            onChange={(value) => setCustomValue("imageSrc",value)}
          />
        </div>
      );
    }

    if(step === STEPS.DESCRIPTION){
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading
            title="How Would you describe Your place"
            subTitle="short and sweet works best"
          />
          <Input
            id="title"
            label="title"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <hr />
          <Input
            id="description"
            label="description"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
        </div>
      );
    }

    if(step === STEPS.PRICE){
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading 
          title="Now, set Your Price"
          subTitle="charges per Night"
          />
          <Input 
            id="price"
            label="price"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            type="number"
            formatPrice
           />
        </div>
      )
    }


    return (
        <Modal 
        isOpen = {rentModel.isOpen}
        onClose={rentModel.onClose}
        onSubmit={handleSubmit(onSubmit)}
        actionLabel={actionLabel}
        secondaryActionLabel={secondartactionLabel}
        secondaryAction={step===STEPS.CATEGORY ? undefined : onBack}
        title="AirBnb Your Home"
        body={bodyContent}
        />
    )
}

export default RentModel