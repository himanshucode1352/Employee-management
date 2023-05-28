import axios from 'axios';
import React, { useState ,useEffect} from 'react'
import { NavLink ,useParams} from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Edit() {
    const navigate = useNavigate();
    const url = process.env.REACT_APP_API_URL
    const [inputdata,setInputdata]=useState({
        "name":"",
        "department":"",
        "salary":"",
        
    })
    
    //onchange function
    const setstud=(e)=>{
        console.log(e.target.value);
        const {name,value}=e.target;
        setInputdata((prestud)=>{
            return{
                ...prestud,[name]:value
            }
        })
    }


    //get single data Employee
    const { id } = useParams("");
    console.log(id);

    const getstuddata = async () => {
        const res = await fetch(`${url}/get/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await res.json();

        if (res.status === 422 || !data) {
            console.log("error ");
        } else {
            setInputdata(data)
            console.log("get data");
        }
    }

    useEffect(() => {
        getstuddata();
    }, [])

    //update Employee Data
    const updateEmp= async(e)=>{
        e.preventDefault();

        const {name, department, salary} =inputdata;
        const res2 = await axios.put(`${url}/update/${id}`, {
            headers: {
                "Content-Type": "application/json"
            },
            body: {
                name,department, salary,
            }
        });
        
        setInputdata(res2);
        toast.success('Please wait  !', {
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

    return (
        <div className='container mt-5'>
            <h4>Edit Employee Information</h4>
            <div className='underline1'></div>
            <form className='mt-5 shadow p-5 w-75'>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Employee Name</label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter Employee Name" 
                    onChange={setstud} name="name" value={inputdata.name}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Employee Department</label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter Employee Department"
                    onChange={setstud} name="depatment" value={inputdata.department}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Employee Salary</label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter Salary Name" 
                    onChange={setstud} name="salary" value={inputdata.salary}/>
                </div>
                <div className='d-flex'>
                         <button className='btn btn-primary' onClick={updateEmp}>update Employee</button>
                         <ToastContainer />
                         <NavLink className='btn btn-primary ms-auto' to="/allrecords">Back to Home</NavLink>
                </div>
              

            </form>
        </div>
    )
}
