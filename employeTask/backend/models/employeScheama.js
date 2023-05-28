const mongoose= require("mongoose");

const employeScheama = mongoose.Schema({
  name: {
    type: "string",
    required: true,
    trim: true,
  },
  department: {
    type: "string",
    required: true,
    trim: true,
  },
  salary: {
    type: "string",
    required: true,
  },
 

},{timeStamps:true});

module.exports= mongoose.model("Employee", employeScheama);