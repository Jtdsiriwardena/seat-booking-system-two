import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ViewBookings from './pages/ViewBookings';
import Admin from './pages/Admin';
import Interns from './pages/Interns';
import AddHoliday from './pages/AddHoliday';
import Attendance from './pages/Attendance';


function App() {
    return (
        <Router>
            <Routes>
            <Route path="/" element={<Home />} />
                <Route path="/Signup" element={<Signup />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Interns" element={<Interns />} />
                <Route path="/Dashboard" element={<Dashboard />} />
                <Route path="/ViewBookings" element={<ViewBookings />} />
                <Route path="/Admin" element={<Admin />} />
                <Route path="/login" element={<Login />} />
                <Route path="/add-holiday" element={<AddHoliday />} />
                <Route path="/attendance" element={<Attendance />} />

            </Routes>
        </Router>
    );
}

export default App;
