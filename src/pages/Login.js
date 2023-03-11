import React, { useEffect, useRef, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { auth } from '../firebase'
import { Alert, Switch } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import VisibilityIcon from '@mui/icons-material/Visibility';
import svg from "../assets/undraw_secure_login_pdn4.svg";
import svg1 from "../assets/undraw_medical_research_qg4d.svg";
import logo from '../assets/medxCure1.png'
import google from '../assets/google-logo.png'

const Login = () => {
    const navigate = useNavigate()
    const { currentUser } = useAuth()

    useEffect(() => {
        if (currentUser) {
            navigate('/')
        }
        // eslint-disable-next-line
    }, [currentUser])

    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState({
        message: '',
        variant: '',
    })
    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(false)
    const [role, setRole] = useState('patient')
    const [admin, setAdmin] = useState(false)
    const [pic, setPic] = useState(svg)

    const changeRole = (role) => {
        setRole(role)
        emailRef.current.value = '';
        passwordRef.current.value = '';
    }

    const changetoAdmin = () => {
        setAdmin(!admin)
        changeRole('patient')
        navigate('/admin/login')
    }

    useEffect(() => {
        if (role === 'patient') {
            setPic(svg)
        } else {
            setPic(svg1)
        }
    }, [role])

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("Login was clicked!")
        try {
            setError('')
            setLoading(true)
            await login(auth, emailRef.current.value, passwordRef.current.value)
            navigate('/')
            emailRef.current.value = '';
            passwordRef.current.value = '';
        }
        catch (error) {
            setError({
                message: 'Invalid email or password!',
                variant: 'error'
            })
        }
        setLoading(false)
    }
    return (
        <div className='flex items-center flex-col'>

            <div style={{ minWidth: '1100px', minheight: 'auto', height: '600px' }} className='top-shadow flex flex-row-reverse w-full h-full justify-center'>

                {/* Right Portion */}
                <div style={{ backgroundImage: "linear-gradient(to left, #03989f, #03988a)" }} className='flex flex-col w-1/2 justify-center items-center pr-10 shadow-xl'>
                    <img src={pic} width="300px" alt="Secure Login" />
                    <p className='text-white font-bold -mb-40 mt-36 ml-8'>Admin Login <Switch color='default'
                        style={{ color: '#0D9488' }}
                        checked={admin}
                        onChange={changetoAdmin}
                        inputProps={{ 'aria-label': 'controlled' }} />
                    </p>
                </div>

                {/* Left Portion */}
                <div className='w-1/2 pt-14 px-24'>
                    <div className='min-w-full -mt-20 flex justify-center'>
                        <a className='my-10' href="/dashboard">
                            <img src={logo} width="100px" height="100px" alt="MedxCure" />
                        </a>
                    </div>
                    {/* Switch for User roles */}
                    <div className='flex flex-row min-w-full mb-8 bg-teal-600 justify-around items-center rounded-full'>
                        <button onClick={() => changeRole('patient')} className={`px-16 py-2 ${role === 'patient' ? 'bg-white text-teal-600' : 'bg-teal-600 text-white'} border-2 border-teal-600 font-medium rounded-full`}>Patient</button>
                        <button onClick={() => changeRole('doctor')} className={`px-16 py-2 ${role === 'doctor' ? 'bg-white text-teal-600' : 'bg-teal-600 text-white'} border-2 border-teal-600 rounded-full font-medium`}>Doctor</button>
                    </div>

                    {
                        error.message && <Alert style={{ position: 'absolute', width: '304px', marginTop: '-78px' }} onClose={() => setError({ message: '', variant: '' })} severity={error.variant}>{error.message}</Alert>
                    }

                    <form onSubmit={handleSubmit}>
                        <div className='flex flex-col w-full justify-center items-center'>
                            <div className='flex flex-col gap-1 w-full'>
                                <label htmlFor='email' className='text-gray-400 text-sm font-medium'>Email</label>

                                <input id="email" className="mb-3 rounded-md h-9 border-gray-200 border-2 px-2 focus:border-teal-600 focus:outline-none" type="email" ref={emailRef} required />
                            </div>

                            <div className='flex flex-col gap-1 w-full'>
                                <label htmlFor='password' className='text-gray-400 text-sm font-medium'>Password</label>
                                <input id="password" className="mb-3 rounded-md h-9 border-gray-200 border-2 px-2 focus:border-teal-600 focus:outline-none" type={`${visible ? 'text' : 'password'}`} ref={passwordRef} required />
                                <button type="button" onClick={() => setVisible(!visible)} className={`${visible ? 'text-teal-600' : 'text-gray-400'}`}>
                                    <VisibilityIcon style={{ position: 'absolute', marginLeft: '145', marginTop: '-46', scale: '0.9', cursor: 'pointer' }} className='hover:opacity-70' />
                                </button>
                            </div>
                            <div className='flex flex-row justify-between w-full -mt-2 mb-8'>
                                <div className='flex flex-row justify-center'>
                                    <input type="checkbox" id="remember" className='mr-2' />
                                    <label htmlFor='remember' className='w-full text-center font-medium text-sm opacity-40'>Remember Me</label>
                                </div>
                                <div className='text-center font-medium text-sm opacity-40 hover:text-teal-700 hover:opacity-80'>
                                    <Link to='/forgot-password'>Recover Password</Link>
                                </div>
                            </div>
                        </div>
                        <button disabled={loading} className={`w-full mt-3 h-10 rounded-md bg-teal-600 text-white hover:opacity-90`} type='submit'>Login as {role === 'patient' ? 'Patient' : 'Doctor'}</button>
                        <button disabled={loading} className={`w-full mt-3 h-10 rounded-md text-gray-400 border border-gray-200 hover:text-gray-500`} type='button'>Sign in with Google</button>
                        <img src={google} width={30} style={{ position: 'absolute', marginTop: '-34px', marginLeft: '70px' }} alt="Google" />
                    </form>
                    <div className='mt-14 w-full text-center'>
                        <p className='text-gray-400 text-sm'>Don't have an account yet?<Link to='/signup' className='text-teal-600 font-medium text-base mx-2 hover:drop-shadow-md'>Signup</Link></p>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Login