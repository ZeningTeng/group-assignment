
import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const [name, setName] = useState('');



  const handleLogin = async (e) => {
    e.preventDefault();
    
      const response = await axios.get('http://localhost:8000/search', { name });
   
 

    
  };

  return (
    <div>
    <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
   
  
      <input
        type="name"
        placeholder="Search some thing here"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginBottom: '10px', padding: '8px' }}
      />
      <button type="submit" style={{ padding: '8px' }}>search</button>
    </form>
  </div>
  );
};

export default Search;
