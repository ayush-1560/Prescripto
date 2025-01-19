import React, { useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import { AdminContext } from './context/AdminContext';
import NavBar from './components/NavBar';
import Sidebar from './components/Sidebar';
import {Route,Routes} from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard';
import AddDoctor from './pages/Admin/AddDoctor';
import AllAppointments from './pages/Admin/AllAppointments';
import DoctorList from './pages/Admin/DoctorList';
import { DoctorContext } from './context/DoctorContext';
import DoctorDashboard from './pages/Doctor/DoctorDashBoard';
import DoctorAppointments from './pages/Doctor/DoctorAppointments';
import DoctorProfile from'./pages/Doctor/DoctorProfile';
const App = () => {
  const {aToken} =useContext(AdminContext);
  const {dToken} = useContext(DoctorContext);
  return aToken || dToken ? (
    <div className='bg-[#F8F9FD]' >
      <ToastContainer/>
      <NavBar/>
      <div className='flex items-start'>
        <Sidebar/>
        <Routes>
          {/* ---Admin Routes--- */}
          <Route path='/' element={<></>}></Route>
          <Route path='/admin-dashboard' element={<Dashboard/>}></Route>
          <Route path='/all-appointments' element={<AllAppointments/>}></Route>
          <Route path='/add-doctor' element={<AddDoctor/>}></Route>
          <Route path='/doctor-list' element={<DoctorList/>}></Route>
          {/* ---Doctor Routes--- */}
          <Route path='/doctor-dashboard' element={<DoctorDashboard/>}></Route>
          <Route path='/doctor-appointments' element={<DoctorAppointments/>}></Route>
          <Route path='/doctor-profile' element={<DoctorProfile/>}></Route>
        </Routes>
      </div>
    </div>
  )
  :(
    <>
      <Login/>
      <ToastContainer/>
    </>
  )
}

export default App
