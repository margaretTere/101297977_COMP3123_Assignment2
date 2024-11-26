const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const CFG = require('../config/config');

//Signing up new users using post request
exports.signUpUser = async  (req, res) =>{
    try {
      const data = req.body;

      if (!data.password)
        throw Error('Please provide password');
        
      data.password = await bcrypt.hash(data.password, 8);
      const newUser = await User.create(data);

      const token = jwt.sign(
            { id: newUser._id }, CFG.SECRET, { expiresIn: '2h' }
      );

      res
      .status(201)
      .json({ message: `User created succesfully.`, token: token });
    
    } catch (err) {
        res
        .status(400)
        .json({ message: err.message });
    }
};

//Login in existing users using post request
exports.loginUser = async(req,res) =>{
  try { 
    const req_email = req.body.email;
    const req_password = req.body.password;
    
    const user = await User.findOne({ 'email': req_email });

    if(!user)
        throw Error('Invaild Username and password');
    
    if(await bcrypt.compare(req_password, user.password)) {
      const token = jwt.sign(
        { id: user._id }, CFG.SECRET, { expiresIn: '2h' }
      );

      res
      .status(200)
      .json({ message: `Login Successful`, token });

    } else {
        throw Error('Invaild Username and password');
    }
  
  } catch (err) {
      res
      .status(400)
      .json({ message: err.message });
  }
};
