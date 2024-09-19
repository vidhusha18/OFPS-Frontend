// // // import React, { useState, useEffect } from 'react';
// // // import axios from 'axios';
// // // import { useParams, Link } from 'react-router-dom';
// // // import { ToastContainer, toast } from 'react-toastify';
// // // import 'react-toastify/dist/ReactToastify.css';

// // // const PoliceList = () => {
// // //     const { stationId } = useParams();
// // //     const [policeOfficers, setPoliceOfficers] = useState([]);

// // //     useEffect(() => {
// // //         axios.get(`http://localhost:9998/police/allPolice/station/${stationId}`)
// // //             .then(response => setPoliceOfficers(response.data))
// // //             .catch(error => {
// // //                 console.error('Error fetching police officers:', error);
// // //                 toast.error('Error fetching police officers.');
// // //             });
// // //     }, [stationId]);

// // //     return (
// // //         <div className="flex h-screen bg-gray-100">
// // //             {/* Sidebar */}
// // //             <nav className="w-64 bg-gray-800 text-white h-screen">
// // //                 <div className="flex items-center mb-8">
// // //                     <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
// // //                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4zM12 2c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"></path>
// // //                     </svg>
// // //                     <span className="ml-2 text-xl font-bold">Admin Dashboard</span>
// // //                 </div>
// // //                 <ul>
// // //                     <li>
// // //                         <Link
// // //                             to="/viewpolice"
// // //                             className="flex items-center p-3 mb-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md"
// // //                         >
// // //                             <FaUserShield className="mr-3" /> View Police Officers
// // //                         </Link>
// // //                     </li>
// // //                     <li>
// // //                         <Link
// // //                             to="/viewstation"
// // //                             className="flex items-center p-3 mb-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md"
// // //                         >
// // //                             <FaBuilding className="mr-3" /> Manage Stations
// // //                         </Link>
// // //                     </li>
// // //                     <li>
// // //                         <button
// // //                             onClick={() => handleViewChange('Complainants Registered')}
// // //                             className="flex items-center p-3 mb-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md"
// // //                         >
// // //                             <FaFileAlt className="mr-3" /> Complainants Registered
// // //                         </button>
// // //                     </li>
// // //                     <li>
// // //                         <button
// // //                             onClick={() => handleViewChange('View Received FIRs')}
// // //                             className="flex items-center p-3 mb-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md"
// // //                         >
// // //                             <FaRegFileAlt className="mr-3" /> View Received FIRs
// // //                         </button>
// // //                     </li>
// // //                     <li>
// // //                         <button
// // //                             onClick={() => handleViewChange('FIR Report')}
// // //                             className="flex items-center p-3 mb-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md"
// // //                         >
// // //                             <FaFileAlt className="mr-3" /> FIR Report
// // //                         </button>
// // //                     </li>
// // //                     {/* <li>
// // //                         <button
// // //                             onClick={() => handleViewChange('FIR Closed')}
// // //                             className="flex items-center p-3 mb-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md"
// // //                         >
// // //                             <FaTimesCircle className="mr-3" /> FIR Closed
// // //                         </button>
// // //                     </li> */}
// // //                 </ul>
// // //             </nav>

// // //             {/* Main Content */}
// // //             <div className="flex-1 flex flex-col relative">
// // //                 <div className="container mx-auto p-8 flex-1">
// // //                     <div className="mb-6">
// // //                         <h2 className="text-2xl font-bold">Police Officers</h2>
// // //                         <Link to="/viewstation">
// // //                             <button className="bg-blue-500 text-white p-3 rounded-md shadow-lg mt-4 hover:bg-blue-600">
// // //                                 Back to Stations
// // //                             </button>
// // //                         </Link>
// // //                     </div>
                    
// // //                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // //                         {policeOfficers.length ? (
// // //                             policeOfficers.map(officer => (
// // //                                 <div key={officer.officerId} className="bg-white p-6 rounded-lg shadow-lg">
// // //                                     <h3 className="text-xl font-semibold mb-2">{officer.name}</h3>
// // //                                     <p className="text-gray-600">Designation: {officer.designation}</p>
// // //                                     <p className="text-gray-600 mb-4">Contact: {officer.Phone}</p>
// // //                                     <p className="text-gray-600">Email: {officer.email}</p>
// // //                                 </div>
// // //                             ))
// // //                         ) : (
// // //                             <p className="text-gray-600">No police officers found.</p>
// // //                         )}
// // //                     </div>
// // //                 </div>
// // //                 <ToastContainer />
// // //             </div>
// // //         </div>
// // //     );
// // // };

// // // export default PoliceList;








// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import { useParams, Link } from 'react-router-dom';
// // import { ToastContainer, toast } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';
// // import { FaUserShield, FaBuilding, FaFileAlt, FaRegFileAlt } from 'react-icons/fa';

// // const PoliceList = () => {
// //     const { stationId } = useParams();
// //     const [policeOfficers, setPoliceOfficers] = useState([]);

// //     useEffect(() => {
// //         axios.get(`http://localhost:9998/police/allPolice/station/${stationId}`)
// //             .then(response => setPoliceOfficers(response.data))
// //             .catch(error => {
// //                 console.error('Error fetching police officers:', error);
// //                 toast.error('Error fetching police officers.');
// //             });
// //     }, [stationId]);

// //     const handleViewChange = (viewName) => {
// //         // Logic for changing the view
// //         console.log(`Changing to view: ${viewName}`);
// //     };

// //     return (
// //         <div className="flex h-screen bg-gray-100">
// //             {/* Sidebar */}
// //             <nav className="w-64 bg-gray-800 text-white h-screen">
// //                 <div className="flex items-center mb-8">
// //                     <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
// //                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4zM12 2c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"></path>
// //                     </svg>
// //                     <span className="ml-2 text-xl font-bold">Admin Dashboard</span>
// //                 </div>
// //                 <ul>
// //                     <li>
// //                         <Link
// //                             to="/viewpolice"
// //                             className="flex items-center p-3 mb-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md"
// //                         >
// //                             <FaUserShield className="mr-3" /> View Police Officers
// //                         </Link>
// //                     </li>
// //                     <li>
// //                         <Link
// //                             to="/viewstation"
// //                             className="flex items-center p-3 mb-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md"
// //                         >
// //                             <FaBuilding className="mr-3" /> Manage Stations
// //                         </Link>
// //                     </li>
// //                     <li>
// //                         <button
// //                             onClick={() => handleViewChange('Complainants Registered')}
// //                             className="flex items-center p-3 mb-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md"
// //                         >
// //                             <FaFileAlt className="mr-3" /> Complainants Registered
// //                         </button>
// //                     </li>
// //                     <li>
// //                         <button
// //                             onClick={() => handleViewChange('View Received FIRs')}
// //                             className="flex items-center p-3 mb-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md"
// //                         >
// //                             <FaRegFileAlt className="mr-3" /> View Received FIRs
// //                         </button>
// //                     </li>
// //                     <li>
// //                         <button
// //                             onClick={() => handleViewChange('FIR Report')}
// //                             className="flex items-center p-3 mb-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md"
// //                         >
// //                             <FaFileAlt className="mr-3" /> FIR Report
// //                         </button>
// //                     </li>
// //                 </ul>
// //             </nav>

// //             {/* Main Content */}
// //             <div className="flex-1 flex flex-col relative">
// //                 <div className="container mx-auto p-8 flex-1">
// //                     <div className="mb-6">
// //                         <h2 className="text-2xl font-bold">Police Officers</h2>
// //                         <Link to="/viewstation">
// //                             <button className="bg-blue-500 text-white p-3 rounded-md shadow-lg mt-4 hover:bg-blue-600">
// //                                 Back to Stations
// //                             </button>
// //                         </Link>
// //                     </div>
                    
// //                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //                         {policeOfficers.length ? (
// //                             policeOfficers.map(officer => (
// //                                 <div key={officer.officerId} className="bg-white p-6 rounded-lg shadow-lg">
// //                                     <h3 className="text-xl font-semibold mb-2">{officer.name}</h3>
// //                                     <p className="text-gray-600">Designation: {officer.designation}</p>
// //                                     <p className="text-gray-600 mb-4">Contact: {officer.Phone}</p>
// //                                     <p className="text-gray-600">Email: {officer.email}</p>
// //                                 </div>
// //                             ))
// //                         ) : (
// //                             <p className="text-gray-600">No police officers found.</p>
// //                         )}
// //                     </div>
// //                 </div>
// //                 <ToastContainer />
// //             </div>
// //         </div>
// //     );
// // };

// // export default PoliceList;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams, Link } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { FaUserShield, FaBuilding, FaFileAlt, FaRegFileAlt } from 'react-icons/fa';

// const PoliceList = () => {
//     const { stationId } = useParams();
//     const [policeOfficers, setPoliceOfficers] = useState([]);

//     useEffect(() => {
//         axios.get(`http://localhost:9998/police/allPolice/station/${stationId}`)
//             .then(response => setPoliceOfficers(response.data))
//             .catch(error => {
//                 console.error('Error fetching police officers:', error);
//                 toast.error('Error fetching police officers.');
//             });
//     }, [stationId]);

