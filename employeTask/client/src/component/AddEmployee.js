import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios'
export default function AddEmployee() {
  const url = process.env.REACT_APP_API_URL
    const navigate = useNavigate();
    const [inputdata,setInputdata]=useState({
        "name":"",
        "department":"",
        "salary":"",
        
    })
    
    //onchange function
    const setData=(e)=>{
        console.log(e.target.value);
        setInputdata({ ...inputdata, [e.target.name]: e.target.value });   
    }
    //onclick event


    const addinpdata = async (e) => {
      e.preventDefault();
    
      const { name, department, salary } = inputdata;
      
      try {
        const data= {
            name :name,
            department:department,
            salary:salary
          }
        
        const response = await axios.post(`${url}/add`, {
          data: data,
        }, {
          headers: {
            "Content-Type": "application/json" 
          }
        });
    
        const info = response.data;
        console.log(info);
    
        if (response.status === 422 || !data) {
          console.log("error ");
          alert("error");
        } else {
          setInputdata(data);
          toast.success('Please wait!', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setTimeout(() => {
            navigate('/allrecords');
          }, 3000);
        }
      } catch (error) {
        console.log(error);
        alert("error");
      }
    };
    
    return (
        <div className='container mt-5'>
            <h4>All New Employee Information</h4>
            <div className='underline1'></div>
            <form className='mt-5 shadow p-5 w-75'>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Employee Name</label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter Employee Name" 
                    onChange={setData} name="name" value={inputdata.name}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Department</label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter Employee Address"
                    onChange={setData} name="department" value={inputdata.department}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Employee salary</label>
                    <input type="number" className="form-control" id="exampleFormControlInput1" placeholder="Enter Subject Name" 
                    onChange={setData} name="salary" value={inputdata.salary}/>
                </div>
             
                <div className='d-flex'>
                         <button className='btn btn-primary' onClick={addinpdata}>Add Employee</button>
                         <ToastContainer />
                         <NavLink className='btn btn-primary ms-auto' to="/allrecords">Back to Home</NavLink>
                </div>
              

            </form>
        </div>
    )
}
