import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './Attendance.css';
import logo from './images/logo.png';
import { Link } from 'react-router-dom';

const Attendance = () => {
    const [bookings, setBookings] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const token = localStorage.getItem('token');

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const fetchBookingsByDate = useCallback(async () => {
        try {
            const formattedDate = formatDate(selectedDate);
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/bookings/all`, {
                headers: { Authorization: `Bearer ${token}` },
                params: { date: formattedDate } 
            });
            setBookings(response.data);
        } catch (error) {
            console.error('Error fetching bookings:', error);
        }
    }, [selectedDate, token]);

    const updateAttendance = async (bookingId, status) => {
        try {
            await axios.put(`${process.env.REACT_APP_API_URL}/bookings/${bookingId}/attendance`, { status }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const updatedBookings = bookings.map(booking => 
                booking._id === bookingId ? { ...booking, status } : booking
            );
            setBookings(updatedBookings);
        } catch (error) {
            console.error('Error updating attendance:', error);
        }
    };

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    useEffect(() => {
        if (selectedDate) {
            fetchBookingsByDate();
        }
    }, [selectedDate, fetchBookingsByDate]);

    return (

        <div className="attendance-dashboard">
            <aside className="attendance-sidebar-unique">
                <img src={logo} alt="logo" className="attendance-sidebar-logo-unique" />
                <nav className="attendance-sidebar-nav-unique">
                    <Link to="/admin" className="attendance-sidebar-link-unique">Bookings</Link>
                    <Link to="/interns" className="attendance-sidebar-link-unique">Interns</Link>
                    <Link to="/add-holiday" className="attendance-sidebar-link-unique">Add Holiday</Link>
                    <Link to="/attendance" className="attendance-sidebar-link-unique">Attendance</Link>
                </nav>
                <button className="attendance-sidebar-logout-button-unique">Log Out</button>
            </aside>
            <div className="add-holiday-content-unique">
            
            <div>
            <h1>Attendance</h1>
            
            <input
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                className="attendance-date-picker"
            />
            
            {bookings.length > 0 ? (
                <table className="attendance-table">
                    <thead>
                        <tr>
                            <th>Intern ID</th>
                            <th>Name</th>
                            <th>Seat Number</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking._id}>
                                <td>{booking.intern.internID}</td>
                                <td>{`${booking.intern.firstName} ${booking.intern.lastName}`}</td>
                                <td>{booking.seatNumber}</td>
                                <td style={{
                                    color: booking.status === 'present' ? 'green' : booking.status === 'absent' ? 'red' : 'black'
                                }}>
                                    {booking.status || 'N/A'}
                                </td>
                                <td>
                                    <button
                                        className="attendance-present-button"
                                        onClick={() => updateAttendance(booking._id, 'present')}
                                    >
                                        Mark Present
                                    </button>
                                    <button
                                        className="attendance-absent-button"
                                        onClick={() => updateAttendance(booking._id, 'absent')}
                                    >
                                        Mark Absent
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No bookings for this date.</p>
            )}
        </div>
        </div>
        </div>
            
  
        
        
    );
};

export default Attendance;
