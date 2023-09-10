import { useEffect } from 'react';
import './App.css';

import { Button } from '@mui/material';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';

import axios from 'axios';

function App() {
  const getData = async () => {
    const res = await axios.get('http://localhost:3000/');
    console.log(res.data[0].data);
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="App">
      <h1>React Frontend</h1>
      <Button variant="text">Text</Button>
      <AccessTimeFilledIcon />
    </div>
  );
}

export default App;
