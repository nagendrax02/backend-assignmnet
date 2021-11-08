const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    roll_number:{type:String,required:true},
    user:{type: mongoose.Schema.Types.ObjectId,
    ref:"User"},
    batch:{type:String}
})  

module.exports = mongoose.model("student", studentSchema)