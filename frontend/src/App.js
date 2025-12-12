import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import Landing from './Pages/Landing';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Dashboard from './Pages/Dashboard';
import Results from './Pages/Results';
import History from './Pages/History';
import Physiotherapy from './Pages/Physiotherapy';
import ForgotPassword from './Pages/ForgotPassword';


function App() {
  return (
    <BrowserRouter>
      <Routes>
      
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/results" element={<Results />} />
        <Route path="/history" element={<History />} />
        <Route path="/physio" element={<Physiotherapy />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;