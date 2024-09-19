
// import React, { useState, useEffect,navigate } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { FaSearch, FaMapMarkerAlt, FaPlus } from 'react-icons/fa';

// const ViewStations = () => {
//     const [stations, setStations] = useState([]);
//     const [nameSearch, setNameSearch] = useState('');
//     const [locationSearch, setLocationSearch] = useState('');

//     useEffect(() => {
//         axios.get('http://localhost:9998/station/all')
//             .then(response => setStations(response.data))
//             .catch(error => {
//                 console.error('Error fetching stations:', error);
//                 toast.error('Error fetching stations.');
//             });
//     }, []);
//     const handleLogout = () => {
//         sessionStorage.clear(); // Clear all session storage
//         navigate('/login'); // Redirect to login page
//     };
//     const filteredStations = stations.filter(station =>
//         station.name.toLowerCase().includes(nameSearch.toLowerCase()) &&
//         station.location.toLowerCase().includes(locationSearch.toLowerCase())
//     );

//     return (
//         <div className="flex h-screen bg-gray-100">
//             {/* <nav className="w-64 bg-gray-800 text-white p-6">
//                 <div className="flex items-center mb-8">
//                     <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4zM12 2c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"></path>
//                     </svg>
//                     <span className="ml-2 text-xl font-bold">Admin Dashboard</span>
//                 </div>
//                 <ul>
//                     <li><Link to="/adminDashboard" className="flex items-center p-3 mb-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md">Back to Dashboard</Link></li>
//                     <li><Link to="/viewpolice" className="flex items-center p-3 mb-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md">View Police Officers</Link></li>
//                     <li><Link to="/viewstation" className="flex items-center p-3 mb-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md">Manage Stations</Link></li>
//                    </ul>
//             </nav> */}

// <nav className="w-64 bg-gray-800 text-white h-screen">
//             <div className="flex items-center mb-8">
//                     <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4zM12 2c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"></path>
//                     </svg>
//                     <span className="ml-2 text-xl font-bold">Admin Dashboard</span>
//                 </div>
//                 <ul>
//                     <li>
//                         <Link
//                             to="/viewpolice"
//                             className="flex items-center p-3 mb-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md"
//                         >
//                             <FaUserShield className="mr-3" /> View Police Officers
//                         </Link>
//                     </li>
//                     <li>
//                         <Link
//                             to="/viewstation"
//                             className="flex items-center p-3 mb-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md"
//                         >
//                             <FaBuilding className="mr-3" /> Manage Stations
//                         </Link>
//                     </li>
//                     <li>
//                         <button
//                             onClick={() => handleViewChange('Complainants Registered')}
//                             className="flex items-center p-3 mb-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md"
//                         >
//                             <FaFileAlt className="mr-3" /> Complainants Registered
//                         </button>
//                     </li>
//                     <li>
//                         <button
//                             onClick={() => handleViewChange('View Received FIRs')}
//                             className="flex items-center p-3 mb-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md"
//                         >
//                             <FaRegFileAlt className="mr-3" /> View Received FIRs
//                         </button>
//                     </li>
//                     <li>
//                         <button
//                             onClick={() => handleViewChange('FIR Report')}
//                             className="flex items-center p-3 mb-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md"
//                         >
//                             <FaFileAlt className="mr-3" /> FIR Report
//                         </button>
//                     </li>
//                     <li>
//                         <button
//                             onClick={() => handleViewChange('FIR Closed')}
//                             className="flex items-center p-3 mb-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md"
//                         >
//                             <FaTimesCircle className="mr-3" /> FIR Closed
//                         </button>
//                     </li>
//                 </ul>
//             </nav>

//             <div className="flex-1 flex flex-col relative">
//                 <div className="container mx-auto p-8 flex-1">
//                     <div className="relative mb-6">
//                         <h2 className="text-2xl font-bold">Stations</h2>
//                         <div className="absolute top-4 right-4 flex space-x-4">
//                             <Link to="/addstation">
//                                 <button className="bg-blue-500 text-white p-3 rounded-md shadow-lg flex items-center space-x-2 hover:bg-blue-600">
//                                     <FaPlus className="text-xl" />
//                                     <span>Add Station</span>
//                                 </button>
//                             </Link>
//                             <Link to="/adminDashboard">
//                                 <button className="bg-blue-500 text-white p-3 rounded-md shadow-lg flex items-center space-x-2 hover:bg-blue-600">
//                                     <span>Back to Dashboard</span>
//                                 </button>
//                             </Link>
//                         </div>
//                     </div>
//                     <br></br><br></br>

