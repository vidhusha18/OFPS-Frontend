
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FaArrowLeft, FaUserCircle, FaSignOutAlt, FaPlus } from 'react-icons/fa';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const PoliceProfile = () => {
//     const [profile, setProfile] = useState(null);
//     const navigate = useNavigate();

//     // Retrieve the officer's email from session storage
//     const userEmail = sessionStorage.getItem('email');

//     useEffect(() => {
//         const fetchProfile = async () => {
//             try {
//                 if (!userEmail) {
//                     throw new Error('User email not found in session storage.');
//                 }

//                 // Fetch profile data
//                 const profileResponse = await axios.get(`http://localhost:9998/police/policeEmail/${email}`);
//                 setProfile(profileResponse.data);

//             } catch (error) {
//                 console.error('Error fetching profile:', error);
//                 toast.error('Error fetching profile.');
//                 // Handle errors appropriately
//             }
//         };

//         fetchProfile();
//     }, []);

//     // Handle logout
//     const handleLogout = () => {
//         sessionStorage.clear(); // Clear all session storage
//         navigate('/login'); // Redirect to login page
//     };

//     // Navigate back to the dashboard
//     const handleBackToDashboard = () => {
//         navigate('/dashboard'); // Adjust route if necessary
//     };

//     // If profile is null, show a loading message
//     if (!profile) {
//         return (
//             <div className="flex items-center justify-center min-h-screen">
//                 <p className="text-gray-600">Loading...</p>
//             </div>
//         );
//     }

//     return (
//         <div className="flex min-h-screen">
//             {/* Sidebar */}
//             <nav className="w-64 bg-gray-800 text-white p-6">
//                 <div className="flex items-center mb-8">
//                     <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4zM12 2c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"></path>
//                     </svg>
//                     <span className="ml-2 text-xl font-bold">Police Dashboard</span>
//                 </div>
//                 <ul>
//                     <li>
//                         <a href="#" className="flex items-center p-3 mb-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md">
//                             <FaPlus className="mr-2" /> FIR Received
//                         </a>
//                     </li>
//                     <li>
//                         <a href="/viewfir" className="flex items-center p-3 mb-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md">
//                             View FIRs
//                         </a>
//                     </li>
//                     <div className="mt-4">
//                         <button onClick={handleLogout} className="px-4 py-2 bg-red-600 text-white rounded-lg">
//                             Logout
//                         </button>
//                     </div>
//                 </ul>
//             </nav>

//             {/* Main Content */}
//             <div className="flex-1 bg-gray-100">
//                 <nav className="bg-white shadow-md py-4 px-8 flex items-center justify-between">
//                     <button onClick={handleBackToDashboard} className="flex items-center text-gray-600 hover:text-gray-800">
//                         <FaArrowLeft className="w-6 h-6 mr-2" />
//                         <span>Back to Dashboard</span>
//                     </button>
//                     <div className="flex items-center space-x-4">
//                         <div className="flex items-center space-x-2 text-gray-600">
//                             <FaUserCircle className="w-8 h-8" />
//                             <h5>{profile.email}</h5>
//                         </div>
//                         <button onClick={handleLogout} className="text-gray-600 hover:text-gray-800">
//                             <FaSignOutAlt className="w-8 h-8" />
//                         </button>
//                     </div>
//                 </nav>
//                 <div className="container mx-auto p-8">
//                     <h2 className="text-2xl font-bold mb-6">Profile Details</h2>
//                     <div className="bg-white p-6 rounded-lg shadow-lg">
//                         <h3 className="text-xl font-semibold mb-2">Officer ID: {profile.officerId}</h3>
//                         <p className="text-gray-600 mb-2">Name: {profile.name}</p>
//                         <p className="text-gray-600 mb-2">Email: {profile.email}</p>
//                         <p className="text-gray-600 mb-2">Phone: {profile.phone}</p>
//                         <p className="text-gray-600 mb-2">Designation: {profile.designation}</p>
//                         <p className="text-gray-600 mb-2">Station: {profile.station?.name || 'N/A'}</p>
//                     </div>
//                 </div>
//             </div>
//             <ToastContainer />
//         </div>
//     );
// };

// export default PoliceProfile;
