import {createContext, useState} from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
export const AdminContext =createContext();

const AdminContextProvider = (props)=>{
        const [aToken,setAToken] = useState(localStorage.getItem('aToken')?localStorage.getItem('aToken'):'');
        const [doctors,setDoctors] = useState([]);
        const [appointments,setAppointments] = useState([]);
        const [dashData,setDashData] = useState([]);
        const backendUrl= import.meta.env.VITE_BACKEND_URL;
        const getAllDoctors = async () => {
            try {
              console.log('Fetching doctors...');
              const { data } = await axios.post(backendUrl + '/api/admin/all-doctors', {}, { headers: { aToken } });
              console.log('Doctors fetched:', data);
          
              if (data.success) {
                setDoctors(data.doctors);
              } else {
                toast.error(data.message);
              }
            } catch (error) {
              toast.error(error.message);
              console.log('Error:', error);
            }
          };
        const changeAvailablity = async(docId)=>{
            try {
              const {data} = await axios.post(backendUrl + '/api/admin/change-availablity',{docId},{headers:{aToken}});
              if(data.success){
                toast.success(data.message);
                getAllDoctors();
              }
              else{
                toast.error(data.message);
              }
            } catch (error) {
                toast.error(error.message);
            }
        }
    const getAllappointments = async()=>{
        try {
          const {data} =await axios.get(backendUrl + '/api/admin/appointments',{headers:{aToken}});
          if(data.success){
            setAppointments(data.appointments);
            console.log(data.appointments);
          }
          else{
            toast.error(data.message);
          }
        } catch (error) {
          toast.error(error.message);
        }
    }
    const cancelAppointment = async(appointmentId)=>{
        try {
          const {data} = await axios.post(backendUrl + '/api/admin/cancel-appointment',{appointmentId},{headers:{aToken}});
          if(data.success){
            toast.success(data.message);
            getAllappointments();
          }
          else{
            toast.error(data.message);
          }
        } catch (error) {
          toast.error(error.message);
        }
    }
    const getDashData = async ()=>{
      try{
        const {data} = await axios.get(backendUrl + '/api/admin/dashboard',{headers:{aToken}});
        if(data.success){
          setDashData(data.dashData);
        }else{
          toast.error(data.message);
        }
      } catch(error){
        toast.error(error.message);
      }
    } 
    const value={
        aToken,setAToken,
        backendUrl,doctors,
        getAllDoctors,changeAvailablity,
        appointments,setAppointments,getAllappointments,
        cancelAppointment,dashData,setDashData,getDashData
    }
    return(
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider