const express=require("express");
const { register, getAll,getById ,deleteEmp,updateEmp} = require("../controller/employeController");
const router = express.Router();
router.post("/add",register)
router.get("/getall",getAll)
router.get("/get/:id",getById)
router.delete("/delete/:id",deleteEmp)
router.put("/update/:id",updateEmp)


module.exports=router;