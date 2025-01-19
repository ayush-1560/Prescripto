import appointment_img from './appointment_img.png'
import header_img from './header_img.png'
import group_profiles from './group_profiles.png'
import profile_pic from './profile_pic.png'
import contact_image from './contact_image.png'
import about_image from './about_image.png'
import logo from './logo.svg'
import dropdown_icon from './dropdown_icon.svg'
import menu_icon from './menu_icon.svg'
import cross_icon from './cross_icon.png'
import chats_icon from './chats_icon.svg'
import verified_icon from './verified_icon.svg'
import arrow_icon from './arrow_icon.svg'
import info_icon from './info_icon.svg'
import upload_icon from './upload_icon.png'
import stripe_logo from './stripe_logo.png'
import razorpay_logo from './razorpay_logo.png'
import doc1 from './doc1.png'
import doc2 from './doc2.png'
import doc3 from './doc3.png'
import doc4 from './doc4.png'
import doc5 from './doc5.png'
import doc6 from './doc6.png'
import doc7 from './doc7.png'
import doc8 from './doc8.png'
import doc9 from './doc9.png'
import doc10 from './doc10.png'
import doc11 from './doc11.png'
import doc12 from './doc12.png'
import doc13 from './doc13.png'
import doc14 from './doc14.png'
import doc15 from './doc15.png'
import Dermatologist from './Dermatologist.svg'
import Gastroenterologist from './Gastroenterologist.svg'
import General_physician from './General_physician.svg'
import Gynecologist from './Gynecologist.svg'
import Neurologist from './Neurologist.svg'
import Pediatricians from './Pediatricians.svg'

export const assets = {
    appointment_img,
    header_img,
    group_profiles,
    logo,
    chats_icon,
    verified_icon,
    info_icon,
    profile_pic,
    arrow_icon,
    contact_image,
    about_image,
    menu_icon,
    cross_icon,
    dropdown_icon,
    upload_icon,
    stripe_logo,
    razorpay_logo
}

export const specialityData = [
    {
        speciality: 'General physician',
        image: General_physician
    },
    {
        speciality: 'Gynecologist',
        image: Gynecologist
    },
    {
        speciality: 'Dermatologist',
        image: Dermatologist
    },
    {
        speciality: 'Pediatricians',
        image: Pediatricians
    },
    {
        speciality: 'Neurologist',
        image: Neurologist
    },
    {
        speciality: 'Gastroenterologist',
        image: Gastroenterologist
    },
]

