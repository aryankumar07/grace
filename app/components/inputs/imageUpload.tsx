'use client'

import { CldUploadWidget } from "next-cloudinary"
import Image  from 'next/image'
import React, { useCallback } from "react"
import { TbPhotoPlus } from "react-icons/tb"  



declare global {
    let cloudinary : unknown
}


interface ImageUplaodProps {
    onChange : (value : string) => void,
    value : string
}



const ImageUpload : React.FC<ImageUplaodProps> = ({
    value,
    onChange
}) => {

    const imageUpload = useCallback((result : unknown)=>{
      // @ts-expect-error : just ignore it
      onChange(result.info.secure_url);
    },[onChange])

    return (
      <div>
        <CldUploadWidget
        onSuccess={imageUpload}
          uploadPreset="go41q2rm"
          options={{
            maxFiles : 1
          }}
        >
            {({open})=>{
                return (
                    <div 
                    onClick={()=>open?.()}
                    className="relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col items-center justify-center gap-4 text-neutral-600">
                        <TbPhotoPlus size={50} />
                        <div className="font-semibold text-lg">
                            Click To Upload
                        </div>
                        {value && (
                            <div className="absolute inset-0 w-full h-full">
                                <Image alt="upload" fill style={{objectFit : 'cover'}} src={value} />
                            </div>
                        )}
                    </div>
                )
            }}
        </CldUploadWidget>
      </div>
    );
}

export default ImageUpload