//                     <div className="mb-6 flex flex-col space-y-4">
//                         <div className="relative">
//                             <input
//                                 type="text"
//                                 value={nameSearch}
//                                 onChange={(e) => setNameSearch(e.target.value)}
//                                 placeholder="Search by name"
//                                 className="w-full p-3 pl-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             />
//                             <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                         </div>
//                         <div className="relative">
//                             <input
//                                 type="text"
//                                 value={locationSearch}
//                                 onChange={(e) => setLocationSearch(e.target.value)}
//                                 placeholder="Search by location"
//                                 className="w-full p-3 pl-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             />
//                             <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                         </div>
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                         {filteredStations.length ? (
//                             filteredStations.map(station => (
//                                 <div key={station.stationId} className="bg-white p-6 rounded-lg shadow-lg">
//                                     <h3 className="text-xl font-semibold mb-2">{station.name}</h3>
//                                     <p className="text-gray-600 mb-4">{station.location}</p>
//                                     <Link to={`/police/${station.stationId}`}>
//                                         <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
//                                             View Police Officers
//                                         </button>
//                                     </Link>
//                                 </div>
//                             ))
//                         ) : (
//                             <p className="text-gray-600">No stations found.</p>
//                         )}
//                     </div>
//                 </div>
//                 <ToastContainer />
//             </div>
//         </div>
//     );
// };

// export default ViewStations;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaSearch, FaMapMarkerAlt, FaSignOutAlt,FaUserCircle,FaPlus, FaUserShield, FaBuilding, FaFileAlt, FaRegFileAlt, FaTimesCircle } from 'react-icons/fa';

const ViewStations = () => {
    const [stations, setStations] = useState([]);
    const [nameSearch, setNameSearch] = useState('');
    const [locationSearch, setLocationSearch] = useState('');
    const navigate = useNavigate(); // Hook for navigation

    useEffect(() => {
        axios.get('http://localhost:9998/station/all')
            .then(response => setStations(response.data))
            .catch(error => {
                console.error('Error fetching stations:', error);
                toast.error('Error fetching stations.');
            });
    }, []);

    const handleLogout = () => {
        sessionStorage.clear(); // Clear all session storage
        navigate('/login'); // Redirect to login page
    };

    const filteredStations = stations.filter(station =>
        station.name.toLowerCase().includes(nameSearch.toLowerCase()) &&
        station.location.toLowerCase().includes(locationSearch.toLowerCase())||station.branch.toLowerCase().includes(locationSearch.toLowerCase())
    );

    
    // const handleViewChange = (view) => {
    //     setSelectedView(view);
    // };

    return (
        <div className="flex h-screen bg-gray-100">
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
                            // onClick={() => handleViewChange('Complainants Registered')}
                            className="flex items-center p-3 mb-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md"
                        >
                            <FaFileAlt className="mr-3" /> Complainants Registered
                        </button>
                    </li>
                    <li>
                        <button
                            // onClick={() => handleViewChange('View Received FIRs')}
                            className="flex items-center p-3 mb-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md"
                        >
                            <FaRegFileAlt className="mr-3" /> View Received FIRs
                        </button>
                    </li>
                    <li>
                        <button
                            // onClick={() => handleViewChange('FIR Report')}
                            className="flex items-center p-3 mb-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md"
                        >
                            <FaFileAlt className="mr-3" /> FIR Report
                        </button>
                    </li>
                    <li>
                        <button
                            // onClick={() => handleViewChange('FIR Closed')}
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

            <div className="flex-1 flex flex-col relative">
                <div className="container mx-auto p-8 flex-1">
                    <div className="relative mb-6">
                        <h2 className="text-2xl font-bold">Stations</h2>
                        <div className="absolute top-4 right-4 flex space-x-4">
                            <Link to="/addstation">
                                <button className="bg-blue-500 text-white p-3 rounded-md shadow-lg flex items-center space-x-2 hover:bg-blue-600">
                                    <FaPlus className="text-xl" />
                                    <span>Add Station</span>
                                </button>
                            </Link>

                            <Link to="/addpolice">
                                <button className="bg-blue-500 text-white p-3 rounded-md shadow-lg flex items-center space-x-2 hover:bg-blue-600">
                                    <FaPlus className="text-xl" />
                                    <span>Add police Officers</span>
                                </button>
                            </Link> 
                            {/* <Link to="/adminDashboard">
                                <button className="bg-blue-500 text-white p-3 rounded-md shadow-lg flex items-center space-x-2 hover:bg-blue-600">
                                    <span>Back to Dashboard</span>
                                </button>
                            </Link> */}
                        </div>
                    </div>
                    <br /><br />

                    <div className="mb-6 flex flex-col space-y-4">
                        <div className="relative">
                            <input
                                type="text"
                                value={nameSearch}
                                onChange={(e) => setNameSearch(e.target.value)}
                                placeholder="Search by name"
                                className="w-full p-3 pl-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                        <div className="relative">
                            <input
                                type="text"
                                value={locationSearch}
                                onChange={(e) => setLocationSearch(e.target.value)}
                                placeholder="Search stations by District or Branch  "
                                className="w-full p-3 pl-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredStations.length ? (
                            filteredStations.map(station => (
                                <div key={station.stationId} className="bg-white p-6 rounded-lg shadow-lg">
                                    <h3 className="text-xl font-semibold mb-2">Station {station.name}</h3>
                                    <p className="text-gray-600 mb-4"> Branch: {station.branch}</p>
                                    <p className="text-gray-600 mb-4">District:{station.location}</p>
                                    <Link to={`/police/${station.stationId}`}>
                                        <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                                            View Police Officers
                                        </button>
                                    </Link> 

                                    
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-600">No stations found.</p>
                        )}
                    </div>
                </div>
                <ToastContainer />
            </div>
        </div>
    );
};

export default ViewStations;
