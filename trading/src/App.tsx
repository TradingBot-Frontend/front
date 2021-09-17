import React from 'react';
import './App.css';
import MyRouter from '@routes/index';
import Dashboard from '@routes/normalRoute/Dashboard';

function App() {
  return (
    <div className="App">
      {/* <MyRouter /> */}
      <Dashboard />
    </div>
  );
}

export default App;
