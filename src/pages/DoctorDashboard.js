import React, { useState, useEffect } from 'react'
import { Alert } from '@mui/material'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const DoctorDashboard = () => {
    const navigate = useNavigate()
    const { currentUser, logout } = useAuth()

    useEffect(() => {
        if (!currentUser) {
            navigate('/login')
        }
        // eslint-disable-next-line
    }, [currentUser])

    const [error, setError] = useState({
        message: '',
        variant: '',
    })

    async function handleLogout() {
        try {
            await logout()
            navigate('/login')
        } catch (error) {
            setError({
                message: 'Failed to logout',
                variant: 'error'
            })
            // console.log(error)
        }
    }

    return (
        <>
            <div className='container border-2 py-10 px-32 rounded-lg'>
                <div className='flex flex-col items-center'>
                    <h2 className="text-center mb-4 font-bold text-2xl">User Profile</h2>
                    {error.message && <Alert onClose={() => setError({ message: '', variant: '' })} severity={error.variant}>{error.message}</Alert>}
                    <strong>Email: </strong>{currentUser && currentUser.email}
                </div>
                <div className='w-100 text-center mt-8'>
                    <button variant="link" className='bg-teal-600 px-4 py-2 rounded-md text-white' onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </>
    )
}

export default DoctorDashboard