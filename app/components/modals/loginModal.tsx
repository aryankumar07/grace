'use client'
import { signIn } from 'next-auth/react'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc' 
import { useCallback, useState } from 'react'
import { FieldValues,useForm} from 'react-hook-form'
import useLoginModel from '../../hooks/useLoginModel'
import useRegisterModel from '@/app/hooks/useRegisterModal'
import Modal from './Modal'
import Heading from '../Heading'
import Input from '../inputs/Input'
import {toast} from 'react-hot-toast'
import Button from '../button'
import { useRouter } from 'next/navigation'

const LoginModal = ()=>{
    const router = useRouter()
    const loginModal = useLoginModel()
    const registerModal = useRegisterModel()
    const [isLoading,setIsloading] = useState(false)

    const {
        register,
        handleSubmit,
        formState : {
            errors
        },
    } = useForm<FieldValues>({
        defaultValues : {
            email : '',
            password : ''
        }
    })

    const toggle = useCallback(() => {
      loginModal.onClose();
      registerModal.onOpen();
    }, [loginModal, registerModal]);

    const onSubmit =  (data : FieldValues)=>{
        setIsloading(true)

        signIn('credentials',{
            ...data,
            redirect : false
        })
        .then((callback)=>{
            setIsloading(false)

            if(callback?.ok){
                toast.success('Successfull Loged IN')
                router.refresh()
                loginModal.onClose()
            }

            if(callback?.error){
                toast.error(callback.error)
            }

        })

    }

    const bodyContent = (
        <div className='flex flex-col gap-4'>
             <Heading title='Welcone Back ' subTitle='Vist your Grace'/>
             <Input id='email' label='Email' disabled={isLoading} register={register} errors={errors} required/>
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
                        First Time Using Grace?
                    </div>
                    <div 
                    onClick={toggle}
                     className='text-neutral-800 cursor-pointer hover:underline'>
                        Register
                    </div>
                </div>
            </div>
        </div>
    )



    return (
        <Modal
        disabled = {isLoading}
        isOpen = {loginModal.isOpen}
        title='Login'
        actionLabel='Continue'
        onClose={loginModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
        />
    )
}

export default LoginModal