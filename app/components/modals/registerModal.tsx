'use client'

import axios from 'axios'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc' 
import { useCallback, useState } from 'react'
import { FieldValues,useForm,SubmitHandler } from 'react-hook-form'
import useRegisterModel from '../../hooks/useRegisterModal'
import Modal from './Modal'
import Heading from '../Heading'

const RegisterModel = ()=>{
    const registerModal = useRegisterModel()
    const [isLoading,setIsloading] = useState(false)

    const {
        register,
        handleSubmit,
        formState : {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues : {
            name : '',
            email : '',
            password : ''
        }
    })


    const onSubmit = (data : FieldValues)=>{
        setIsloading(true)

        axios.post('/api/register',data)
        .then(()=>{
            registerModal.onClose
        })
        .catch(()=>{
            registerModal.onOpen
        })
        .finally(()=>{
            setIsloading(false)
        })

    }

    const bodyContent = (
        <div>
             <Heading/>
        </div>
    )



    return (
        <Modal
        disabled = {isLoading}
        isOpen = {registerModal.isOpen}
        title='Register'
        actionLabel='Continue'
        onClose={registerModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        />
    )
}

export default RegisterModel