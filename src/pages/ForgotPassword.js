import React, { useEffect, useRef, useState } from 'react'
import { Alert } from '@mui/material'
import { useAuth } from '../context/AuthContext'
import { auth } from '../firebase'
import { Link, useNavigate } from 'react-router-dom'
import logo from "../assets/medxCure1.png";
import svg from "../assets/undraw_forgot_password_re_hxwm.svg";

export default function ForgotPassword() {

    const navigate = useNavigate()
    const { currentUser } = useAuth()

    useEffect(() => {
        if (currentUser) {
            navigate('/')
        }
        // eslint-disable-next-line
    }, [currentUser])

    const emailRef = useRef()
    const { resetPassword } = useAuth()
    const [error, setError] = useState({
        message: '',
        variant: '',
    })
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setError('')
            setLoading(true)
            await resetPassword(auth, emailRef.current.value)
            setError({
                message: 'Check your inbox for a reset link',
                variant: 'success',
            })
            emailRef.current.value = '';
        }
        catch (error) {
            setError({
                message: 'Failed to reset password',
                variant: 'error'
            })
            // console.log(error.message)
        }
        setLoading(false)
    }
    return (
        <>
            <div className='min-w-full -mt-20 flex justify-center'>
                <a className='my-10' href="/dashboard">
                    <img src={logo} width="100px" height="100px" alt="MedxCure" />
                </a>
            </div>
            <div style={{ minWidth: '800px', minheight: 'auto', height: '500px' }} className='top-shadow rounded-2xl'>
                <div className='flex w-full h-full justify-center'>
                    <div className='flex w-1/2 bg-teal-600 rounded-l-2xl justify-center items-center pr-6'>
                        <img src={svg} width="250px" height="250px" alt="Secure Login" />
                    </div>
                    <div className='w-1/2 pt-16 px-12'>
                        <h2 className="text-center mb-10 text-2xl font-semibold">Password Reset</h2>
                        {/* {auth.currentUser && <h2 className='text-center'>{auth.currentUser.email}</h2>} */}
                        {error.message && <Alert style={{ position: 'absolute', width: '304px', marginTop: '-75px' }} onClose={() => setError({ message: '', variant: '' })} severity={error.variant}>{error.message}</Alert>}
                        <form onSubmit={handleSubmit}>
                            <div className='flex flex-col gap-1 w-full mt-14'>
                                <label htmlFor='email' className='text-gray-400 text-sm font-medium'>Email</label>
                                <input id="email" className="mb-3 rounded-md h-9 border-gray-200 border-2 px-2 focus:border-teal-600 focus:outline-none" type="email" ref={emailRef} required />
                            </div>
                            <button disabled={loading} className="w-full mt-8 h-9 rounded-md bg-teal-600 text-white hover:opacity-90" type='submit'>Reset Password</button>
                        </form>
                        <div className='mt-20 w-full text-center'>
                            <p className='text-gray-400 text-sm'>Back to <Link to='/login' className='text-teal-600 font-medium text-base hover:drop-shadow-md'>Login</Link> page</p>
                        </div>
                        <div className='mt-4 w-full text-center'>
                            <p className='text-gray-400 text-sm'>Don't have an account yet?<Link to='/signup' className='text-teal-600 font-medium text-base mx-2 hover:drop-shadow-md'>Signup</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
