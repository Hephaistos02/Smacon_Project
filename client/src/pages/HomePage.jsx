import axios from 'axios'
import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { FaRegTrashCan } from "react-icons/fa6";
import "./HomePage.css"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const HomePage = () => {
    const [users,SetUsers] = useState([])

    useEffect(() => {
      axios.get('http://localhost:3000/')
      .then(result => {
        SetUsers(result.data)
      })
      .catch(err => {
        console.log(err );
      })
    })

    //delete student
    const handleDelete = (id) =>{
      axios.delete('http://localhost:3000/deleteStudent/' +id)
      .then(result => {
        console.log(result);
        toast.success("Student Deleted successfully!");
      
      })
      .catch(error => {
        console.log(error);
      })
    }
  return (
    <div className='d-flex vh-100  justify-content-center align-items-center' >
        <div className='w-50 homepage_center rounded p-3' >
          <div className='homepage_h1' >
          <h1>Student Administration</h1>
          </div>
          <table className='homepage_table'   >
            <thead>
                <tr>
                    <th>Student Name</th>
                    <th>Student Id</th>
                    <th>Phone Number</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
            {
            users.map((user, index) => {
            return (
        <tr key={index}>
            <td>{user.name}</td>
            <td>{user.stId}</td>
            <td>{user.phone}</td>
            <td><button className='btn ' onClick={(e) => handleDelete(user._id)} ><FaRegTrashCan /></button></td>
        </tr>
    );
})}
            </tbody>
            </table>
            <Link to="/create"  className='btn homepage_add' >Add</Link>
        </div>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  )
}

export default HomePage