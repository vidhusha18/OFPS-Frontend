


import React, { useState, useEffect,navigate } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaPlus, FaUserShield, FaBuilding, FaFileAlt, FaRegFileAlt, FaTimesCircle ,FaUserCircle,FaSignOutAlt} from 'react-icons/fa'; // Import necessary icons

const ViewPoliceOfficers = () => {
    const { stationId } = useParams();
    const [policeOfficers, setPoliceOfficers] = useState([]);
    const [filteredOfficers, setFilteredOfficers] = useState([]);
    const [selectedView, setSelectedView] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        // Fetch police officers with station details
        axios.get(`http://localhost:9998/police/all`) // Adjust the endpoint as needed
            .then(response => {
                console.log('Police officers response:', response.data);
                setPoliceOfficers(response.data);
                setFilteredOfficers(response.data);
            })
            .catch(error => {
                console.error('Error fetching police officers:', error);
                toast.error('Error fetching police officers.');
            });
    }, [stationId]);

    useEffect(() => {
        // Filter police officers based on search query
        const lowercasedQuery = searchQuery.toLowerCase();
        const filtered = policeOfficers.filter(officer => 
            officer.designation.toLowerCase().includes(lowercasedQuery) ||
            (officer.station && officer.station.name.toLowerCase().includes(lowercasedQuery)) ||
            (officer.station && officer.station.district.toLowerCase().includes(lowercasedQuery))
        );
        setFilteredOfficers(filtered);
    }, [searchQuery, policeOfficers]);

    const handleViewChange = (view) => {
        setSelectedView(view);
    };

    // Function to determine card color based on designation
    const getCardColor = (designation) => {
        switch (designation) {
            case 'Inspector':
                return 'bg-blue-100';
            case 'Special Sub Inspector':
                return 'bg-green-100';
            case 'Sub Inspector':
                return 'bg-yellow-100';
            default:
                return 'bg-white';
        }
    };

    const handleLogout = () => {
        // sessionStorage.clear();
        navigate('/login');
    };


    return (
        <div className="flex min-h-screen">
                 <nav className=" w-80 bg-gray-800 text-white p-6">
            {/* <div className="flex items-start justify-center mb-10 "> */}
                    {/* <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4zM12 2c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"></path>
                    </svg> */}
                    <span className="ml-2 text-xl font-bold">Admin Dashboard</span><br/><br/>
                {/* </div> */}
                <ul>
                <li>
               
               <button  className="flex items-center text-blue-500 hover:text-blue-700">
                   <FaUserCircle className="w-6 h-6 mr-2" />
                   <span>Hi, Admin</span>
               </button>
               
       
           </li> <br></br>
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


                    
                   
<br></br>
                
                  

           <li>
           <button onClick={handleLogout} className="px-4 py-2 bg-red-600 text-white rounded-lg flex items-center">
                   <FaSignOutAlt className="w-5 h-5 mr-2" />
                   Logout
               </button>
           </li>
                    <br></br>
<li>
<Link to="/adminDashboard">
                        <button className="bg-blue-500 text-white p-3 rounded-md shadow-lg flex items-center space-x-2 hover:bg-blue-600">
                            <span>Back </span>
                        </button>
                    </Link>
</li>
                </ul>
            </nav>

            <div className="flex-1 bg-gray-100">
                <div className="p-4 relative">
                    <Link to={`/addpolice`} className="absolute top-4 right-4">
                        <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                            <FaPlus className="mr-2" /> Add Police Officer
                        </button>
                    </Link>

                    {/* <Link to="/adminDashboard">
                        <button className="bg-blue-500 text-white p-3 rounded-md shadow-lg flex items-center space-x-2 hover:bg-blue-600">
                            <span>Back to Dashboard</span>
                        </button>
                    </Link> */}
<br></br><br></br>
                    <input
                        type="text"
                        placeholder="Search by designation, station name, or district"
                        className="w-full p-2 mt-4 mb-6 border border-gray-300 rounded"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="container mx-auto p-8">
                    <h2 className="text-2xl font-bold mb-6">Police Officers</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredOfficers.length > 0 ? (
                            filteredOfficers.map(officer => (
                                <div key={officer.officerId} className={`p-6 rounded-lg shadow-lg ${getCardColor(officer.designation)}`}>
                                    <h3 className="text-xl font-semibold mb-2">{officer.name}</h3>
                                    <p className="text-gray-600 mb-2">Email: {officer.email}</p>
                                    <p className="text-gray-600 mb-2">Phone: {officer.phone}</p>
                                    <p className="text-gray-600 mb-4">Designation: {officer.designation}</p>
                                    {/* Display station details */}
                                    {officer.station ? (
                                        <div className="mt-4 border-t pt-4 border-gray-200">
                                           <strong> <p className="text-gray-600">Station Name: {officer.station.name}</p>
                                            <p className="text-gray-600">Station Location: {officer.station.location}</p>
                                            <p className="hidden">Station ID: {officer.station.stationId}</p></strong>
                                        </div>
                                    ) : (
                                        <p className="text-gray-600">Station information not available.</p>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-600">No police officers found.</p>
                        )}
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default ViewPoliceOfficers;
