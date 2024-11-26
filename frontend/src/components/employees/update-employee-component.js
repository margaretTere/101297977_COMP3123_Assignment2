import React, {useState, useEffect} from 'react';
import { Typography, Button, Container, Grid, TextField } from '@mui/material';
import { CFG_FRONTEND, CFG_BACKEND } from '../../config';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UpdateEmployee = () => {

  const userId = useParams('id').id;

  const [error, setError] = useState('');
  const [employee, setEmployee] = useState({
    first_name: '',
    last_name: '',
    email: '',
    position: '',
    salary: 0,
    department: '',
    date_of_joining: ''
  });

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) 
          new Error('No token found');

        const response = await axios.get(`${CFG_BACKEND.getEmployee.url}/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`, 
          },
        });

        setEmployee(response.data.data);
      } catch (err) {
        console.error('Error fetching employees:', err);
      }
    };

    fetchEmployee();
  }, [userId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEmployee({
      ...employee,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      if (!token) 
        new Error('No token found');

      const data = {...employee};
      await axios.put(`${CFG_BACKEND.updateEmployee.url}/${userId}`, data, {
        headers: {
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json'
        },
      });

      setError('Employee successfully updated');
    } catch (err) {
      console.error('Error updating employee:', err);
      setError('Error updating employee. ' + err.message);
    }
  };

  return (
    <Container sx={{marginTop:2}}>
      <Typography variant="h4" gutterBottom> Update Employee</Typography>
      <form onSubmit={handleSubmit}>

      <Grid container spacing={2}>
          <Grid item xs={7}>
              <TextField fullWidth label="First Name" name="first_name" value={employee.first_name}
               onChange={handleChange} variant="outlined" required/>
            </Grid>
            <Grid item xs={7}>
              <TextField fullWidth label="Last Name" name="last_name" value={employee.last_name}
               onChange={handleChange} variant="outlined" required/>
            </Grid>
            <Grid item xs={7}>
              <TextField fullWidth label="Email" name="email" value={employee.email}
               onChange={handleChange} variant="outlined" required />
            </Grid>
            <Grid item xs={7}>
              <TextField fullWidth label="Department" name="department" value={employee.department}
               onChange={handleChange} variant="outlined" required/>
            </Grid>
            <Grid item xs={7}>
              <TextField fullWidth label="Position" name="position" value={employee.position}
               onChange={handleChange} variant="outlined" required/>
            </Grid>
            <Grid item xs={7}>
              <TextField fullWidth label="Salary" name="salary" value={employee.salary}
               onChange={handleChange} variant="outlined" required/>
            </Grid>
            <Grid item xs={7}>
              <TextField fullWidth label="Joined at" name="date_of_joining" value={employee.date_of_joining}
               onChange={handleChange} variant="outlined" required/>
            </Grid>
        </Grid>
        <Button sx={{marginTop: 2}} type="submit" color='success' variant="contained">Submit</Button>
      </form>
      <Button sx={{marginTop: 2}} component='a' href={`${CFG_FRONTEND.getEmployees}`}
                    color='info' variant="contained">Back</Button>
      {error && (
        <Typography variant="h5" color="error" align="left" style={{ marginTop: '20px' }}>
          {error}
        </Typography>
      )}
    </Container>  
  );
};

export default UpdateEmployee;
