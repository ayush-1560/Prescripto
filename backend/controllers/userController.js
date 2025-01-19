import validator from 'validator';
import bcrypt from 'bcryptjs';
import userModel from '../models/userModel.js';
import doctorModel from '../models/doctorModel.js';
import appointmentModel from '../models/appointmentModel.js'
import jwt from 'jsonwebtoken';
import {v2 as cloudinary} from 'cloudinary';
import Razorpay from 'razorpay';
import nodemailer from 'nodemailer';

//API to register user
const registerUser = async(req,res)=>{
    try {
       const {name,email,password} = req.body;
       if(!name || !email || !password){
        return res.json({success:false,message:"Missing Details!"});
       } 
       //validating email format
       if(!validator.isEmail(email)){
        return res.json({success:false,message:"enter a valid email"});
       }
       //validating password
       if(password.length < 8){
        return res.json({success:false,message:"enter a strong password"});
       }

       //hashing password
       const salt = await bcrypt.genSalt(10);
       const hashedPassword = await bcrypt.hash(password,salt);

       const userData={
        name,
        email,
        password: hashedPassword
       }
       const newUser = new userModel(userData);
       const user = await newUser.save();
       const token = jwt.sign({id:user._id},process.env.JWT_SECRET);
       res.json({success:true,token});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message});
    }
}
//API for user login
const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if user exists in userModel
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.json({ success: false, message: "User does not exist!" });
      }
  
      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.json({ success: false, message: "Invalid credentials!" });
      }
  
      // Generate JWT token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  
      // Successful login response
      res.json({ success: true, token });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  };
  const getProfile = async (req,res)=>{
    try{

        const {userId} = req.body;
        const userData = await userModel.findById(userId).select('-password');
        res.json({success:true,userData});
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:error.message});
    }
}
//API to update user profile
const updateProfile = async (req,res)=>{
      try {
        const {userId,name,phone,address,dob,gender} = req.body;
        const imageFile = req.file;
        if(!name || !phone || !address || !dob || !gender){
          return res.json({success:false, message:"Data Missing!"});
        }
        await userModel.findByIdAndUpdate(userId,{name,phone,address:JSON.parse(address),dob,gender});
        if(imageFile){
          const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"});
          const imageUrl= imageUpload.secure_url;

          await userModel.findByIdAndUpdate(userId,{image:imageUrl});
        }
        res.json({success:true,message:"profile updated"});
      } catch (error) {
        
      }
}
//API to book appointment
const bookAppointment = async (req, res) => {
  try {
    const { userId, docId, slotDate, slotTime } = req.body;
    const docData = await doctorModel.findById(docId).select("-password");

    if (!docData.available) {
      return res.json({ success: false, message: "Doctor not available" });
    }

    let slots_booked = docData.slots_booked;

    //checking for slots availability

    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({ success: false, message: "slots not available" });
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }

    const userData = await userModel.findById(userId).select("-password");

    delete docData.slots_booked;

    const appoitmentData = { userId, docId, userData, docData, amount: docData.fees, slotTime, slotDate, date: Date.now(),};

    const newApointment = new appointmentModel(appoitmentData);
    await newApointment.save();

    //save new slots data in docData
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: "Apointment Booked" });
  } catch (error) {
    res.json({ success: false, message: error.message });
    console.log(error);
  }
};
//API to get user appointments for frontend 
const listAppointment = async (req,res)=>{
    try {
      const {userId} = req.body;
      const appointments = await appointmentModel.find({userId});

      res.json({success:true,appointments});
    } catch (error) {
      res.json({ success: false, message: error.message });
      console.log(error);
    }
}
//API to Cancel Appointment
const cancelAppointment = async(req,res)=>{
  try {
    const {userId,appointmentId} =req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);
    //verify appointment user
    if(appointmentData.userId!==userId){
      return res.json({success:false,message:"Unauthorized action"});
    }
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
// API to make payment using RazorPay
const razorpayInstance = new Razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET
})
const paymentRazorpay = async(req,res)=>{
  try {
    const {appointmentId} = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);
    if(!appointmentData || appointmentData.cancelled){
      return res.json({success:false,message:"Appointment cancelled or not found"});
    }
    //creating options for razorpay payment
    const options={
      amount:appointmentData.amount*100,
      currency: process.env.CURRENCY,
      receipt:appointmentId,
    }
    //creation of an order
    const order = await razorpayInstance.orders.create(options);
    console.log(order);
    appointmentData.razorpay_order_id=order.id;
    await appointmentData.save();
    res.json({success:true,order});
  } catch (error) {
    res.json({ success: false, message: error.message });
    console.log(error);
  }
}
//API to verify razorpay payment
const verifyRazorpay = async (req, res) => {
  try {
    const { appointmentId, razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    // Fetch the order from Razorpay
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

    // Ensure the order is marked as paid
    if (orderInfo.status === 'paid') {
      // Find the appointment and update the payment status
      const appointment = await appointmentModel.findByIdAndUpdate(
        appointmentId,
        { payment: true },
      );

      if (!appointment) {
        return res.json({ success: false, message: 'Appointment not found!' });
      }

      res.json({ success: true, message: 'Payment successful' });
    } else {
      res.json({ success: false, message: 'Payment failed!' });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.json({ success: false, message: "Email is required!" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found!" });
    }

    // Generate a reset token
    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Save token to the user (optional: for more secure token storage)
    user.resetToken = resetToken;
    await user.save();

    // Send the reset link via email
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject: "Password Reset Request",
      html: `<p>You requested a password reset. Click the link below to reset your password:</p>
             <a href="${resetUrl}">${resetUrl}</a>
             <p>This link is valid for 1 hour.</p>`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: "Password reset link sent to your email." });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Reset Password
const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) {
      return res.json({ success: false, message: "Missing required details!" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id);

    if (!user || user.resetToken !== token) {
      return res.json({ success: false, message: "Invalid or expired token!" });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    user.resetToken = null; // Clear the token
    await user.save();

    res.json({ success: true, message: "Password updated successfully!" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
export {registerUser,loginUser,getProfile,updateProfile,bookAppointment,listAppointment,cancelAppointment,paymentRazorpay,verifyRazorpay,forgotPassword,resetPassword};