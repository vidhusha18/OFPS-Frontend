

import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link,useNavigate } from 'react-router-dom';
import { FaUserShield, FaBuilding, FaFileAlt, FaRegFileAlt, FaTimesCircle,FaSignOutAlt } from 'react-icons/fa';

const districts = [
    'Madurai / மதுரை',
    'Dindigul / திண்டுக்கல்',
    'Virudhunagar / விருதுநகர்',
    'Theni / தேனி',
    'Thoothukudi / தூத்துக்குடி',
    'Trichy / திருச்சிராப்பள்ளி',
    'Chennai / சென்னை',
    'Thirunelveli / திருநெல்வேலி',
    'Coimbatore / கோயம்புத்தூர்'
];

const AddStation = () => {
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        branch: ''
    });

    const [view, setView] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:9998/station/register', formData)
            .then(response => {
                toast.success('Station added successfully!');
                setFormData({ name: '', location: '', branch: '' });
            })
            .catch(error => {
                toast.error('Error adding station. Please try again.');
            });
    };

    const handleLogout = () => {
        // sessionStorage.clear();
        navigate('/login');
    };


    const handleViewChange = (viewName) => {
        setView(viewName);
        // Additional logic for handling view changes if needed
    };

    return (
        <div className="relative flex h-screen bg-gray-100">
            {/* Sidebar */}
            <nav className="w-64 bg-gray-800 text-white h-screen">
                <div className="flex items-center mb-8">
                    <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4zM12 2c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"></path>
                    </svg>
                    <span className="ml-2 text-xl font-bold">Admin Dashboard</span>
                </div>
                <ul>
                    <li>
                        <Link
                            to="/viewpolice"
                            className="flex items-center p-3 mb-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md"
                        >
                            <FaUserShield className="mr-3" /> View Police Officers
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/viewstation"
                            className="flex items-center p-3 mb-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md"
                        >
                            <FaBuilding className="mr-3" /> Manage Stations
                        </Link>
                    </li>
                    <li>
                        <button
                            onClick={() => handleViewChange('Complainants Registered')}
                            className="flex items-center p-3 mb-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md"
                        >
                            <FaFileAlt className="mr-3" /> Complainants Registered
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => handleViewChange('View Received FIRs')}
                            className="flex items-center p-3 mb-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md"
                        >
                            <FaRegFileAlt className="mr-3" /> View Received FIRs
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => handleViewChange('FIR Report')}
                            className="flex items-center p-3 mb-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md"
                        >
                            <FaFileAlt className="mr-3" /> FIR Report
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => handleViewChange('FIR Closed')}
                            className="flex items-center p-3 mb-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md"
                        >
                            <FaTimesCircle className="mr-3" /> FIR Closed
                        </button>
                    </li> 
                    <li>
                        <button onClick={handleLogout} className="px-4 py-2 bg-red-600 text-white rounded-lg flex items-center">
                            <FaSignOutAlt className="w-5 h-5 mr-2" />
                            Logout
                        </button>
                    </li><br></br>
 <li>
                        <Link to="/adminDashboard">
                            <button className="bg-blue-500 text-white p-3 rounded-md shadow-lg flex items-center space-x-2 hover:bg-blue-600">
                                <span>Back </span>
                            </button>
                        </Link>
                    </li>
                </ul>
            </nav>

            {/* Main Content */}
            <div className="flex-1 flex flex-col p-8 relative">


                {/* Back to View Stations Button */}
                {/* <Link to="/viewstation">
                    <button
                        type="button"
                        className="absolute top-4 right-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        Back to View Stations
                    </button>
                </Link> */}

                {/* Form Content */}
                <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-lg mt-10">
                    <h2 className="text-2xl font-bold mb-6 text-center">Add Station</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-700">Station Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="location" className="block text-gray-700">Location</label>
                            <select
                                id="location"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                                required
                            >
                                <option value="">Select a location</option>
                                {districts.map((district, index) => (
                                    <option key={index} value={district}>
                                        {district}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="branch" className="block text-gray-700">Branch</label>
                            <input
                                type="text"
                                id="branch"
                                name="branch"
                                value={formData.branch}
                                onChange={handleChange}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                                required
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            >
                                Add Station
                            </button>
                        </div>
                    </form>
                </div>
                <ToastContainer />
            </div>
        </div>
    );
};

export default AddStation;
