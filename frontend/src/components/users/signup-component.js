import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CFG_BACKEND, CFG_FRONTEND } from '../../config';

const Signup = () => {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !username) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const response = await axios.post(CFG_BACKEND.signup.url, { username, email, password });
      localStorage.setItem('token', response.data.token);
      navigate(CFG_FRONTEND.getEmployees);
    } catch (err) {
      setError('Signup failed');
    }
  };

  return (
    <Container>
      <Container sx={{ display: 'flex', justifyContent: 'space-between'}}>
        <h2>Signup</h2>
        <Button component='a' href={CFG_FRONTEND.login} color='secondary' variant="contained" sx={{margin: 2}}>Already have account</Button>
      </Container>

      <form onSubmit={handleSubmit}>
      <TextField
          label="User Name"
          type="text"
          fullWidth
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        />
        <TextField sx={{marginTop: 1}}
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
        <Button type="submit" variant="contained" sx={{margin: 2}}>Signup</Button>
      </form>
    </Container>
  );
};

export default Signup;
