import validator from "validator";
import bcrypt from "bcrypt";
import {v2 as cloudinary} from 'cloudinary';
import doctorModel from '../models/doctorModel.js';
import jwt from 'jsonwebtoken';
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";
//API for adding doctor

const addDoctor = async (req, res) => {
    try {
      const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
      const imageFile = req.file; // Access the uploaded file
  
      // Check for missing fields
      if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address || !imageFile) {
        return res.json({ success: false, message: "Missing Details" });
      }
  
      // Validate email
      if (!validator.isEmail(email)) {
        return res.json({ success: false, message: "Please enter a valid email" });
      }
  
      // Check password strength
      if (password.length < 8) {
        return res.json({ success: false, message: "Please enter a strong password" });
      }
  
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Upload image to Cloudinary
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
      console.log(imageUpload);
      const imageUrl = imageUpload.secure_url; // Get the image URL
  
      // Prepare doctor data
      const doctorData = {
        name,
        email,
        image: imageUrl, // Store the uploaded image URL
        password: hashedPassword,
        speciality,
        degree,
        experience,
        about,
        fees,
        address: JSON.parse(address),
        date: Date.now(),
      };
  
      // Save doctor to the database
      const newDoctor = new doctorModel(doctorData);
      await newDoctor.save();
  
      res.json({ success: true, message: "Doctor Added" });
    } catch (error) {
      console.error(error);
      res.json({ success: false, message: error.message });
    }
  };
  
  const adminLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if email and password are provided
      if (!email || !password) {
        return res.json({ success: false, message: "Please provide email and password" });
      }
  
      // Check if the credentials match
      if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
        const token = jwt.sign({ email }, process.env.JWT_SECRET);
        return res.json({ success: true, token });
      }
  
      // If credentials don't match
      return res.json({ success: false, message: "Invalid email or password" });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  };
  
  const allDoctors = async (req, res) => {
    try {
      const doctors = await doctorModel.find({}).select('-password');
      console.log(doctors);
      return res.json({ success: true, doctors }); 
    } catch (error) {
      console.error(error);
      return res.json({ success: false, message: error.message });
    }
  };
  //API to get all appointments list
  const appointmentsAdmin = async(req,res)=>{
      try {
        const appointments = await appointmentModel.find({});
        res.json({success:true,appointments});
      } catch (error) {
        console.error(error);
        return res.json({ success: false, message: error.message });
      }
  }
  //API to cancel appointments
  const appointmentCancel = async(req,res)=>{
    try {
      const {appointmentId} =req.body;
      const appointmentData = await appointmentModel.findById(appointmentId);
      await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true});
      //release doctor slot
  
      const {docId,slotDate,slotTime} = appointmentData;
      const doctorData = await doctorModel.findById(docId);
  
      let slots_booked = doctorData.slots_booked;
      slots_booked[slotDate] = slots_booked[slotDate].filter(e=>e!==slotTime);
      await doctorModel.findByIdAndUpdate(docId,{slots_booked});
      res.json({success:true,message:'Appointment Cancelled'});
    } catch (error) {
        res.json({ success: false, message: error.message });
        console.log(error);
    }
  }
  //API to create admin dashboard
  const adminDashBoard = async(req,res)=>{
      try{
        const doctors = await doctorModel.find({});
        const users = await userModel.find({});
        const appointments = await appointmentModel.find({});
        const dashData ={
          doctors:doctors.length,
          appointments:appointments.length,
          patients:users.length,
          latestAppointments: appointments.reverse().slice(0,5)
        }
        res.json({success:true,dashData});
      } catch(error){
        res.json({ success: false, message: error.message });
        console.log(error);
      }
  }
 export {addDoctor,adminLogin,allDoctors,appointmentsAdmin,appointmentCancel,adminDashBoard} 