//     const handleViewChange = (viewName) => {
//         // Logic for changing the view
//         console.log(`Changing to view: ${viewName}`);
//     };

//     // Determine card color based on designation
//     const getCardColor = (designation) => {
//         switch (designation) {
//             case 'Inspector':
//                 return 'bg-white'; // white background
//             case 'Sub Inspector':
//                 return 'bg-light-blue-100'; // light blue background (assuming you're using Tailwind CSS)
//             default:
//                 return 'bg-gray-200'; // gray background
//         }
//     };

//     return (
//         <div className="flex h-screen bg-gray-100">
//             {/* Sidebar */}
//             <nav className="w-64 bg-gray-800 text-white h-screen">
//                 <div className="flex items-center mb-8">
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
//                 </ul>
//             </nav>

//             {/* Main Content */}
//             <div className="flex-1 flex flex-col relative">
//                 <div className="container mx-auto p-8 flex-1">
//                     <div className="mb-6">
//                         <h2 className="text-2xl font-bold">Police Officers</h2>
//                         <Link to="/viewstation">
//                             <button className="bg-blue-500 text-white p-3 rounded-md shadow-lg mt-4 hover:bg-blue-600">
//                                 Back to Stations
//                             </button>
//                         </Link>
//                     </div>
                    
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                         {policeOfficers.length ? (
//                             policeOfficers.map(officer => (
//                                 <div key={officer.officerId} className={`p-6 rounded-lg shadow-lg ${getCardColor(officer.designation)}`}>
//                                     <h3 className="text-xl font-semibold mb-2">{officer.name}</h3>
//                                     <p className="text-gray-600">Designation: {officer.designation}</p>
//                                     <p className="text-gray-600 mb-4">Contact: {officer.Phone}</p>
//                                     <p className="text-gray-600">Email: {officer.email}</p>
//                                 </div>
//                             ))
//                         ) : (
//                             <p className="text-gray-600">No police officers found.</p>
//                         )}
//                     </div>
//                 </div>
//                 <ToastContainer />
//             </div>
//         </div>
//     );
// };

// export default PoliceList;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaUserShield, FaBuilding, FaFileAlt, FaRegFileAlt,FaTimesCircle,FaSignOutAlt } from 'react-icons/fa';




const PoliceList = () => {
    const { stationId } = useParams();
    const [policeOfficers, setPoliceOfficers] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:9998/police/allPolice/station/${stationId}`)
            .then(response => setPoliceOfficers(response.data))
            .catch(error => {
                console.error('Error fetching police officers:', error);
                toast.error('Error fetching police officers.');
            });
    }, [stationId]);

    const handleViewChange = (viewName) => {
        // Logic for changing the view
        console.log(`Changing to view: ${viewName}`);
    };
    const navigate = useNavigate();

        const handleLogout = () => {
        navigate('/login');
    };

    // Determine card color based on designation
    const getCardColor = (designation) => {
        switch (designation) {
            case 'Inspector':
                return 'bg-yellow-200'; // white background
            case 'Sub Inspector':
                return 'bg-blue-100'; // light blue background (assuming you're using Tailwind CSS)
            default:
                return 'bg-gray-200'; // gray background
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
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
                        <Link to="/viewstation">
                            <button className="bg-blue-500 text-white p-3 rounded-md shadow-lg flex items-center space-x-2 hover:bg-blue-600">
                                <span>Back </span>
                            </button>
                        </Link>
                    </li>
                </ul>
            </nav>
            {/* Main Content */}
            <div className="flex-1 flex flex-col relative">
                <div className="container mx-auto p-8 flex-1">
                    {/* <div className="mb-6">
                        <h2 className="text-2xl font-bold">Police Officers</h2>
                        <Link to="/viewstation">
                            <button className="bg-blue-500 text-white p-3 rounded-md shadow-lg mt-4 hover:bg-blue-600">
                                Back to Stations
                            </button>
                        </Link>
                    </div>
                     */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {policeOfficers.length ? (
                            policeOfficers.map(officer => (
                                <div key={officer.officerId} className={`p-6 rounded-lg shadow-lg ${getCardColor(officer.designation)}`}>
                                    <h3 className="text-xl font-semibold mb-2">Name: {officer.name}</h3>
                                    <p className="text-gray-600"><strong>Designation: </strong>{officer.designation}</p>
                                    <p className="text-gray-600 mb-4"><strong>Contact:</strong> {officer.phone}</p>
                                    <p className="text-gray-600"><strong>Email:</strong> {officer.email}</p>

                                </div>
                            ))
                        ) : (
                            <p className="text-gray-600">No police officers found.</p>
                        )}
                    </div>
                </div>
                <ToastContainer />
            </div>
        </div>
    );
};

export default PoliceList;
