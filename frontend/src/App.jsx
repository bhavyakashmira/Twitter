import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/auth/Home/HomePage'
import LoginPage from './pages/auth/Login/LoginPage'
import SignupPage from './pages/auth/signup/SignupPage'
import Sidebar from './Components/common/Sidebar'
import RightPanel from './Components/common/RightPanel'
import ProfilePage from './pages/Profile/ProfilePage'
import NotificationPage from './pages/notification/NotificationPage'
import { Toaster } from 'react-hot-toast'
import { useQuery } from '@tanstack/react-query'
import LoadingSpinner from './pages/notification/LoadingSpinner'


function App() {

  const { data:authUser, isLoading, error, isError } = useQuery({
    queryKey: ['authuser'],
    queryFn: async () => {
      try {
        const res = await fetch("/api/auth/me")
        const data = await res.json();
        if (data.error) return null;
        if (!res.ok) throw new Error(data.error || "Something went wrong")
        return data;
      } catch (error) {
         throw new Error(error)
      }
    },
    retry:false
  });
  if (isLoading) {
    return (
      <div className='h-screen flex justify-center items-center' >
        <LoadingSpinner size='lg' />
      </div>
    )
  }


  return (
    <div className='flex max-w-6xl mx-auto' >
      {authUser && <Sidebar/>}
      <Routes>
        <Route path='/' element={authUser? <HomePage/>:<Navigate to="/login" />} />
        <Route path='/login' element={!authUser? <LoginPage />:<Navigate to="/" />} />
        <Route path='/signup' element={ !authUser? <SignupPage /> :<Navigate to="/" />} />
        <Route path='/profile/:username' element={authUser ? <ProfilePage /> : <Navigate to="/login" /> } />
        <Route path='/notifications' element={authUser?<NotificationPage />:<Navigate to="/login" />} />
      </Routes>
      {authUser && <RightPanel/>}
      
      <Toaster/>
      

    </div>
  )
}

export default App
