
// import React, { useState, useEffect } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { FaUserCircle, FaSignOutAlt, FaEye, FaCheck } from 'react-icons/fa';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const PoliceDashboard = () => {
//     const [firReceived, setFirReceived] = useState([]);
//     const [profile, setProfile] = useState(null);
//     const [selectedFir, setSelectedFir] = useState(null);
//     const [status, setStatus] = useState('');
//     const [closureReason, setClosureReason] = useState('');
//     const [closureDate, setClosureDate] = useState('');
//     const [showDetails, setShowDetails] = useState(null);
//     const [complainantImage, setComplainantImage] = useState('');
//     const [incidentProof, setIncidentProof] = useState('');
//     const [searchTerm, setSearchTerm] = useState('');
//     const [view, setView] = useState('received');
//     const [modalOpen, setModalOpen] = useState(false);
//     const navigate = useNavigate();
//     const userEmail = sessionStorage.getItem('email');

//     useEffect(() => {
//         const fetchFIRsAndProfile = async () => {
//             try {
//                 if (userEmail) {
//                     const profileResponse = await axios.get(`http://localhost:9998/police/policeEmail/${userEmail}`);
//                     setProfile(profileResponse.data);
//                     const officerId = profileResponse.data?.officerId;

//                     if (officerId) {
//                         const firResponse = await axios.get(`http://localhost:9998/fir/all`);
//                         setFirReceived(firResponse.data);
//                         const assignedCount = firResponse.data.filter(fir => fir.status === 'assigned').length;
//                         if (assignedCount > 0) {
//                             toast.info(`You have ${assignedCount} assigned FIRs.`);
//                         }
//                     } else {
//                         toast.error('Officer ID is missing in profile data.');
//                     }
//                 }
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//                 toast.error('Error fetching data.');
//             }
//         };

//         fetchFIRsAndProfile();
//     }, [userEmail, navigate]);

//     const fetchComplainantImage = async (complainantId) => {
//         try {
//             const response = await axios.get(`http://localhost:9998/complainant/${complainantId}`, { responseType: 'arraybuffer' });
//             const base64 = Buffer.from(response.data, 'binary').toString('base64');
//             setComplainantImage(`data:image/jpeg;base64,${base64}`);
//         } catch (error) {
//             console.error('Error fetching complainant image:', error);
//         }
//     };

//     const fetchIncidentProof = async (proofId) => {
//         try {
//             const response = await axios.get(`http://localhost:9998/incidentProof/${proofId}`, { responseType: 'arraybuffer' });
//             const base64 = Buffer.from(response.data, 'binary').toString('base64');
//             setIncidentProof(`data:image/jpeg;base64,${base64}`);
//         } catch (error) {
//             console.error('Error fetching incident proof:', error);
//         }
//     };

//     const handleLogout = () => {
//         sessionStorage.clear();
//         navigate('/login');
//     };

//     const handleProfileClick = () => {
//         if (userEmail) {
//             navigate(`/policeprofile/${encodeURIComponent(userEmail)}`);
//         }
//     };

//     const handleStatusChange = async (firId, newStatus) => {
//         try {
//             if (newStatus === 'FIR Closed') {
//                 await axios.post('http://localhost:9998/report', {
//                     fir: {
//                         firId
//                     },
//                     reportDetails: closureReason,
//                 });
//             }

//             await axios.put(`http://localhost:9998/fir/approve/${firId}/${newStatus}`, { status: newStatus, closureReason });
//             toast.success('FIR status updated successfully.');
//             setFirReceived(firReceived.map(fir =>
//                 fir.firId === firId ? { ...fir, status: newStatus } : fir
//             ));
//             setSelectedFir(null); // Close the dropdown after updating status

//             if (newStatus === 'assigned') {
//                 const assignedCount = firReceived.filter(fir => fir.status === 'assigned').length + 1;
//                 toast.info(`You have ${assignedCount} assigned FIRs.`);
//             }
//         } catch (error) {
//             console.error('Error updating FIR status:', error);
//             toast.error('Error updating FIR status.');
//         }
//     };

//     const handleProcessClick = (firId) => {
//         setSelectedFir(selectedFir === firId ? null : firId);
//         setStatus('');
//         setClosureReason('');
//         setClosureDate('');
//         if (selectedFir === firId) {
//             setComplainantImage('');
//             setIncidentProof('');
//         } else {
//             const fir = firReceived.find(f => f.firId === firId);
//             if (fir && fir.complainant) {
//                 fetchComplainantImage(fir.complainant.complainantId);
//             }
//             if (fir && fir.incidentProofId) {
//                 fetchIncidentProof(fir.incidentProofId);
//             }
//         }
//     };

//     const handleSearchChange = (e) => {
//         setSearchTerm(e.target.value);
//     };

//     const filteredFIRs = firReceived.filter(fir => {
//         if (view === 'received') return fir.status === 'assigned';
//         if (view === 'inProgress') return fir.status !== 'assigned' && fir.status !== 'FIR Closed' && fir.status !== 'pending';
//         if (view === 'closed') return fir.status === 'FIR Closed';
//         return true;
//     }).filter(fir => 
//         fir.complainant.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     const getButtonStyles = (currentStatus) => {
//         if (currentStatus === 'assigned') {
//             return 'bg-yellow-500 text-white';
//         }
//         if (currentStatus === 'FIR Closed') {
//             return 'bg-gray-500 text-white';
//         }
//         return 'bg-blue-500 text-white';
//     };

//     const getProcessButtonText = (currentStatus) => {
//         if (currentStatus === 'assigned') {
//             return 'Start Progress';
//         }
//         if (currentStatus === 'FIR Closed') {
//             return 'FIR Closed';
//         }
//         return 'FIR in Progress';
//     };

//     const handleModalOpen = (fir) => {
//         setSelectedFir(fir);
//         fetchComplainantImage(fir.complainant.complainantId);
//         fetchIncidentProof(fir.incidentProofId);
//         setModalOpen(true);
//     };

//     const handleModalClose = () => {
//         setModalOpen(false);
//         setSelectedFir(null);
//         setComplainantImage('');
//         setIncidentProof('');
//     };

//     const firReceivedCount = firReceived.length;
//     const firInProgressCount = firReceived.filter(fir => fir.status !== 'assigned' && fir.status !== 'FIR Closed').length;
//     const firClosedCount = firReceived.filter(fir => fir.status === 'FIR Closed').length;

//     if (!profile) {
//         return (
//             <div className="flex items-center justify-center min-h-screen">
//                 <p className="text-gray-600">Loading...</p>
//             </div>
//         );
//     }

//     return (
//         <div className="flex min-h-screen">
//             <nav className="w-64 bg-gray-800 text-white p-6">
//                 <div className="flex items-center mb-8">
//                     <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4zM12 2c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"></path>
//                     </svg>
//                     <span className="ml-2 text-xl font-bold">Police Dashboard</span>
//                 </div>
//                 <ul>
//                     <li>
//                         <Link 
//                             to="#" 
//                             onClick={() => setView('received')} 
//                             className={`flex items-center p-3 mb-2 ${view === 'received' ? 'bg-gray-700' : 'text-gray-300 hover:text-white hover:bg-gray-700'} rounded-md`}
//                         >
//                             View Complaints Received
//                         </Link>
//                     </li>
//                     <li>
//                         <Link 
//                             to="#" 
//                             onClick={() => setView('inProgress')} 
//                             className={`flex items-center p-3 mb-2 ${view === 'inProgress' ? 'bg-gray-700' : 'text-gray-300 hover:text-white hover:bg-gray-700'} rounded-md`}
//                         >
//                             View FIRs in Progress
//                         </Link>
//                     </li>
//                     <li>
//                         <Link 
//                             to="#" 
//                             onClick={() => setView('closed')} 
//                             className={`flex items-center p-3 mb-2 ${view === 'closed' ? 'bg-gray-700' : 'text-gray-300 hover:text-white hover:bg-gray-700'} rounded-md`}
//                         >
//                             View Closed FIRs
//                         </Link>
//                     </li>
//                     <li>
//                         <button 
//                             onClick={handleLogout} 
//                             className="flex items-center p-3 text-gray-300 hover:text-white hover:bg-red-600 rounded-md w-full"
//                         >
//                             <FaSignOutAlt className="mr-2" />
//                             Logout
//                         </button>
//                     </li>
//                 </ul>
//             </nav>

//             <div className="flex-1 p-8">
//                 <h2 className="text-2xl font-bold mb-6">
//                     {view === 'received' ? 'FIRs Received' :
//                      view === 'inProgress' ? 'FIRs in Progress' :
//                      'FIRs Closed'}
//                 </h2>

//                 <input
//                     type="text"
//                     placeholder="Search by complainant name..."
//                     value={searchTerm}
//                     onChange={handleSearchChange}
//                     className="border p-2 rounded mb-4"
//                 />

//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {filteredFIRs.length > 0 ? (
//                         filteredFIRs.map(fir => (
//                             <div key={fir.firId} className="bg-white p-6 rounded-lg shadow-lg relative">
//                                 <h3 className="text-xl font-semibold mb-2">FIR ID: {fir.firId}</h3>
//                                 <button 
//                                     onClick={() => handleModalOpen(fir)} 
//                                     className="absolute top-2 right-2 text-blue-500 hover:text-blue-700"
//                                 >
//                                     <FaEye />
//                                 </button>

