// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import Register from './Components/Register';
import './styles/login-register.css'; // Import the shared CSS file

const App = () => (
    <div className="app-container">
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    </div>
);

export default App;
