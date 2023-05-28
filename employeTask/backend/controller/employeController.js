const express=require("express");
const router = express.Router();
const Employee=require("../models/employeScheama");


//send data post method
const register = async(req,res)=>{
    const {name,department,salary}=req.body.data;
console.log(name)
    if(!name || !department || !salary  ){
        res.status(422).send("Please fillup the Data")
    }

    try{
        const isExist=await Employee.findOne({name:name});

        if(isExist){
            res.status(422).json("This emloyee already Present")

        }else{
            const addEmployee =new Employee ({name,department,salary});
            await addEmployee.save();
            res.status(201).json(addEmployee)
        }
    }catch(err){
       // res.status(500).send(err)
       console.log(err)
    }
};

//get student Data
const getAll= async(req,res)=>{
    try{
        let sortField = req.query.sortField || 'name'; // Default sort field
        let sortOrder = req.query.sortOrder || 'asc'; // Default sort order
        const data = await Employee.find().sort({ [sortField]: sortOrder });
        res.status(201).json(data);
    }catch(err){
        res.status(422).json(err)
    }
}

//get signle student Data

const getById = async(req,res)=>{
    try{
       const {id}=req.params;
       const emp=await Employee.findById({_id:id});
       res.status(201).json(emp);
    }catch(err){
        res.status(422).json(err);
    }
}


//Delete student Data
const deleteEmp =async(req,res)=>{
    try{
       const {id} = req.params;
       const dleteEmp=await Employee.findByIdAndDelete({_id:id});
       res.status(201).json(dleteEmp);
    }catch(err){
        res.status(422).json(err);
    }
}

// update student data
const updateEmp=async(req,res)=>{
    console.log(req.body)
    try {
        const {id} = req.params;

        const updateEmp = await Employee.findByIdAndUpdate(id,req.body.body,{
            new:true
        });

        res.status(201).send(updateEmp);

    } catch (error) {
        console.log(error)
        res.status(422).send(error);
    }
}
module.exports={register,getAll,getById,deleteEmp,updateEmp};