const express = require('express');
const empController = require('../controllers/employeeController');
const auth = require('../config/auth');

const router = express.Router();

router
    .route('/')
    .get(auth, empController.getAllEmployees)
    .post(auth, empController.createNewEmployee)
    .delete(auth, empController.deleteEmployee);

router
    .route('/:eid')
    .get(auth, empController.getEmployee)
    .put(auth, empController.updateEmployee);
           
module.exports = router;