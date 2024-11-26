import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CFG_BACKEND, CFG_FRONTEND } from '../../config';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const response = await axios.post(CFG_BACKEND.login.url, { email, password });
      console.log(response);
      localStorage.setItem('token', response.data.token);
      navigate(CFG_FRONTEND.getEmployees);
    } catch (err) {
      console.log(err);
      setError('Invalid login credentials');
    }
  };

  return (
    <Container>
      <Container sx={{ display: 'flex', justifyContent: 'space-between'}}>
        <h2>Login</h2>
        <Button component='a' href={CFG_FRONTEND.signup} color='secondary' variant="contained" sx={{margin: 2}}>Sign Up</Button>
      </Container>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField sx={{marginTop: 1}}
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p>{error}</p>}
        <Button type="submit" variant="contained" sx={{margin: 2}}>Login</Button>
      </form>
    </Container>
  );
};

export default Login;
