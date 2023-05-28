import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
const url = process.env.REACT_APP_API_URL
export default function AllRecords() {

    const [getEmployedata, setEmployeData] = useState([]);
    const[sortField,setSortField]=useState('salary')
    const[sortOrder,setSortOrder]=useState('asc')
    console.log('getEmployedata',getEmployedata)
    //get employe Data

const handleSort=(sortField)=>{
const order = sortOrder=='asc'?'desc':'asc';
setSortOrder(order)
setSortField(sortField)

}





    const getEmployeData = async () => {

        const res = await axios.get(`${url}/getall?sortField=${sortField}&sortOrder=${sortOrder}`, {
        
        }, {
          headers: {
            "Content-Type": "application/json" 
          }
        });
console.log('res',res)
        if (res.status === 422 || !res) {
            console.log("error ");
        } else {
            setEmployeData(res)
            console.log("get data");
        }
    }

    useEffect(() => {
        getEmployeData();
    }, [sortField,sortOrder])

    //Delete employe data
    const deletestud = async (id) => {

        const res2 =   await axios.delete(`${url}/delete/${id}`,{
          }, {
            headers: {
              "Content-Type": "application/json" 
            }
          });
        

        if (res2.status === 422 ) {
            console.log("error");
        } else {
            getEmployeData();

        }

    }
    //search employe
    const [searchInput,setSearchInput]=useState('');
    const searchEmp=(searchval)=>{
        setSearchInput(searchval)
    }
    return (
        <div className='container mt-5'>
            <div className='d-flex'>
                <h4>All Employe Information</h4>
                <div class="ms-auto w-50">
                    <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Search employe" 
                        onChange={(e)=>searchEmp(e.target.value)}
                    />
                </div>
            </div>

            <div className='underline'></div>
            <table className="table table-bordered mt-5">
                <thead className='table-dark'>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col" >Employe Name<button onClick={() =>handleSort('name')}><i className="fas fa-sort"></i></button></th>
                        <th scope="col">Department</th>
                        <th scope="col">Salary<button onClick={() =>handleSort('salary')}><i className="fas fa-sort"></i></button></th>
                        <th scope="col">Action </th>
                    </tr>
                </thead>
                <tbody>

                    {getEmployedata?.data?.filter((val)=>{
                        if(searchInput == ""){
                            return val
                        }else if(val.name.toLowerCase().includes(searchInput.toLowerCase())){
                            return val; 
                        }
                    }).map((result, id) => {
                        return (
                            <>

                                <tr key={id}>
                                    <th scope="row">{id + 1}</th>
                                    <td>{result.name}</td>
                                    <td>{result.department}</td>
                                    <td>{result.salary}</td>
                                    <td>
                                     
                                        <Link className='btn btn-warning ms-2' to={`/edit/${result._id}`}>Update</Link>
                                        <button className='btn btn-danger ms-2'
                                            data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => deletestud(result._id)}>Delete</button>
                                    </td>
                                </tr>


                            </>
                        )
                    })}




                </tbody>
            </table>

        </div>
    )
}
