import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './CreateUser.css';

const CreateUser = () => {
    const [name, setName] = useState('');
    const [stId, setStId] = useState('');
    const [phone, setPhone] = useState('');
    const [nameError, setNameError] = useState('');
    const [stIdError, setStIdError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const navigate = useNavigate();

    const validatePhone = async (phoneNumber) => {
        try {
            const response = await axios.get(`http://localhost:3000/checkPhone/${phoneNumber}`);
            return response.data.exists;
        } catch (error) {
            console.error("Phone Number Already Registered", error);
            toast.error("Phone Number Already Registered");
            return false;
        }
    };

    const Submit = async (e) => {
        e.preventDefault();

        // name validation
        if (!name.trim()) {
            setNameError("Name is required");
            return;
        } else {
            setNameError('');
        }

        //id vallidation
        if (!stId.trim()) {
            setStIdError("Student ID is required");
            return;
        } else if (!/^\d+$/.test(stId)) {
            setStIdError("Student ID must contain only numbers");
            return;
        } else {
            setStIdError('');
        }
        //phone validation
        if (!phone.trim()) {
            setPhoneError("Phone number is required");
            return;
        } else if (!/^\d{10}$/.test(phone)) {
            setPhoneError("Invalid phone number format. Please provide a 10-digit number.");
            return;
        } else {
            setPhoneError('');
        }
        const phoneExists = await validatePhone(phone);
        if (phoneExists) {
            setPhoneError("Phone number already exists");
            return;
        } else {
            setPhoneError('');
        }

       
        try {
            const response = await axios.post("http://localhost:3000/create", { name, stId, phone });
            console.log(response);
            toast.success("Student created successfully!");
            navigate('/');
        } catch (error) {
            console.error("Error creating student:", error);
            toast.error("Error creating student"); 
        }
    }

    return (
        <>
            <div className='d-flex vh-100 justify-content-center align-items-center'>
                <div className='add_new_student w-50 rounded p-3'>
                    <form onSubmit={Submit}>
                        <h2 className='new_student_heading'>Add New Student</h2>
                        <div className='mb-2 new_student_subheading'>
                            <label htmlFor="">Student Name</label>
                            <input type="text" placeholder='Enter the Name of the Student' className='form-control new_student_input'
                                value={name} onChange={(e) => setName(e.target.value)} />
                            {nameError && <h6 className="text-danger">{nameError}</h6>}
                        </div>
                        <div className='mb-2 new_student_subheading'>
                            <label htmlFor="">Student Id</label>
                            <input type="text" placeholder='Enter the Id' className='form-control new_student_input'
                                value={stId} onChange={(e) => setStId(e.target.value)} />
                            {stIdError && <h6 className="text-danger">{stIdError}</h6>}
                        </div>
                        <div className='mb-2 new_student_subheading'>
                            <label htmlFor="">Phone Number</label>
                            <input type="text" placeholder='Enter the Phone Number' className='form-control new_student_input'
                                value={phone} onChange={(e) => setPhone(e.target.value)} />
                            {phoneError && <h6 className="text-danger">{phoneError}</h6>}
                        </div>
                        <button type="submit" className='btn new_student-submit'>Submit</button>
                    </form>
                </div>
            </div>
           
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
        </>
    )
}

export default CreateUser;
