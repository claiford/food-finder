import { useEffect } from 'react';
import './App.css';

import axios from 'axios';

function App() {
  const getData = async () => {
    const res = await axios.get('http://localhost:3000/');
    console.log(res);
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="App">
      <h1>React Frontend</h1>
    </div>
  );
}

export default App;
