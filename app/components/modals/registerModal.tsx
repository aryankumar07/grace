'use client'

import axios from 'axios'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc' 
import { useCallback, useState } from 'react'
import { FieldValues,useForm,SubmitHandler } from 'react-hook-form'
import useRegisterModel from '../../hooks/useRegisterModal'
import useLoginModel from '../../hooks/useLoginModel'
import Modal from './Modal'
import Heading from '../Heading'
import Input from '../inputs/Input'
import { resolve } from 'path'
import {toast} from 'react-hot-toast'
import Button from '../button'
import { signIn } from 'next-auth/react'


const RegisterModel = ()=>{
    const registerModal = useRegisterModel()
    const loginModel = useLoginModel()
    const [isLoading,setIsloading] = useState(false)

    const {
        register,
        handleSubmit,
        formState : {
            errors
        },
        reset
    } = useForm<FieldValues>({
        defaultValues : {
            name : '',
            email : '',
            password : ''
        }
    })
    
    
    const toggle = useCallback(() => {
      registerModal.onClose();
      loginModel.onOpen();
    }, [loginModel , registerModal]);




    const onSubmit = async (data : FieldValues)=>{
        setIsloading(true)
        axios.post('/api/register',data)
        .then(()=>{
            registerModal.onClose
        })
        .catch((error)=>{
            toast.error('Something Went Wrong Fething the data')
        })
        .finally(()=>{
            setIsloading(false)
        })

        await new Promise((resolve)=>setTimeout(resolve,2000))
        reset()
        setIsloading(false)
        toast.success(' Your Grace Has Been set Active please Login ')
        registerModal.onClose()
    }

    const bodyContent = (
        <div className='flex flex-col gap-4'>
             <Heading title='Welcone To Grace' subTitle='Create an Account!'/>
             <Input id='email' label='Email' disabled={isLoading} register={register} errors={errors} required/>
             <Input id='name' label='Name' disabled={isLoading} register={register} errors={errors} required/>
             <Input id='password' type='password' label='Password' disabled={isLoading} register={register} errors={errors} required/>
        </div>
    )

    const footerContent = (
        <div className='flex flex-col gap-4 mt-3'>
            <hr />
            <Button
            outline
            label='Continue With Google'
            icon={FcGoogle}
            onClick={()=>signIn('google')}
            />
            <Button
            outline
            label='Continue With Github'
            icon={AiFillGithub}
            onClick={()=>signIn('github')}
            />
            <div className=' text-neutral-500 text-center mt-4 font-light'>
                <div className='flex flex-row justify-center items-center gap-2'>
                    <div>
                        Already Have an Account?
                    </div>
                    <div 
                    onClick={toggle}
                    className='text-neutral-800 cursor-pointer hover:underline'>
                        Log In
                    </div>
                </div>
            </div>
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
        footer={footerContent}
        />
    )
}

export default RegisterModel