const Employee = require('../models/employeeModel');

//Search
exports.searchEmployees = async (req, res) => {
    try{
      const dep = req.query.dep;
      const searchEmp = await Employee.find({department: dep});
  
      res
      .status(200)
      .json({ data: searchEmp });
  
    //Catching any errors 
    } catch (err){
        res
        .status(400)
        .json({ message: err.message });
    }
  }
  