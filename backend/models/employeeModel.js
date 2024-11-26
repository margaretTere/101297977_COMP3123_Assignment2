const mongoose = require('mongoose');

const employee = new mongoose.Schema({
    
    first_name:{
      type: String,
      required: [true, 'First name of the employee is required']
    },
    last_name: {
        type: String,
        required: [true, 'Last name of the employee is required']
      },
    email: {
        type: String,
        unique: true,
        required: [true, 'Employee must have a email']
    },
    position: {
        type: String,
        required: [true, 'Employee must have a position']
    },
    salary: {
        type: Number,
        required: [true, 'Employee must have a salary']
    },
    date_of_joining:{
       type: Date,
       default: Date.now(),
    },
    department: {
        type: String,
        required: [true, 'Employee must have a deparment']
    },
    created_at: {
        type: Date,
        default: Date.now(),
     },
     updated_at:{
        type: Date,
        default: Date.now(),
     }
});

const Employee = mongoose.model('Employee', employee);

module.exports = Employee;