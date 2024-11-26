const express = require('express');
const cors = require('cors');
const employeeRouter = require('../routes/employeeRoutes');
const userRouter = require('../routes/userRoutes');
const searchRouter = require('../routes/searchRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/search', searchRouter);
app.use('/api/v1/employees', employeeRouter);
app.use('/api/v1/user', userRouter);

module.exports = app;