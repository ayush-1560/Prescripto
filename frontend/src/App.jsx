import React from 'react'
import {Route,Routes} from 'react-router-dom'
import MyProfile from './pages/MyProfile'
import Doctors from './pages/Doctors'
import Home from './pages/Home'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import MyAppointments from './pages/MyAppointments'
import Appointment from './pages/Appointment'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import { ToastContainer, toast } from 'react-toastify';
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword';
const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <Navbar/>
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/doctors' element={<Doctors/>} />
        <Route path='/doctors/:speciality' element={<Doctors/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/my-profile' element={<MyProfile/>} />
        <Route path='/my-appointments' element={<MyAppointments/>}/>
        <Route path='/appointment/:docId' element={<Appointment/>} />
        <Route path='/forgot-password' element = {<ForgotPassword/>} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