export const doctors = [
    {
        _id: 'doc1',
        name: 'Dr. Richard James',
        image: doc1,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. James has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address: {
            line1: '17th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc2',
        name: 'Dr. Emily Larson',
        image: doc2,
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: "Dr. Emily Larson is a dedicated and experienced gynecologist with a passion for women's health. With over 10 years of practice, she offers compassionate care and expert treatment for a wide range of gynecological conditions. Dr. Larson is committed to providing personalized care and empowering women to take charge of their health at every stage of life.",
        fees: 60,
        address: {
            line1: '27th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc3',
        name: 'Dr. Sarah Patel',
        image: doc3,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '1 Years',
        about: "Dr. Sarah Patel is a highly skilled dermatologist specializing in skin health and cosmetic treatments. With a keen eye for detail and a patient-focused approach, she provides effective solutions for various skin conditions. Dr. Patel is passionate about helping patients achieve healthy, radiant skin through personalized care and the latest dermatological advancements.",
        fees: 30,
        address: {
            line1: '37th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc4',
        name: 'Dr. Christopher Lee',
        image: doc4,
        speciality: 'Pediatricians',
        degree: 'MBBS',
        experience: '2 Years',
        about: "Dr. Christopher Lee is a compassionate pediatrician dedicated to providing exceptional care for children of all ages. With a gentle approach and a deep understanding of child health, he focuses on promoting growth, development, and overall well-being. Dr. Lee is committed to creating a comforting environment where both children and parents feel at ease.",
        fees: 40,
        address: {
            line1: '47th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc5',
        name: 'Dr. Jennifer Garcia',
        image: doc5,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: "Dr. Jennifer Garcia is a highly skilled neurologist with extensive experience in diagnosing and managing a wide range of neurological disorders. With a patient-centered approach, she is dedicated to providing personalized care and improving the quality of life for individuals facing complex brain and nerve conditions. Dr. Garcia stays at the forefront of advancements in neurology to ensure the best outcomes for her patients.",
        fees: 50,
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc6',
        name: 'Dr. Andrew Williams',
        image: doc6,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: "Dr. Jennifer Garcia is a highly skilled neurologist with extensive experience in diagnosing and managing a wide range of neurological disorders. With a patient-centered approach, she is dedicated to providing personalized care and improving the quality of life for individuals facing complex brain and nerve conditions. Dr. Garcia stays at the forefront of advancements in neurology to ensure the best outcomes for her patients.",
        fees: 50,
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc7',
        name: 'Dr. Christopher Davis',
        image: doc7,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: "Dr. Christopher Davis is a compassionate general physician with extensive experience in diagnosing and managing a wide range of medical conditions. Known for his patient-centered approach, he emphasizes preventive care and holistic treatments to promote overall health. Dr. Davis is dedicated to building lasting relationships with his patients and providing personalized care to ensure their well-being.",
        fees: 50,
        address: {
            line1: '17th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc8',
        name: 'Dr. Timothy White',
        image: doc8,
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: "Dr. Timothy White is a dedicated gynecologist committed to providing comprehensive care for women's health. With expertise in reproductive health, prenatal care, and minimally invasive procedures, he ensures that his patients receive personalized and compassionate treatment. Dr. White is known for creating a comfortable and supportive environment to address all aspects of women's wellness.",
        fees: 60,
        address: {
            line1: '27th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc9',
        name: 'Dr. Ava Mitchell',
        image: doc9,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '1 Years',
        about: "Dr. Ava Mitchell is a highly skilled dermatologist specializing in skin care, cosmetic treatments, and managing various skin conditions. With a patient-centric approach, she focuses on providing personalized treatment plans to promote healthy, radiant skin. Dr. Mitchell stays updated with the latest advancements in dermatology to ensure her patients receive the best possible care.",
        fees: 30,
        address: {
            line1: '37th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc10',
        name: 'Dr. Jeffrey King',
        image: doc10,
        speciality: 'Pediatricians',
        degree: 'MBBS',
        experience: '2 Years',
        about: "Dr. Jeffrey King is a compassionate pediatrician dedicated to providing comprehensive medical care for children of all ages. With a warm and friendly approach, he focuses on ensuring the overall health and development of his young patients. Dr. King is committed to building lasting relationships with families while staying updated on the latest advancements in pediatric medicine.",
        fees: 40,
        address: {
            line1: '47th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc11',
        name: 'Dr. Zoe Kelly',
        image: doc11,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: "Dr. Zoe Kelly is an experienced neurologist specializing in diagnosing and treating complex neurological disorders. Known for her compassionate care and patient-centric approach, she is dedicated to improving the quality of life for individuals dealing with conditions such as migraines, epilepsy, and neurodegenerative diseases. Dr. Kelly stays at the forefront of medical advancements to provide the best possible care for her patients.",
        fees: 50,
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc12',
        name: 'Dr. Patrick Harris',
        image: doc12,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: "Dr. Patrick Harris is a highly skilled neurologist with extensive expertise in treating a wide range of neurological conditions, including stroke, epilepsy, and Parkinson’s disease. With a patient-first approach, Dr. Harris is dedicated to delivering personalized care and helping patients manage their conditions effectively. He is committed to staying updated with the latest advancements in neurology to provide the best outcomes for his patients.",
        fees: 50,
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc13',
        name: 'Dr. Chloe Evans',
        image: doc13,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: "Dr. Chloe Evans is a compassionate and dedicated general physician with a strong focus on preventive care and overall well-being. She is experienced in diagnosing and treating a variety of common health issues, from chronic conditions to acute illnesses. Dr. Evans takes a holistic approach to healthcare, working closely with her patients to create personalized treatment plans that promote long-term health and wellness.",
        fees: 50,
        address: {
            line1: '17th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc14',
        name: 'Dr. Ryan Martinez',
        image: doc14,
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: "Dr. Ryan Martinez is a skilled and empathetic gynecologist with a commitment to providing high-quality care for women of all ages. He specializes in reproductive health, offering services such as routine exams, prenatal care, and treatment for gynecological conditions. Dr. Martinez strives to create a comfortable and supportive environment, empowering women to make informed decisions about their health and well-being.",
        fees: 60,
        address: {
            line1: '27th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc15',
        name: 'Dr. Amelia Hill',
        image: doc15,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '1 Years',
        about: "Dr. Amelia Hill is a compassionate and experienced dermatologist who specializes in the diagnosis and treatment of various skin conditions, from acne to skin cancer. With a focus on both medical and cosmetic dermatology, she provides personalized care tailored to each patient’s unique needs. Dr. Hill is dedicated to helping her patients achieve healthy, beautiful skin while promoting overall wellness.",
        fees: 30,
        address: {
            line1: '37th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc16',
        name: 'Dr. Ethan Carter',
        image: doc12,
        speciality: 'Gastroenterologist',
        degree: 'MD, DM - Gastroenterology',
        experience: '8 Years',
        about: 'Dr. Ethan Carter is a highly skilled Gastroenterologist with extensive experience in diagnosing and treating complex digestive disorders. His patient-centric approach ensures personalized care and effective treatment plans tailored to each individual.',
        fees: 45,
        address: {
          line1: 'Green Valley Medical Center',
          line2: '45 Park Street, Manchester'
        }
      }
]