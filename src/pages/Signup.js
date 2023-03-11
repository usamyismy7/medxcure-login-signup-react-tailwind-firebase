import React, { useEffect, useState } from 'react'
import { Alert } from '@mui/material'
import { useAuth } from '../context/AuthContext'
import { auth } from '../firebase'
import svg from "../assets/undraw_mobile_login_re_9ntv.svg";
import svg1 from "../assets/undraw_doctor_kw-5-l.svg";
import logo from "../assets/medxCure1.png";
import { Link, useNavigate } from 'react-router-dom'
import Input from '../components/Input';

const Signup = () => {
    const navigate = useNavigate()
    const { currentUser } = useAuth()

    useEffect(() => {
        if (currentUser) {
            navigate('/')
        }
        // eslint-disable-next-line
    }, [currentUser])

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
    })
    const { signup } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [role, setRole] = useState('patient')
    const [pic, setPic] = useState(svg)

    const inputs = [
        {
            id: 1,
            name: 'name',
            type: 'text',
            errormessage: 'Must not contain any digit or special character!',
            required: true,
            label: 'Name',
            pattern: '^[a-zA-Z ]+$',
        },
        {
            id: 2,
            name: 'email',
            type: 'email',
            errormessage: 'Invalid email address!',
            required: true,
            label: 'Email'
        },
        {
            id: 3,
            name: 'password',
            type: 'password',
            errormessage: 'Password must be atleast 8 characters!',
            required: true,
            label: 'Password',
            pattern: '^(?=.*[A-Za-z0-9])[A-Za-z\\d]{8,}$'
        },
    ]

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        if (role === 'patient') {
            setPic(svg)
        } else if (role === 'doctor') {
            setPic(svg1)
        }
    }, [role])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setError('')
            setLoading(true)
            await signup(auth, user.email, user.password)
            setError({
                message: 'Account created successfully',
                variant: 'success',
            })
            console.log(auth.currentUser.displayName)
            navigate('/');
            user.name = '';
            user.email = '';
            user.password = '';
        }
        catch (error) {
            setError({
                message: 'Failed to create an account',
                variant: 'error',
            })
            // console.log(error.message)
        }
        setLoading(false)
    }
    return (
        <div className='flex items-center flex-col'>

            <div style={{ minWidth: '1100px', minheight: 'auto', height: '600px' }} className='top-shadow flex flex-row w-full h-full justify-center'>

                <div style={{ backgroundImage: "linear-gradient(to right, #03989f, #03988a)" }} className='flex flex-col w-1/2 justify-center items-center pr-10 shadow-xl'>
                    <img src={pic} width="300px" alt="Secure Login" />
                </div>

                <div className='w-1/2 pt-14 px-24'>
                    <div className='min-w-full -mt-20 flex justify-center'>
                        <a className='my-10' href="/dashboard">
                            <img src={logo} width="100px" height="100px" alt="MedxCure" />
                        </a>
                    </div>
                    <h2 className="text-center -mt-6 mb-4 text-2xl font-semibold text-teal-600">Create a new account</h2>
                    <div className='flex flex-row min-w-full mb-6 bg-teal-600 justify-around items-center rounded-full'>
                        <button onClick={() => setRole('patient')} className={`px-16 py-2 ${role === 'patient' ? 'bg-white text-teal-600' : 'bg-teal-600 text-white'} border-2 border-teal-600 font-medium rounded-full`}>Patient</button>
                        <button onClick={() => setRole('doctor')} className={`px-16 py-2 ${role === 'doctor' ? 'bg-white text-teal-600' : 'bg-teal-600 text-white'} border-2 border-teal-600 rounded-full font-medium`}>Doctor</button>
                    </div>
                    {/* In case of any failure in registering a new account  */}
                    {error.message && <Alert style={{ position: 'absolute', width: '304px', marginTop: '-75px' }} onClose={() => setError({ message: '', variant: '' })} severity={error.variant}>{error.message}</Alert>}

                    <form onSubmit={handleSubmit}>
                        <div className='flex flex-col w-full justify-center items-center'>
                            {
                                inputs.map((input) => (
                                    <Input key={input.id} {...input} value={user[input.name]} onChange={handleChange} />
                                ))
                            }
                            <div className='flex flex-row justify-center self-start'>
                                <input type="checkbox" id="remember" className='mr-2' required />
                                <label htmlFor='remember' className='w-full text-center font-medium text-xs opacity-40'>I agree to all the Term, Privacy Policy and Fees</label>
                            </div>
                        </div>
                        <button disabled={loading} className="w-full mt-7 h-9 rounded-md bg-teal-600 text-white hover:opacity-90" type='submit'>Register as {role === 'patient' ? 'Patient' : 'Doctor'}</button>
                    </form>
                    <div className='mt-7 w-full text-center'>
                        <p className='text-gray-400 text-sm'>Already have an account?<Link to='/login' className='text-teal-600 font-medium text-base mx-2 hover:drop-shadow-md'>Login</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup