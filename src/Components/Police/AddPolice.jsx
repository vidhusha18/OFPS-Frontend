


// import React, { useState, useEffect } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import { FaUserShield, FaBuilding, FaFileAlt, FaRegFileAlt, FaTimesCircle, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';

// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const AddPoliceOfficer = () => {
//     const navigate = useNavigate();
//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         phone: '',
//         password: '',
//         designation: '', // Changed from empty string to match the select value
//         station: { stationId: '' } // Station as an object with stationId
//     });

//     const [stations, setStations] = useState([]);

//     useEffect(() => {
//         axios.get('http://localhost:9998/station/all')
//             .then(response => setStations(response.data))
//             .catch(error => console.error('Error fetching stations:', error));
//     }, []);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
        
//         // Check if the name is 'stationId' to handle nested state update
//         if (name === 'stationId') {
//             setFormData(prev => ({
//                 ...prev,
//                 station: { stationId: value } // Update the stationId in the station object
//             }));
//         } else if (name === 'designation') {
//             setFormData(prev => ({
//                 ...prev,
//                 designation: value // Update the designation field
//             }));
//         } else {
//             setFormData(prev => ({
//                 ...prev,
//                 [name]: value
//             }));
//         }
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (validateValues(formData)) {
//             axios.post('http://localhost:9998/police/register', formData)
//                 .then(response => {
//                     Swal.fire({
//                         icon: 'success',
//                         title: 'Success',
//                         text: 'Police officer added successfully!',
//                     });
//                     setFormData({
//                         name: '',
//                         email: '',
//                         phone: '',
//                         password: '',
//                         designation: '', // Reset designation field
//                         station: { stationId: '' } // Reset station object
//                     });
//                     navigate('/viewpolice');
//                 })
//                 .catch(error => {
//                     Swal.fire({
//                         icon: 'error',
//                         title: 'Error',
//                         text: 'Error adding police officer.',
//                     });
//                     console.error('Error adding officer:', error);
//                 });
//         } else {
//             Swal.fire({
//                 icon: 'warning',
//                 title: 'Incomplete Form',
//                 text: 'Please fill all the fields',
//             });
//         }
//     };
//     const handleLogout = () => {
//         // sessionStorage.clear();
//         navigate('/login');
//     };

//     const validateValues = (data) => {
//         return data.name && data.email && data.phone && data.password && data.designation && data.station.stationId;
//     };

//     return (
//         <div className="flex h-screen bg-gray-100">
//             {/* Sidebar */}
//             <nav className="w-80 bg-gray-800 text-white p-6">
//                 <span className="ml-2 text-xl font-bold">Admin Dashboard</span><br /><br />
//                 <ul>
//                     <li>
//                         <button className="flex items-center text-blue-500 hover:text-blue-700">
//                             <FaUserCircle className="w-6 h-6 mr-2" />
//                             <span>Hi, Admin</span>
//                         </button>
//                     </li>
//                     <br />
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
//                             // onClick={() => handleViewChange('Complainants Registered')}
//                             className="flex items-center p-3 mb-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md"
//                         >
//                             <FaFileAlt className="mr-3" /> Complainants Registered
//                         </button>
//                     </li>
//                     <li>
//                         <button
//                             // onClick={() => handleViewChange('View Received FIRs')}
//                             className="flex items-center p-3 mb-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md"
//                         >
//                             <FaRegFileAlt className="mr-3" /> View Received FIRs
//                         </button>
//                     </li>
//                     <li>
//                         <button
//                             // onClick={() => handleViewChange('FIR Report')}
//                             className="flex items-center p-3 mb-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md"
//                         >
//                             <FaFileAlt className="mr-3" /> FIR Report
//                         </button>
//                     </li>
//                     <li>
//                         <button
//                             // onClick={() => handleViewChange('FIR Closed')}
//                             className="flex items-center p-3 mb-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md"
//                         >
//                             <FaTimesCircle className="mr-3" /> FIR Closed
//                         </button>
//                     </li>
//                     <br />
//                     <li>
//                         <button onClick={handleLogout} className="px-4 py-2 bg-red-600 text-white rounded-lg flex items-center">
//                             <FaSignOutAlt className="w-5 h-5 mr-2" />
//                             Logout
//                         </button>
//                     </li>
//                     <br />
//                     <li>
//                         <Link to="/adminDashboard">
//                             <button className="bg-blue-500 text-white p-3 rounded-md shadow-lg flex items-center space-x-2 hover:bg-blue-600">
//                                 <span>Back </span>
//                             </button>
//                         </Link>
//                     </li>
//                 </ul>
//             </nav>

//             {/* Main Content */}
//             <main className="flex-1 p-10">
//             {/* <Link to="/viewstation">
//                                 <button className="bg-blue-500 text-white p-3 rounded-md shadow-lg flex items-center space-x-2 hover:bg-blue-600">
//                                     <span>Back to Dashboard</span>
//                                 </button>
//                             </Link> */}
//                 <div className="bg-gray-100 flex items-center justify-center min-h-screen">
//                     <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
//                         <h2 className="text-2xl font-bold mb-6">Add Police Officer</h2>
//                         <form onSubmit={handleSubmit}>
//                             <div className="mb-4">
//                                 <label htmlFor="name" className="block text-gray-700 font-medium">Name</label>
//                                 <input
//                                     type="text"
//                                     id="name"
//                                     name="name"
//                                     value={formData.name}
//                                     onChange={handleChange}
//                                     className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                     required
//                                 />
//                             </div>
//                             <div className="mb-4">
//                                 <label htmlFor="email" className="block text-gray-700 font-medium">Email</label>
//                                 <input
//                                     type="email"
//                                     id="email"
//                                     name="email"
//                                     value={formData.email}
//                                     onChange={handleChange}
//                                     className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                     required
//                                 />
//                             </div>
//                             <div className="mb-4">
//                                 <label htmlFor="phone" className="block text-gray-700 font-medium">Phone</label>
//                                 <input
//                                     type="tel"
//                                     id="phone"
//                                     name="phone"
//                                     value={formData.phone}
//                                     onChange={handleChange}
//                                     className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                     required
//                                 />
//                             </div>
//                             <div className="mb-4">
//                                 <label htmlFor="password" className="block text-gray-700 font-medium">Password</label>
//                                 <input
//                                     type="password"
//                                     id="password"
//                                     name="password"
//                                     value={formData.password}
//                                     onChange={handleChange}
//                                     className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                     required
//                                 />
//                             </div>
//                             <div className="mb-4">
//                                 <label htmlFor="designation" className="block text-gray-700 font-medium">Designation</label>
//                                 <select
//                                     id="designation"
//                                     name="designation"
//                                     value={formData.designation}
//                                     onChange={handleChange}
//                                     className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                     required
//                                 >
//                                     <option value="">Select a designation</option>
//                                     <option value="Inspector">Inspector</option>
//                                     <option value="Sub Inspector">Sub Inspector</option>
//                                     <option value="Special Sub Inspector">Special Sub Inspector</option>
//                                 </select>
//                             </div>
//                             <div className="mb-4">
//                                 <label htmlFor="stationId" className="block text-gray-700 font-medium">Station</label>
//                                 <select
//                                     id="stationId"
//                                     name="stationId"
//                                     value={formData.station.stationId}
//                                     onChange={handleChange}
//                                     className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                     required
//                                 >
//                                     <option value="">Select a station</option>
//                                     {stations.map(station => (
//                                         <option key={station.stationId} value={station.stationId}>
//                                             {station.name}
//                                         </option>
//                                     ))}
//                                 </select>
//                             </div>
//                             <div className="flex items-center justify-between">
//                                 <button
//                                     type="submit"
//                                     className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//                                 >
//                                     Add Officer
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </main>

//             {/* Toast Notifications */}
//             <ToastContainer />
//         </div>
//     );
// };

// export default AddPoliceOfficer;

import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaUserShield, FaBuilding, FaFileAlt, FaRegFileAlt, FaTimesCircle, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddPoliceOfficer = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        designation: '',
        station: { stationId: '' }
    });

    const [stations, setStations] = useState([]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        axios.get('http://localhost:9998/station/all')
            .then(response => setStations(response.data))
            .catch(error => console.error('Error fetching stations:', error));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'stationId') {
            setFormData(prev => ({
                ...prev,
                station: { stationId: value }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }

        // Clear errors on field change
        setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateValues(formData);
        if (Object.keys(validationErrors).length === 0) {
            axios.post('http://localhost:9998/police/register', formData)
                .then(response => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Police officer added successfully!',
                    });
                    setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        password: '',
                        designation: '',
                        station: { stationId: '' }
                    });
                    navigate('/viewpolice');
                })
                .catch(error => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Error adding police officer.',
                    });
                    console.error('Error adding officer:', error);
                });
        } else {
            setErrors(validationErrors);
        }
    };

    const handleLogout = () => {
        navigate('/login');
    };

    const validateValues = (data) => {
        const errors = {};
        const phoneRegex = /^[0-9]{10}$/; // Example regex for 10-digit phone number
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex

        if (!data.name) errors.name = 'Name is required';
        if (!data.email) {
            errors.email = 'Email is required';
        } else if (!emailRegex.test(data.email)) {
            errors.email = 'Email is invalid';
        }
        if (!data.phone) {
            errors.phone = 'Phone number is required';
        } else if (!phoneRegex.test(data.phone)) {
            errors.phone = 'Phone number must be 10 digits';
        }
        if (!data.password) errors.password = 'Password is required';
        if (!data.designation) errors.designation = 'Designation is required';
        if (!data.station.stationId) errors.stationId = 'Station is required';

        return errors;
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <nav className="w-80 bg-gray-800 text-white p-6">
                <span className="ml-2 text-xl font-bold">Admin Dashboard</span><br /><br />
                <ul>
                    <li>
                        <button className="flex items-center text-blue-500 hover:text-blue-700">
                            <FaUserCircle className="w-6 h-6 mr-2" />
                            <span>Hi, Admin</span>
                        </button>
                    </li>
                    <br />
                    <li>
                        <Link to="/viewpolice" className="flex items-center p-3 mb-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md">
                            <FaUserShield className="mr-3" /> View Police Officers
                        </Link>
                    </li>
                    <li>
                        <Link to="/viewstation" className="flex items-center p-3 mb-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md">
                            <FaBuilding className="mr-3" /> Manage Stations
                        </Link>
                    </li>
                    {/* Other links omitted for brevity */}
                    <li>
                        <button onClick={handleLogout} className="px-4 py-2 bg-red-600 text-white rounded-lg flex items-center">
                            <FaSignOutAlt className="w-5 h-5 mr-2" />
                            Logout
                        </button>
                    </li>
                    <br />
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
            <main className="flex-1 p-10">
                <div className="bg-gray-100 flex items-center justify-center min-h-screen">
                    <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-6">Add Police Officer</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-gray-700 font-medium">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={`mt-1 block w-full p-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    required
                                />
                                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-gray-700 font-medium">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`mt-1 block w-full p-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    required
                                />
                                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="phone" className="block text-gray-700 font-medium">Phone</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className={`mt-1 block w-full p-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    required
                                />
                                {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="block text-gray-700 font-medium">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`mt-1 block w-full p-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    required
                                />
                                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="designation" className="block text-gray-700 font-medium">Designation</label>
                                <select
                                    id="designation"
                                    name="designation"
                                    value={formData.designation}
                                    onChange={handleChange}
                                    className={`mt-1 block w-full p-2 border ${errors.designation ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    required
                                >
                                    <option value="">Select a designation</option>
                                    <option value="Inspector">Inspector</option>
                                    <option value="Sub Inspector">Sub Inspector</option>
                                    <option value="Special Sub Inspector">Special Sub Inspector</option>
                                </select>
                                {errors.designation && <p className="text-red-500 text-sm">{errors.designation}</p>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="stationId" className="block text-gray-700 font-medium">Station</label>
                                <select
                                    id="stationId"
                                    name="stationId"
                                    value={formData.station.stationId}
                                    onChange={handleChange}
                                    className={`mt-1 block w-full p-2 border ${errors.stationId ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    required
                                >
                                    <option value="">Select a station</option>
                                    {stations.map(station => (
                                        <option key={station.stationId} value={station.stationId}>
                                            {station.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.stationId && <p className="text-red-500 text-sm">{errors.stationId}</p>}
                            </div>
                            <div className="flex items-center justify-between">
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                >
                                    Add Officer
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>

            {/* Toast Notifications */}
            <ToastContainer />
        </div>
    );
};

export default AddPoliceOfficer;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import { useNavigate } from 'react-router-dom';
// import { FaArrowLeft, FaUserCircle } from 'react-icons/fa';

// const districts = [
//     'Madurai / மதுரை',
//     'Dindigul / திண்டுக்கல்',
//     'Virudhunagar / விருதுநகர்',
//     'Theni / தேனி',
//     'Thoothukudi / தூத்துக்குடி',
//     'Trichy / திருச்சிராப்பள்ளி',
//     'Chennai / சென்னை',
//     'Thirunelveli / திருநெல்வேலி',
//     'Coimbatore / கோயம்புத்தூர்'
// ];

// const id = sessionStorage.getItem("ComplainantId");

// const incidentTypes = [
//     { value: 'Theft', label: 'Theft / Stealing someone else\'s property without permission / மற்றவரின் சொத்துகளை அனுமதி இல்லாமல் கொள்ளுதல்.' },
//     { value: 'Burglary', label: 'Burglary / Breaking into a building to commit theft / ஒரு கட்டிடத்தில் புகுந்து கொள்ளை செய்ய முயற்சித்தல்.' },
//     { value: 'Assault', label: 'Assault / Physically attacking someone / ஒருவரை உடல்தடையுடன் தாக்குதல்.' },
//     { value: 'Robbery', label: 'Robbery / Using force or intimidation to take property from someone / பயமுறுத்தல் அல்லது வலிமையைப் பயன்படுத்தி சொத்துகளைப் பறிப்பு.' },
//     { value: 'Fraud', label: 'Fraud / Deceptive actions to gain something illegally, like money / பணம் போன்றவற்றைப் பெறுவதற்கான மோசமான நடவடிக்கைகள்.' },
//     { value: 'Murder', label: 'Murder / Intentionally killing another person / மற்றொருவரை நோக்காகக் கொல்லுதல்.' },
//     { value: 'Vandalism', label: 'Vandalism / Deliberately damaging property / சொத்துகளை தீராகக் சேதம் செய்தல்.' },
//     { value: 'Kidnapping', label: 'Kidnapping / Forcibly taking someone away, often to demand ransom / நகைச்சுவையாகக் கொண்டு செல்லுதல், பெரும்பாலும் பணம் கேட்க.' },
//     { value: 'Arson', label: 'Arson / Deliberately setting fire to property / சொத்துகளுக்கு தீ வைப்பது.' },
//     { value: 'Drug Trafficking', label: 'Drug Trafficking / Illegal distribution or sale of drugs / மது தடுப்பு அல்லது விற்பனைக்கு சட்டவிரோதமாகச் செயல்.' },
//     { value: 'Cybercrime', label: 'Cybercrime / Crimes committed using computers or the internet, such as hacking / கணினிகள் அல்லது இணையத்தைப் பயன்படுத்தி செய்த குற்றங்கள்.' },
//     { value: 'Embezzlement', label: 'Embezzlement / Misappropriating funds entrusted to you / உங்கள் மேலாண்மையிலுள்ள நிதிகளைத் திருடுதல்.' },
//     { value: 'Domestic Violence', label: 'Domestic Violence / Abuse or violence occurring within a domestic setting / வீட்டுக்குள் நடந்த கூர்மையான தாக்குதல் அல்லது வன்முறை.' },
//     { value: 'Extortion', label: 'Extortion / Obtaining money or valuables through coercion or threats / அழுத்தம் அல்லது அச்சுறுத்தல் மூலம் பணம் அல்லது மதிப்பற்றவற்றைப் பெறுதல்.' }
// ];

// const suspectOptions = [
//     'Suspect / சந்தேகத்திற்குரியவர்',
//     'Perpetrator / குற்றவாளி',
//     'Unknown / தெரியவில்லை'
// ];

// const AddComplaintPage = () => {
//     const [complainant, setComplainant] = useState({
//         complainantId: '',
//         name: '',
//         dob: '',
//         identificationType: '',
//         idNumber: '',
//         address: '',
//         gender: '',
//         phone: ''
//     });

//     const [firDetails, setFirDetails] = useState({
//         incidentType: '',
//         incidentDate: '',
//         incidentPlace: '',
//         incidentDistrict: '',
//         incidentDescription: '',
//         incidentProof: null,
//         suspectType: 'Unknown / தெரியவில்லை',
//         incidentSuspect: ''
//     });

//     const [submitted, setSubmitted] = useState(false);
//     const navigate = useNavigate();

//     useEffect(() => {
//         // Fetch complainant details from profile (assuming email in sessionStorage)
//         const email = sessionStorage.getItem('email');
//         if (email) {
//             axios.get(`http://localhost:9998/complainant/email/${email}`)
//                 .then(response => {
//                     setComplainant(response.data);
//                 })
//                 .catch(err => console.error('Error fetching complainant data:', err));
//         }
//     }, []);

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFirDetails(prevDetails => ({ ...prevDetails, [name]: value }));
//     };

//     const handleFileChange = (e) => {
//         setFirDetails(prevDetails => ({ ...prevDetails, incidentProof: e.target.files[0] }));
//     };

//     const handleSuspectChange = (e) => {
//         const value = e.target.value;
//         setFirDetails(prevDetails => ({
//             ...prevDetails,
//             suspectType: value,
//             incidentSuspect: value === 'Unknown / தெரியவில்லை' ? '' : prevDetails.incidentSuspect
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const today = new Date().toISOString().split('T')[0];
//         if (firDetails.incidentDate > today) {
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Invalid Date',
//                 text: 'Incident date cannot be a future date.',
//             });
//             return;
//         }

//         const formData = new FormData();
//         Object.keys(firDetails).forEach(key => {
//             if (key === 'incidentProof' && firDetails[key]) {
//                 formData.append(key, firDetails[key]);
//             } else {
//                 formData.append(key, firDetails[key] || '');
//             }
//         });
//         formData.append('id', id);

//         try {
//             await axios.post('http://localhost:9998/fir/addfir', formData);
//             setSubmitted(true);
//         } catch (err) {
//             console.error('Error submitting FIR:', err);
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Submission Failed',
//                 text: 'There was an issue submitting your complaint.',
//             });
//         }
//     };

//     if (submitted) {
//         return (
//             <div className="p-8 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
//                 <div className="mb-6">
//                     <h1 className="text-2xl font-semibold mb-4">Complaint Successfully Filed</h1>
//                 </div>
//                 <div className="bg-gray-100 p-6 rounded-lg shadow-md">
//                     <h2 className="text-xl font-semibold mb-4">Complaint Details</h2>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         <div>
//                             <h3 className="text-lg font-semibold mb-2">Complainant Details</h3>
//                             <p><strong>Name:</strong> {complainant.name}</p>
//                             <p><strong>Date of Birth:</strong> {complainant.dob}</p>
//                             <p><strong>Identification Type:</strong> {complainant.identificationType}</p>
//                             <p><strong>ID Number:</strong> {complainant.idNumber}</p>
//                             <p><strong>Address:</strong> {complainant.address}</p>
//                             <p><strong>Gender:</strong> {complainant.gender}</p>
//                             <p><strong>Phone:</strong> {complainant.phone}</p>
//                         </div>
//                         <div>
//                             <h3 className="text-lg font-semibold mb-2">Complaint Details</h3>
//                             <p><strong>Incident Type:</strong> {firDetails.incidentType}</p>
//                             <p><strong>Incident Date:</strong> {firDetails.incidentDate}</p>
//                             <p><strong>Incident Place:</strong> {firDetails.incidentPlace}</p>
//                             <p><strong>Incident District:</strong> {firDetails.incidentDistrict}</p>
//                             <p><strong>Description:</strong> {firDetails.incidentDescription}</p>
//                             {firDetails.incidentProof && <p><strong>Proof:</strong> {firDetails.incidentProof.name}</p>}
//                             <p><strong>Suspect Type:</strong> {firDetails.suspectType}</p>
//                             {firDetails.suspectType !== 'Unknown / தெரியவில்லை' && <p><strong>Suspect/Perpetrator Details:</strong> {firDetails.incidentSuspect}</p>}
//                         </div>
//                     </div>
//                 </div>
//                 <div className="mt-6">
//                     <button
//                         onClick={() => navigate('/complainantDashboard')}
//                         className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
//                     >
//                         Back to Dashboard
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div>
//             {/* <nav className="bg-gray-800 p-4 text-white flex items-center justify-between">
//                 <button
//                     onClick={() => navigate('/complainantDashboard')}
//                     className="flex items-center space-x-2"
//                 >
//                     <FaArrowLeft className="text-lg" />
//                     <span>Back to Dashboard</span>
//                 </button>
//                 <div className="flex items-center space-x-2">
//                     <FaUserCircle className="text-2xl" />
//                     <span>{complainant.name}</span>
//                 </div>
//             </nav> */}

//             <div className="p-8 max-w-4xl mx-auto bg-white shadow-lg rounded-lg mt-6">
//                 <h1 className="text-2xl font-semibold mb-6">Add New Complaint</h1>
//                 <form onSubmit={handleSubmit} encType="multipart/form-data">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                         <div className="bg-gray-100 p-4 rounded-lg">
//                             <h2 className="text-xl font-semibold mb-4">Complainant Details</h2>
//                             <div className="space-y-2">
//                                 <div>
//                                     <label className="block text-gray-700">Name:</label>
//                                     <input
//                                         type="text"
//                                         value={complainant.name}
//                                         readOnly
//                                         className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-200"
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className="block text-gray-700">Date of Birth:</label>
//                                     <input
//                                         type="text"
//                                         value={complainant.dob}
//                                         readOnly
//                                         className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-200"
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className="block text-gray-700">Identification Type:</label>
//                                     <input
//                                         type="text"
//                                         value={complainant.identificationType}
//                                         readOnly
//                                         className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-200"
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className="block text-gray-700">ID Number:</label>
//                                     <input
//                                         type="text"
//                                         value={complainant.idNumber}
//                                         readOnly
//                                         className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-200"
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className="block text-gray-700">Address:</label>
//                                     <input
//                                         type="text"
//                                         value={complainant.address}
//                                         readOnly
//                                         className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-200"
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className="block text-gray-700">Gender:</label>
//                                     <input
//                                         type="text"
//                                         value={complainant.gender}
//                                         readOnly
//                                         className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-200"
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className="block text-gray-700">Phone:</label>
//                                     <input
//                                         type="text"
//                                         value={complainant.phone}
//                                         readOnly
//                                         className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-200"
//                                     />
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="bg-gray-100 p-4 rounded-lg">
//                             <h2 className="text-xl font-semibold mb-4">Complaint Details</h2>
//                             <div className="space-y-4">
//                                 <div>
//                                     <label className="block text-gray-700 mb-2">Incident Type: *</label>
//                                     <select
//                                         name="incidentType"
//                                         value={firDetails.incidentType}
//                                         onChange={handleInputChange}
//                                         className="w-full px-4 py-2 border border-gray-300 rounded-md"
//                                         required
//                                     >
//                                         <option value="" disabled>Select Incident Type</option>
//                                         {incidentTypes.map(type => (
//                                             <option key={type.value} value={type.value}>{type.label}</option>
//                                         ))}
//                                     </select>
//                                 </div>
//                                 <div>
//                                     <label className="block text-gray-700 mb-2">Incident Date:</label>
//                                     <input
//                                         type="date"
//                                         name="incidentDate"
//                                         value={firDetails.incidentDate}
//                                         onChange={handleInputChange}
//                                         max={new Date().toISOString().split('T')[0]}
//                                         className="w-full px-4 py-2 border border-gray-300 rounded-md"
//                                         required
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className="block text-gray-700 mb-2">Incident Place:</label>
//                                     <input
//                                         type="text"
//                                         name="incidentPlace"
//                                         value={firDetails.incidentPlace}
//                                         onChange={handleInputChange}
//                                         className="w-full px-4 py-2 border border-gray-300 rounded-md"
//                                         required
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className="block text-gray-700 mb-2">Incident District: *</label>
//                                     <select
//                                         name="incidentDistrict"
//                                         value={firDetails.incidentDistrict}
//                                         onChange={handleInputChange}
//                                         className="w-full px-4 py-2 border border-gray-300 rounded-md"
//                                         required
//                                     >
//                                         <option value="" disabled>Select District </option>
//                                         {districts.map(district => (
//                                             <option key={district} value={district}>{district}</option>
//                                         ))}
//                                     </select>
//                                 </div>
//                                 {/* <div>
//                                     <label className="block text-gray-700 mb-2">Incident Description: *</label>
//                                     <textarea
//                                         name="incidentDescription"
//                                         placeholder='Enter detailed description of incident/suspect/Perpetrator'
//                                         value={firDetails.incidentDescription}
//                                         onChange={handleInputChange}
//                                         rows="6"
//                                         className="w-full px-4 py-2 border border-gray-300 rounded-md"
//                                         required
//                                     />
//                                 </div> */}
//                                 <div>
//                                     <label className="block text-gray-700 mb-2">Incident Proof: *</label>
//                                     <input
//                                         type="file"
//                                         name="incidentProof"
//                                         onChange={handleFileChange}
//                                         className="w-full px-4 py-2 border border-gray-300 rounded-md"
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className="block text-gray-700 mb-2">Suspect Type: *</label>
//                                     <select
//                                         name="suspectType"
//                                         value={firDetails.suspectType}
//                                         onChange={handleSuspectChange}
//                                         className="w-full px-4 py-2 border border-gray-300 rounded-md"
//                                     >
//                                         {suspectOptions.map(option => (
//                                             <option key={option} value={option}>{option}</option>
//                                         ))}
//                                     </select>
//                                 </div>
//                                 {firDetails.suspectType !== 'Unknown / தெரியவில்லை' && (
//                                     <div>
//                                         <label className="block text-gray-700 mb-2">Suspect/Perpetrator Details:</label>
//                                         <input
//                                             type="text"
//                                             name="incidentSuspect"
//                                             value={firDetails.incidentSuspect}
//                                             onChange={handleInputChange}
//                                             placeholder="Suspect/Perpetrator Details"
//                                             className="w-full px-4 py-2 border border-gray-300 rounded-md"
//                                         />
//                                     </div>
//                                 )}

// <div>
//                                     <label className="block text-gray-700 mb-2">Incident Description: *</label>
//                                     <textarea
//                                         name="incidentDescription"
//                                         placeholder='Enter detailed description of incident/suspect/Perpetrator'
//                                         value={firDetails.incidentDescription}
//                                         onChange={handleInputChange}
//                                         rows="6"
//                                         className="w-full px-4 py-2 border border-gray-300 rounded-md"
//                                         required
//                                     />
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="flex justify-end">
//                         <button
//                             type="submit"
//                             className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
//                         >
//                             Submit Complaint
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default AddComplaintPage;








