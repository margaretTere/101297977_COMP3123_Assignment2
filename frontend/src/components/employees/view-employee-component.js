import React, {useState, useEffect} from 'react';
import { Button, Container, Typography, Grid, TextField } from '@mui/material';
import { CFG_FRONTEND, CFG_BACKEND } from '../../config';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ViewEmployee = () => {

  const userId = useParams('id').id;

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

  return (
    <Container sx={{marginTop:2}}>
      <Typography variant="h4" gutterBottom> Employee Details</Typography>
      <Grid container spacing={2}>
        <Grid item xs={7}>
            <TextField fullWidth label="First Name" name="first_name" value={employee.first_name}
              variant="outlined" required InputProps={{readOnly: true}}/>
          </Grid>
          <Grid item xs={7}>
            <TextField fullWidth label="Last Name" name="last_name" value={employee.last_name}
              variant="outlined" required InputProps={{readOnly: true}}/>
          </Grid>
          <Grid item xs={7}>
            <TextField fullWidth label="Email" name="email" value={employee.email}
              variant="outlined" required InputProps={{readOnly: true}}/>
          </Grid>
          <Grid item xs={7}>
            <TextField fullWidth label="Department" name="department" value={employee.department}
              variant="outlined" required InputProps={{readOnly: true}}/>
          </Grid>
          <Grid item xs={7}>
            <TextField fullWidth label="Position" name="position" value={employee.position}
              variant="outlined" required InputProps={{readOnly: true}}/>
          </Grid>
          <Grid item xs={7}>
            <TextField fullWidth label="Salary" name="salary" value={employee.salary}
              variant="outlined" required InputProps={{readOnly: true}}/>
          </Grid>
          <Grid item xs={7}>
            <TextField fullWidth label="Joined at" name="joined" value={employee.date_of_joining}
              variant="outlined" required InputProps={{readOnly: true}}/>
          </Grid>
      </Grid>
      <Button component='a' href={`${CFG_FRONTEND.getEmployees}`}
                    color='info' variant="contained" sx={{marginTop: 3}}>Back</Button>
    </Container>
  );
};

export default ViewEmployee;
