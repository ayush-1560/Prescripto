import React from 'react'
import { assets } from '../assets/assets'
import {useNavigate} from 'react-router-dom';
const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm' >
          {/* Left-Section */}
            <div>
                <img className='mb-5 w-40' src={assets.logo} />
                <p className='w-full md:2/3 text-gray-600 leading-6' >Prescripto makes healthcare more accessible by connecting you with trusted doctors, anytime, anywhere. Book appointments seamlessly and get expert medical advice at your convenience. Your health is our priority, and we are committed to ensuring a hassle-free experience. Stay healthy, stay connected with Prescripto.</p>
            </div>
          {/* Center-Section */}
            <div>
            <p className='text-xl font-medium mb-5'>COMPANY</p>
              <ul className='flex flex-col gap-2 text-gray-600'>
                  <li className='cursor-pointer' onClick={()=>{navigate('/'),scrollTo(0,0)}}>Home</li>
                  <li className='cursor-pointer' onClick={()=>{navigate('/about'),scrollTo(0,0)}}>About us</li>
                  <li className='cursor-pointer' onClick={()=>{navigate('/contact'),scrollTo(0,0)}}>Contact us</li>
                  <li className='cursor-pointer'>Privacy policy</li>
              </ul>
            </div>
          {/* Right-Section */}
            <div>
              <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
              <ul className='flex flex-col gap-2 text-gray-600'>
                <li>+0-000-000-000</li>
                <li>ayush88843@gmail.com</li>
              </ul>
            </div>        
      </div>
          {/* CopyRight-Text */}
           <div>
                <hr />
                <p className='py-5 text-sm text-center' >Copyright 2025 @ Stilleyes.dev - All Right Reserved.</p>
           </div>
    </div>
  )
}

export default Footer
