const express = require('express');
const searchController = require('../controllers/searchController');
const auth = require('../config/auth');

const router = express.Router();

router
    .route('/')
    .get(auth, searchController.searchEmployees);

module.exports = router;
