import React, { useState, useEffect } from 'react';

import { 
  Button, Container, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Typography, TextField 
} from '@mui/material';

import axios from 'axios';
import { CFG_BACKEND, CFG_FRONTEND } from '../../config';

const ListEmployees = () => {
  const [error, setError] = useState('');
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState('');
  
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) 
          new Error('No token found');

        const response = await axios.get(CFG_BACKEND.getEmployees.url, {
          headers: {
            'Authorization': `Bearer ${token}`, 
          },
        });

        setEmployees(response.data.data);
      } catch (err) {
        console.error('Error fetching employees:', err);
        setError('Error fetching employees');
      }
    };

    fetchEmployees();
  }, []);

  const handleSearch = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) 
        new Error('No token found');

      let url = `${CFG_BACKEND.searchEmployees.url}${search}`;
      if (!search)
        url = CFG_BACKEND.getEmployees.url;

      const response = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${token}`, 
        },
      });
      
      setEmployees(response.data.data);
    } catch (err) {
      console.error('Error searching employees:', err);
      setError('Error searching employees');
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) 
        new Error('No token found');

      await axios.delete(`${CFG_BACKEND.deleteEmployee.url}${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`, 
        },
      });
      
      setEmployees((prevEmployees) => prevEmployees.filter(employee => employee._id !== id));
    } catch (err) {
      console.error('Error deleting employee:', err);
      setError('Error deleting employee');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = CFG_FRONTEND.login;
  };

  return (
    <Container>
      <Container sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2}}>
        <Typography variant="h4" gutterBottom> Employees </Typography>
        <Button variant="contained" color="warning" onClick={handleLogout} sx={{margin: 1}}>Logout</Button>
      </Container>
      <Container sx={{paddingBottom: 2}}>
      <TextField fullWidth label="Search by Department" name="search" value={search}
               onChange={(e) => setSearch(e.target.value)} variant="outlined" required/>
        <Button variant="contained" color="success" onClick={handleSearch} sx={{margin: 1}}>Search</Button>
      </Container>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{fontWeight: 'bold'}}>Name</TableCell>
              <TableCell sx={{fontWeight: 'bold'}}>Department</TableCell>
              <TableCell sx={{fontWeight: 'bold'}}>Position</TableCell>
              <TableCell sx={{fontWeight: 'bold'}}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee._id}>
                <TableCell>{employee.last_name}, {employee.first_name}</TableCell>
                <TableCell>{employee.department}</TableCell>
                <TableCell>{employee.position}</TableCell>
                <TableCell>
                  <Button component='a' href={`${CFG_FRONTEND.getEmployee}/${employee._id}`}
                    color='primary' variant="contained" sx={{marginRight: 1}}>View</Button>
                  <Button component='a' href={`${CFG_FRONTEND.updateEmployee}/${employee._id}`}
                    color='secondary' variant="contained" sx={{marginRight: 1}}>Edit</Button>
                  <Button onClick={() => handleDelete(employee._id)} color='error' variant="contained">Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" component='a' href={CFG_FRONTEND.addEmployee} color='info' sx={{margin: 3}}>Add Employee</Button>
      {error && (
        <Typography variant="h5" color="error" align="left" style={{ marginTop: '20px' }}>
          {error}
        </Typography>
      )}
    </Container>
  );
};

export default ListEmployees;