//                                 <button 
//                                     onClick={() => handleProcessClick(fir.firId)} 
//                                     className={`mt-4 p-2 rounded ${getButtonStyles(fir.status)}`}
//                                 >
//                                     {getProcessButtonText(fir.status)}
//                                 </button>

//                                 {selectedFir === fir.firId && (
//                                     <div className="mt-2">
//                                         <input
//                                             type="text"
//                                             placeholder="Closure Reason"
//                                             value={closureReason}
//                                             onChange={(e) => setClosureReason(e.target.value)}
//                                             className="border p-2 rounded mb-2"
//                                         />
//                                         <button 
//                                             onClick={() => handleStatusChange(fir.firId, 'FIR Closed')}
//                                             className="bg-red-500 text-white rounded p-2"
//                                         >
//                                             Close FIR
//                                         </button>
//                                     </div>
//                                 )}
//                             </div>
//                         ))
//                     ) : (
//                         <p className="text-gray-600">No FIRs to display.</p>
//                     )}
//                 </div>

//                 {/* Modal for FIR details */}
//                 {modalOpen && selectedFir && (
//                     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//                         <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
//                         <p className="text-gray-600 mb-2"><strong>Date:</strong> {selectedFir.incidentDate}</p>
// {/* //                                 <p className="text-gray-600 mb-2"><strong>Incident Description: </strong>{selectedFir.incidentDescription}</p>
// //                                 <p className="text-gray-600 mb-2"><strong>Incident Location: </strong>{fir.incidentPlace}</p>
// //                                 <p className="text-gray-600 mb-2"><strong>Incident District: </strong>{fir.incidentDistrict}</p> */}
// //                                 
//                             <h4 className="text-lg font-semibold">Complainant Details</h4>
//                             {selectedFir.complainant && (
//                                 <>
//                                     <p className="text-gray-600 mb-2"><strong>Name:</strong> {selectedFir.complainant.name || 'N/A'}</p>
//                                     <p className="text-gray-600"><strong>Phone:</strong> {selectedFir.complainant.phone || 'N/A'}</p>
//                                     <p className="text-gray-600"><strong>Address:</strong> {selectedFir.complainant.address || 'N/A'}</p>
//                                     <div className="mt-4">
//                                         <img
//                                             src={complainantImage || `data:image/jpeg;base64,${selectedFir.complainant?.image || ''}`}
//                                             alt="Complainant"
//                                             className="w-20 h-20 object-cover border rounded"
//                                         />
//                                     </div>
//                                 </>
//                             )}
//                             <div className="mt-4">
//                                 <h5 className="text-lg font-semibold">Incident Proof</h5>
//                                 <img
//                                     src={incidentProof || `data:image/jpeg;base64,${selectedFir.incidentProof || ''}`}
//                                     alt="Incident Proof"
//                                     className="mt-2 w-70 h-30 object-cover border rounded"
//                                 />
//                             </div>
//                             <button onClick={handleModalClose} className="mt-4 text-red-500 hover:text-red-700">Close</button>
//                         </div>
//                     </div>
//                 )}

//                 <ToastContainer />
//             </div>
//         </div>
//     );
// };

// export default PoliceDashboard;


import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUserCircle, FaSignOutAlt, FaEye, FaCheck } from 'react-icons/fa';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PoliceDashboard = () => {
    const [firReceived, setFirReceived] = useState([]);
    const [profile, setProfile] = useState(null);
    const [selectedFir, setSelectedFir] = useState(null);
    const [status, setStatus] = useState('');
    const [closureReason, setClosureReason] = useState('');
    const [closureDate, setClosureDate] = useState('');
    const [showDetails, setShowDetails] = useState(null);
    const [complainantImage, setComplainantImage] = useState('');
    const [incidentProof, setIncidentProof] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [view, setView] = useState('received');
    const navigate = useNavigate();

    const userEmail = sessionStorage.getItem('email');

useEffect(() => {
    const fetchFIRsAndProfile = async () => {
        try {
            if (userEmail) {
                const profileResponse = await axios.get(`http://localhost:9998/police/policeEmail/${userEmail}`);
                setProfile(profileResponse.data);
                const officerId = profileResponse.data?.officerId;

                if (officerId) {
                    const firResponse = await axios.get(`http://localhost:9998/fir/all`);
                    setFirReceived(firResponse.data);
                    // Count assigned FIRs and show toast
                    const assignedCount = firResponse.data.filter(fir => fir.status === 'assigned').length;
                    if (assignedCount > 0) {
                        toast.info(`You have ${assignedCount} assigned FIRs.`);
                    }
                } else {
                    toast.error('Officer ID is missing in profile data.');
                }
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            toast.error('Error fetching data.');
        }
    };

    fetchFIRsAndProfile();
}, [userEmail, navigate]);




    
    const fetchComplainantImage = async (complainantId) => {
        try {
            const response = await axios.get(`http://localhost:9998/complainant/${complainantId}`, { responseType: 'arraybuffer' });
            const base64 = Buffer.from(response.data, 'binary').toString('base64');
            setComplainantImage(`data:image/jpeg;base64,${base64}`);
        } catch (error) {
            console.error('Error fetching complainant image:', error);
        }
    };

    const fetchIncidentProof = async (proofId) => {
        try {
            const response = await axios.get(`http://localhost:9998/incidentProof/${proofId}`, { responseType: 'arraybuffer' });
            const base64 = Buffer.from(response.data, 'binary').toString('base64');
            setIncidentProof(`data:image/jpeg;base64,${base64}`);
        } catch (error) {
            console.error('Error fetching incident proof:', error);
        }
    };

    const handleLogout = () => {
        sessionStorage.clear();
        navigate('/login');
    };

    const handleProfileClick = () => {
        if (userEmail) {
            navigate(`/policeprofile/${encodeURIComponent(userEmail)}`);
        }
    };

const handleStatusChange = async (firId, newStatus) => {
    try {
        if (newStatus === 'FIR Closed') {
            await axios.post('http://localhost:9998/report', {
                fir: {
                    firId
                },
                reportDetails: closureReason,
            });
        }

        await axios.put(`http://localhost:9998/fir/approve/${firId}/${newStatus}`, { status: newStatus, closureReason });
        toast.success('FIR status updated successfully.');
        setFirReceived(firReceived.map(fir =>
            fir.firId === firId ? { ...fir, status: newStatus } : fir
        ));
        setSelectedFir(null); // Close the dropdown after updating status

        // If the new status is 'assigned', show a toast notification
        if (newStatus === 'assigned') {
            const assignedCount = firReceived.filter(fir => fir.status === 'assigned').length + 1; // +1 for the newly assigned FIR
            toast.info(`You have ${assignedCount} assigned FIRs.`);
        }
    } catch (error) {
        console.error('Error updating FIR status:', error);
        toast.error('Error updating FIR status.');
    }
};


    const handleProcessClick = (firId) => {
        setSelectedFir(selectedFir === firId ? null : firId);
        setStatus(''); // Reset status when opening dropdown
        setClosureReason(''); // Reset closureReason when opening dropdown
        setClosureDate(''); // Reset closureDate when opening dropdown
        if (selectedFir === firId) {
            setComplainantImage(''); // Clear image when closing
            setIncidentProof(''); // Clear incident proof when closing
        } else {
            const fir = firReceived.find(f => f.firId === firId);
            if (fir && fir.complainant) {
                fetchComplainantImage(fir.complainant.complainantId); // Fetch image for selected FIR
            }
            if (fir && fir.incidentProofId) {
                fetchIncidentProof(fir.incidentProofId); // Fetch incident proof for selected FIR
            }
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredFIRs = firReceived.filter(fir => {
        if (view === 'received') return fir.status === 'assigned';
        if (view === 'inProgress') return fir.status !== 'assigned' && fir.status !== 'FIR Closed' && fir.status!== 'pending';
        if (view === 'closed') return fir.status === 'FIR Closed';
        return true;
    }).filter(fir => 
        fir.complainant.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getButtonStyles = (currentStatus) => {
        if (currentStatus === 'assigned') {
            return 'bg-yellow-500 text-white';
        }
        if (currentStatus === 'FIR Closed') {
            return 'bg-gray-500 text-white'; // For closed status, the button should be gray or hidden
        }
        return 'bg-blue-500 text-white'; // Default for in progress
    };

    const getProcessButtonText = (currentStatus) => {
        if (currentStatus === 'assigned') {
            return 'Start Progress';
        }
        if (currentStatus === 'FIR Closed') {
            return 'FIR Closed';
        }
        return 'FIR in Progress';
    };

      
    const firReceivedCount = firReceived.length;
    const firInProgressCount = firReceived.filter(fir => fir.status !== 'assigned' && fir.status !== 'FIR Closed').length;
    const firClosedCount = firReceived.filter(fir => fir.status === 'FIR Closed').length;

    if (!profile) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-gray-600">Loading...</p>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen">
            <nav className="w-64 bg-gray-800 text-white p-6">
                <div className="flex items-center mb-8">
                    <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4zM12 2c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"></path>
                    </svg>
                    <span className="ml-2 text-xl font-bold">Police Dashboard</span>
                </div>
                <ul>
                    <li>
                        <Link 
                            to="#" 
                            onClick={() => setView('received')} 
                            className={`flex items-center p-3 mb-2 ${view === 'received' ? 'bg-gray-700' : 'text-gray-300 hover:text-white hover:bg-gray-700'} rounded-md`}
                        >
                            View Complaints Received
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="#" 
                            onClick={() => setView('inProgress')} 
                            className={`flex items-center p-3 mb-2 ${view === 'inProgress' ? 'bg-gray-700' : 'text-gray-300 hover:text-white hover:bg-gray-700'} rounded-md`}
                        >
                            View FIRs in Progress
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="#" 
                            onClick={() => setView('closed')} 
                            className={`flex items-center p-3 mb-2 ${view === 'closed' ? 'bg-gray-700' : 'text-gray-300 hover:text-white hover:bg-gray-700'} rounded-md`}
                        >
                            View FIRs Closed
                        </Link>
                    </li>

                    <li>
                        <button onClick={handleLogout} className="px-4 py-2 bg-red-600 text-white rounded-lg flex items-center">
                            <FaSignOutAlt className="w-5 h-5 mr-2" />
                            Logout
                        </button>
                    </li>

                </ul>
                {/* <button onClick={handleLogout} className="mt-6 text-red-600 hover:text-red-800">
                    <FaSignOutAlt className="w-6 h-6" />
                </button> */}
            </nav>

            <div className="flex-1 p-8">
                <div className="mb-8 flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Dashboard</h2>
                    <button onClick={handleProfileClick} className="flex items-center text-blue-500 hover:text-blue-700">
                        <FaUserCircle className="w-6 h-6 mr-2" />
                        <span>Hi, Officer {profile.name || 'Profile'}</span>
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold mb-2">Total FIRs Received</h3>
                        <p className="text-gray-600">{firReceivedCount}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold mb-2">FIRs In Progress</h3>
                        <p className="text-gray-600">{firInProgressCount}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold mb-2">FIRs Closed</h3>
                        <p className="text-gray-600">{firClosedCount}</p>
                    </div>
                </div>

                <h2 className="text-2xl font-bold mb-6">
                    {view === 'received' ? 'FIRs Received' :
                     view === 'inProgress' ? 'FIRs in Progress' :
                     'FIRs Closed'}
                </h2>

                <div className="mb-6">
                    {view === 'received' && (
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            placeholder="Search by complainant name , fir ID "
                            className="p-2 border border-gray-300 rounded w-full"
                        />
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredFIRs.length > 0 ? (
                        filteredFIRs.map(fir => (
                            <div key={fir.firId} className="bg-white p-6 rounded-lg shadow-lg relative">
                                <h3 className="text-xl font-semibold mb-2">FIR ID: {fir.firId}</h3>
                                <p className="text-gray-600 mb-2"><strong>Date:</strong> {fir.incidentDate}</p>
                                <p className="text-gray-600 mb-2"><strong>Incident Description: </strong>{fir.incidentDescription}</p>
                                <p className="text-gray-600 mb-2"><strong>Incident Location: </strong>{fir.incidentPlace}</p>
                                <p className="text-gray-600 mb-2"><strong>Incident District: </strong>{fir.incidentDistrict}</p>
                                <p className={`text-gray-600 mb-2 ${fir.status === 'FIR Closed' ? 'text-red-600 font-bold' : ''}`}><strong>Status: {fir.status}</strong></p>
                                
                                {/* <div className="mt-4">
                                    <p className="text-lg font-semibold">Complainant Image</p>
                                    <img  
                                        src={complainantImage || `data:image/jpeg;base64,${fir.complainant?.image || ''}` }
                                        alt="Complainant" 
                                        className="w-32 h-32 object-cover border rounded" 
                                    />
                                </div> */}

                                <button 
                                    onClick={() => setShowDetails(showDetails === fir.firId ? null : fir.firId)} 
                                    className="absolute top-2 right-2 text-blue-500 hover:text-blue-700"
                                >
                                    <FaEye />
                                </button>

                                {showDetails === fir.firId && (
                                    <div className="mt-4 p-4 border-t border-gray-200">
                                        <h4 className="text-lg font-semibold">Complainant Details</h4>
                                        {fir.complainant && (
                                            <>
                                                <p className="text-gray-600 mb-2"><strong>Name:</strong> {fir.complainant.name || 'N/A'}</p>
                                                <p className="text-gray-600"><strong>Phone:</strong> {fir.complainant.phone || 'N/A'}</p>
                                                <p className="text-gray-600"><strong>Address:</strong> {fir.complainant.address|| 'N/A'} </p>
                                                <div className="mt-4">
                                    {/* <p className="text-lg font-semibold">Complainant Image</p> */}
                                    <img  
                                        src={complainantImage || `data:image/jpeg;base64,${fir.complainant?.image || ''}` }
                                        alt="Complainant" 
                                        className="w-20 h-20 object-cover border rounded" 
                                    />
                                </div>
                                            </>
                                        )}
                                        <div className="mt-4">
                                            <h5 className="text-lg font-semibold">Incident Proof</h5>
                                            <img 
                                                src={incidentProof || `data:image/jpeg;base64,${fir.incidentProof || ''}`} 
                                                alt="Incident Proof" 
                                                className="mt-2 w-70 h-30 object-cover border rounded" 
                                            />
                                        </div>
                                    </div>
                                )}

                                {fir.status !== 'FIR Closed' && (
                                    <div className="mt-4">
                                        <button
                                            onClick={() => handleProcessClick(fir.firId)}
                                            className={`px-4 py-2 ${getButtonStyles(fir.status)} rounded-lg`}
                                        >
                                            {getProcessButtonText(fir.status)}
                                        </button>
                                    </div>
                                )}

                                {selectedFir === fir.firId && (
                                    <div className="mt-4 p-4 border-t border-gray-200">
                                        <select
                                            value={status}
                                            onChange={(e) => setStatus(e.target.value)}
                                            className="p-2 border border-gray-300 rounded"
                                        >
                                            <option value="">Select Status</option>
                                            <option value="Investigation Initiated">Investigation Initiated</option>
                                            <option value="In-Ground Investigation Initiated">In-Ground Investigation Initiated</option>
                                            <option value="Suspect Identified">Suspect Identified</option>
                                            <option value="Report to Police Station">Report to Police Station</option>
                                            <option value="FIR Closed">FIR Closed</option>
                                        </select>
                                        {status === 'FIR Closed' && (
                                            <>
                                                <textarea
                                                    value={closureReason}
                                                    onChange={(e) => setClosureReason(e.target.value)}
                                                    placeholder="Reason for closure (if applicable)"
                                                    className="mt-2 p-2 border border-gray-300 rounded w-full"
                                                />
                                                <label className="block text-sm font-medium text-gray-700 mt-4">Date of Closure</label>
                                                <input
                                                    type="date"
                                                    value={closureDate}
                                                    onChange={(e) => setClosureDate(e.target.value)}
                                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                                                />
                                            </>
                                        )}
                                        <button
                                            onClick={() => handleStatusChange(fir.firId, status)}
                                            className={`mt-4 px-4 py-2 ${status === 'FIR Closed' ? 'bg-gray-500' : getButtonStyles(status)} rounded-lg`}
                                        >
                                            <FaCheck className="inline mr-2" /> Update Status
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-600">No FIRs to display.</p>
                    )}
                </div>
                <ToastContainer />
            </div>
        </div>
    );
};

export default PoliceDashboard;

// import React, { useState, useEffect } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { FaUserCircle, FaSignOutAlt, FaEye, FaCheck } from 'react-icons/fa';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const PoliceDashboard = () => {
//     const [firReceived, setFirReceived] = useState([]);
//     const [profile, setProfile] = useState(null);
//     const [selectedFir, setSelectedFir] = useState(null);
//     const [status, setStatus] = useState('');
//     const [closureReason, setClosureReason] = useState('');
//     const [closureDate, setClosureDate] = useState('');
//     const [showDetails, setShowDetails] = useState(null);
//     const [complainantImage, setComplainantImage] = useState('');
//     const [incidentProof, setIncidentProof] = useState('');
//     const [searchTerm, setSearchTerm] = useState('');
//     const [view, setView] = useState('received');
//     const navigate = useNavigate();

//     const userEmail = sessionStorage.getItem('email');

//     useEffect(() => {
//         const fetchFIRsAndProfile = async () => {
//             try {
//                 if (userEmail) {
//                     const profileResponse = await axios.get(`http://localhost:9998/police/policeEmail/${userEmail}`);
//                     setProfile(profileResponse.data);
//                     const officerId = profileResponse.data?.officerId;

//                     if (officerId) {
//                         const firResponse = await axios.get(`http://localhost:9998/fir/all`);
//                         setFirReceived(firResponse.data);
//                         // Count assigned FIRs and show toast
//                         const assignedCount = firResponse.data.filter(fir => fir.status === 'assigned').length;
//                         if (assignedCount > 0) {
//                             toast.info(`You have ${assignedCount} assigned FIRs.`);
//                         }
//                     } else {
//                         toast.error('Officer ID is missing in profile data.');
//                     }
//                 }
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//                 toast.error('Error fetching data.');
//             }
//         };

//         fetchFIRsAndProfile();
//     }, [userEmail, navigate]);

//     const fetchComplainantImage = async (complainantId) => {
//         try {
//             const response = await axios.get(`http://localhost:9998/complainant/${complainantId}`, { responseType: 'arraybuffer' });
//             const base64 = Buffer.from(response.data, 'binary').toString('base64');
//             setComplainantImage(`data:image/jpeg;base64,${base64}`);
//         } catch (error) {
//             console.error('Error fetching complainant image:', error);
//         }
//     };

//     const fetchIncidentProof = async (proofId) => {
//         try {
//             const response = await axios.get(`http://localhost:9998/incidentProof/${proofId}`, { responseType: 'arraybuffer' });
//             const base64 = Buffer.from(response.data, 'binary').toString('base64');
//             setIncidentProof(`data:image/jpeg;base64,${base64}`);
//         } catch (error) {
//             console.error('Error fetching incident proof:', error);
//         }
//     };

//     const handleLogout = () => {
//         sessionStorage.clear();
//         navigate('/login');
//     };

//     const handleProfileClick = () => {
//         if (userEmail) {
//             navigate(`/policeprofile/${encodeURIComponent(userEmail)}`);
//         }
//     };

//     const handleStatusChange = async (firId, newStatus) => {
//         try {
//             if (newStatus === 'FIR Closed') {
//                 await axios.post('http://localhost:9998/report', {
//                     fir: {
//                         firId
//                     },
//                     reportDetails: closureReason,
//                 });
//             }

//             await axios.put(`http://localhost:9998/fir/approve/${firId}/${newStatus}`, { status: newStatus, closureReason });
//             toast.success('FIR status updated successfully.');
//             setFirReceived(firReceived.map(fir =>
//                 fir.firId === firId ? { ...fir, status: newStatus } : fir
//             ));
//             setSelectedFir(null); // Close the dropdown after updating status

//             // If the new status is 'assigned', show a toast notification
//             if (newStatus === 'assigned') {
//                 const assignedCount = firReceived.filter(fir => fir.status === 'assigned').length + 1; // +1 for the newly assigned FIR
//                 toast.info(`You have ${assignedCount} assigned FIRs.`);
//             }
//         } catch (error) {
//             console.error('Error updating FIR status:', error);
//             toast.error('Error updating FIR status.');
//         }
//     };

//     const handleProcessClick = (firId) => {
//         setSelectedFir(selectedFir === firId ? null : firId);
//         setStatus(''); // Reset status when opening dropdown
//         setClosureReason(''); // Reset closureReason when opening dropdown
//         setClosureDate(''); // Reset closureDate when opening dropdown
//         if (selectedFir === firId) {
//             setComplainantImage(''); // Clear image when closing
//             setIncidentProof(''); // Clear incident proof when closing
//         } else {
//             const fir = firReceived.find(f => f.firId === firId);
//             if (fir && fir.complainant) {
//                 fetchComplainantImage(fir.complainant.complainantId); // Fetch image for selected FIR
//             }
//             if (fir && fir.incidentProofId) {
//                 fetchIncidentProof(fir.incidentProofId); // Fetch incident proof for selected FIR
//             }
//         }
//     };

//     const handleSearchChange = (e) => {
//         setSearchTerm(e.target.value);
//     };

//     const filteredFIRs = firReceived.filter(fir => {
//         if (view === 'received') return fir.status === 'assigned';
//         if (view === 'inProgress') return fir.status !== 'assigned' && fir.status !== 'FIR Closed' && fir.status!== 'pending';
//         if (view === 'closed') return fir.status === 'FIR Closed';
//         return true;
//     }).filter(fir => 
//         fir.incidentDescription.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     const getButtonStyles = (currentStatus) => {
//         if (currentStatus === 'assigned') {
//             return 'bg-yellow-500 text-white';
//         }
//         if (currentStatus === 'FIR Closed') {
//             return 'bg-gray-500 text-white'; // For closed status, the button should be gray or hidden
//         }
//         return 'bg-blue-500 text-white'; // Default for in progress
//     };

//     const getProcessButtonText = (currentStatus) => {
//         if (currentStatus === 'assigned') {
//             return 'Start Progress';
//         }
//         if (currentStatus === 'FIR Closed') {
//             return 'FIR Closed';
//         }
//         return 'FIR in Progress';
//     };

//     const firReceivedCount = firReceived.length;
//     const firInProgressCount = firReceived.filter(fir => fir.status !== 'assigned' && fir.status !== 'FIR Closed').length;
//     const firClosedCount = firReceived.filter(fir => fir.status === 'FIR Closed').length;

//     if (!profile) {
//         return (
//             <div className="flex items-center justify-center min-h-screen">
//                 <p className="text-gray-600">Loading...</p>
//             </div>
//         );
//     }

//     return (
//         <div className="flex min-h-screen">
//             <nav className="w-64 bg-gray-800 text-white p-6">
//                 <div className="flex items-center mb-8">
//                     <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4zM12 2c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"></path>
//                     </svg>
//                     <span className="ml-2 text-xl font-bold">Police Dashboard</span>
//                 </div>
//                 <ul>
//                     <li>
//                         <Link 
//                             to="#" 
//                             onClick={() => setView('received')} 
//                             className={`flex items-center p-3 mb-2 ${view === 'received' ? 'bg-gray-700' : 'text-gray-300 hover:text-white hover:bg-gray-700'} rounded-md`}
//                         >
//                             View FIRs Received
//                         </Link>
//                     </li>
//                     <li>
//                         <Link 
//                             to="#" 
//                             onClick={() => setView('inProgress')} 
//                             className={`flex items-center p-3 mb-2 ${view === 'inProgress' ? 'bg-gray-700' : 'text-gray-300 hover:text-white hover:bg-gray-700'} rounded-md`}
//                         >
//                             View FIRs in Progress
//                         </Link>
//                     </li>
//                     <li>
//                         <Link 
//                             to="#" 
//                             onClick={() => setView('closed')} 
//                             className={`flex items-center p-3 mb-2 ${view === 'closed' ? 'bg-gray-700' : 'text-gray-300 hover:text-white hover:bg-gray-700'} rounded-md`}
//                         >
//                             View Closed FIRs
//                         </Link>
//                     </li>
//                     <li className="flex items-center mt-10">
//                         <FaUserCircle className="mr-2" />
//                         <span>{profile.name}</span>
//                     </li>
//                     <li className="flex items-center mt-2">
//                         <button onClick={handleLogout} className="flex items-center text-red-500 hover:text-red-400">
//                             <FaSignOutAlt className="mr-2" /> Logout
//                         </button>
//                     </li>
//                 </ul>
//             </nav>

//             <div className="flex-1 p-8">
//                 <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
//                 <div className="mb-4">
//                     <input
//                         type="text"
//                         placeholder="Search FIRs..."
//                         value={searchTerm}
//                         onChange={handleSearchChange}
//                         className="border rounded-md p-2"
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <h2 className="text-xl">FIR Counts:</h2>
//                     <p>Received: {firReceivedCount}</p>
//                     <p>In Progress: {firInProgressCount}</p>
//                     <p>Closed: {firClosedCount}</p>
//                 </div>
//                 <div className="space-y-4">
//                     {filteredFIRs.map(fir => (
//                         <div key={fir.firId} className="border p-4 rounded-md">
//                             <h3 className="font-semibold">{fir.incidentDescription}</h3>
//                             <p>Status: {fir.status}</p>
//                             <button 
//                                 onClick={() => handleProcessClick(fir.firId)} 
//                                 className={`mt-2 p-2 rounded ${getButtonStyles(fir.status)}`}
//                             >
//                                 {getProcessButtonText(fir.status)}
//                             </button>
//                             {selectedFir === fir.firId && (
//                                 <div className="mt-2">
//                                     <label htmlFor="status" className="block">Update Status:</label>
//                                     <select
//                                         id="status"
//                                         value={status}
//                                         onChange={(e) => setStatus(e.target.value)}
//                                         className="border rounded-md p-1"
//                                     >
//                                         <option value="">Select Status</option>
//                                         <option value="assigned">Assigned</option>
//                                         <option value="inProgress">In Progress</option>
//                                         <option value="FIR Closed">FIR Closed</option>
//                                     </select>
//                                     <textarea
//                                         value={closureReason}
//                                         onChange={(e) => setClosureReason(e.target.value)}
//                                         placeholder="Closure Reason (if applicable)"
//                                         className="border rounded-md p-1 mt-2"
//                                     />
//                                     <button
//                                         onClick={() => handleStatusChange(fir.firId, status)}
//                                         className="mt-2 bg-blue-500 text-white p-2 rounded"
//                                     >
//                                         Update
//                                     </button>
//                                     {complainantImage && (
//                                         <img src={complainantImage} alt="Complainant" className="mt-2 rounded" />
//                                     )}
//                                     {incidentProof && (
//                                         <img src={incidentProof} alt="Incident Proof" className="mt-2 rounded" />
//                                     )}
//                                 </div>
//                             )}
//                         </div>
//                     ))}
//                 </div>
//                 <ToastContainer />
//             </div>
//         </div>
//     );
// };

// export default PoliceDashboard;


