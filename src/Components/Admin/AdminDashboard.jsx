

// //=====================================================working code========================================================================
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaUserShield, FaBuilding, FaPlus,FaSearch, FaMapMarkerAlt,FaFileAlt, FaRegFileAlt, FaTimesCircle, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AdminDashboard = () => {
    const [selectedView, setSelectedView] = useState('');
    const [stations, setStations] = useState([]);
    const [firs, setFirs] = useState([]);
    const [complainants, setComplainants] = useState([]);
    const [assignedPolice, setAssignedPolice] = useState([]);
    const [selectedStation, setSelectedStation] = useState(null);
    const [showAssignModal, setShowAssignModal] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [feedbackType, setFeedbackType] = useState('');
    const [loadingMessage, setLoadingMessage] = useState('');
    const [selectedFIR, setSelectedFIR] = useState(null);
    const [selectedOfficerId, setSelectedOfficerId] = useState('');
    const [pendingFirCount, setPendingFirCount] = useState(0); // New state for pending FIR count
    const [showToaster, setShowToaster] = useState(false); // New state for toaster visibility
    const [totalOfficer, setTotalOfficer] = useState([]);
    const [filterPhone, setFilterPhone] = useState('');
    const [filterOfficer, setFilterOfficer] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [policeOfficers, setPoliceOfficers] = useState([]);
    const [filteredOfficers, setFilteredOfficers] = useState([]);
    const { stationId } = useParams();
    const [nameSearch, setNameSearch] = useState('');
    const navigate = useNavigate();
    const [locationSearch, setLocationSearch] = useState('');
   
    useEffect(() => {
        fetchStations();
        fetchFirs();
        fetchComplainants();
        fetchOfficers();

    }, []);


    const [stationData, setStationData] = useState([]);
    const [firData, setFirData] = useState([]);
    const [stationChartData, setStationChartData] = useState({});
    const [incidentChartData, setIncidentChartData] = useState({});

    useEffect(() => {
        fetchStationData();
        fetchFIRData();
    }, []);

    const fetchStationData = async () => {
        try {
            const response = await axios.get('http://localhost:9998/station/all');
            setStationData(response.data);

            const locationCounts = response.data.reduce((acc, station) => {
                acc[station.location] = (acc[station.location] || 0) + 1;
                return acc;
            }, {});

            setStationChartData({
                labels: Object.keys(locationCounts),
                datasets: [{
                    label: 'Number of Stations',
                    data: Object.values(locationCounts),
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                }]
            });
        } catch (error) {
            console.error("Error fetching station data", error);
        }
    };

    const fetchFIRData = async () => {
        try {
            const response = await axios.get('http://localhost:9998/fir/all');
            setFirData(response.data);

            const incidentCounts = response.data.reduce((acc, fir) => {
                acc[fir.incidentType] = (acc[fir.incidentType] || 0) + 1;
                return acc;
            }, {});

            setIncidentChartData({
                labels: Object.keys(incidentCounts),
                datasets: [{
                    label: 'Number of FIRs by Incident Type',
                    data: Object.values(incidentCounts),
                    backgroundColor: 'rgba(153, 102, 255, 0.6)',
                }]
            });
        } catch (error) {
            console.error("Error fetching FIR data", error);
        }
    };


    const fetchOfficers = async () => {
        try {
            const response = await axios.get('http://localhost:9998/police/all');
            setTotalOfficer(response.data);
        } catch (error) {
            console.error('Error fetching officers:', error);
        } finally {
            setShowLoader(false);
        }
    };

    const filteredStations = stations.filter(station =>
        station.name.toLowerCase().includes(nameSearch.toLowerCase()) &&
        station.location.toLowerCase().includes(locationSearch.toLowerCase())||station.branch.toLowerCase().includes(locationSearch.toLowerCase())
    );

    const fetchFirs = async () => {
        setShowLoader(true);
        try {
            const response = await axios.get('http://localhost:9998/fir/all');
            setFirs(response.data);

            // Check for pending FIRs
            const pendingFirs = response.data.filter(fir => fir.status === 'pending');
            if (pendingFirs.length > 0) {
                toast.warn(`There are ${pendingFirs.length} pending FIR(s).`);
            }
        } catch (error) {
            console.error('Error fetching FIRs:', error);
        } finally {
            setShowLoader(false);
        }
    };


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

    const fetchStations = async () => {
        setShowLoader(true);
        try {
            const response = await axios.get('http://localhost:9998/station/all');
            setStations(response.data);
        } catch (error) {
            console.error('Error fetching stations:', error);
        } finally {
            setShowLoader(false);
        }
    };

    const handleLogout = () => {
        // sessionStorage.clear();
        navigate('/login');
    };

    // const fetchFirs = async () => {
    //     setShowLoader(true);
    //     try {
    //         const response = await axios.get('http://localhost:9998/fir/all');
    //         setFirs(response.data);
    //     } catch (error) {
    //         console.error('Error fetching FIRs:', error);
    //     } finally {
    //         setShowLoader(false);
    //     }
    // };

    const fetchComplainants = async () => {
        setShowLoader(true);
        try {
            const response = await axios.get('http://localhost:9998/complainant/all');
            setComplainants(response.data);
        } catch (error) {
            console.error('Error fetching complainants:', error);
        } finally {
            setShowLoader(false);
        }
    };

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

    const handleAssignPoliceOfficer = (fir) => {
        setSelectedFIR(fir);
        setSelectedStation(null);
        setShowAssignModal(true);

        // Filter stations based on FIR's incident district
        const relevantStations = stations.filter(station => station.location === fir.incidentDistrict);
        setAssignedPolice([]);
        setStations(relevantStations);
    };

    const handleStationChange = async (station) => {
        try {
            const response = await axios.get(`http://localhost:9998/police/allPolice/station/${station.stationId}`);
            setAssignedPolice(response.data);
            setSelectedStation(station);
        } catch (err) {
            console.error('Error fetching police officers:', err);
        }
    };

    const handleSendFIR = async (officerId) => {
        if (selectedFIR) {
            setShowLoader(true);
            setLoadingMessage("Assigning officer...");
            try {
                await axios.post(`http://localhost:9998/fir/assignOfficer/${selectedFIR.firId}`, { officerId });
                await axios.put(`http://localhost:9998/fir/approve/${selectedFIR.firId}/assigned`);
                setFirs((prevFirs) =>
                    prevFirs.map(fir =>
                        fir.firId === selectedFIR.firId ? { ...fir, status: "assigned", assignedOfficer: { officerId } } : fir
                    )
                );
                setFeedbackMessage("Police officer has been assigned.");
                setFeedbackType('success');
                setShowAssignModal(false);
            } catch (err) {
                // console.error('Error assigning officer:', err);
                setFeedbackMessage("An error occurred while assigning the officer.");
                setFeedbackType('error');
            } finally {
                setShowLoader(false);
            }
        }
    };

    const handleCloseFIR = async (firId) => {
        // Implementation to change FIR status to closed
    };

    const handleOfficerChange = (officerId) => {
        setSelectedOfficerId(officerId);
    };

    const handleSelectChange = (e) => {
        const selectedStationId = e.target.value;
        const selectedStation = stations.find(station => station.stationId === parseInt(selectedStationId));
        handleStationChange(selectedStation);
    };

    const sortedFirs = firs
        .sort((a, b) => new Date(b.incidentDate) - new Date(a.incidentDate))
        .map(fir => ({
            ...fir,
            isPending: fir.status === 'pending'
        }))
        .sort((a, b) => b.isPending - a.isPending);

    const totalFirs = firs.length;
    const closedFirs = firs.filter(fir => fir.status === 'FIR Closed').length;
    const inProgressFirs = firs.filter(fir => fir.status === 'assigned').length;
    const totalPoliceOfficers = assignedPolice.length;

    return (
        <div className="flex min-h-screen">
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            <nav className=" w-80 bg-gray-800 text-white p-6">
                {/* <div className="flex items-start justify-center mb-10 "> */}
                {/* <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4zM12 2c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"></path>
                    </svg> */}
                <span className="ml-2 text-xl font-bold">Admin Dashboard</span><br /><br />
                {/* </div> */}
                <ul>
                    <li>

                        <button className="flex items-center text-blue-500 hover:text-blue-700">
                            <FaUserCircle className="w-6 h-6 mr-2" />
                            <span>Hi, Admin</span>
                        </button>


                    </li> <br></br>

                    <li>
                        <button
                            onClick={() => handleViewChange('View Police Officers')}
                            className="flex items-center p-3 mb-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md"
                        >
                            <FaUserShield className="mr-3" />View Police Officers
                        </button>

                        {/* <Link
                            to="/viewpolice"
                            className="flex items-center p-3 mb-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md"
                        >
                            <FaUserShield className="mr-3" /> View Police Officers
                        </Link>  */}
                    </li>
                    <li>
                        {/* <Link
                            to="/viewstation"
                            className="flex items-center p-3 mb-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md"
                        >
                            <FaBuilding className="mr-3" /> Manage Stations
                        </Link> */}

                        <button
                            onClick={() => handleViewChange('Manage Stations')}
                            className="flex items-center p-3 mb-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md"
                        >
                            <FaBuilding className="mr-3" /> Manage Stations

                        </button>
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
            <div className="flex-1 p-6">
                {/* Statistics Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <div className="bg-white p-4 rounded-lg shadow-md text-center">
                        <h3 className="text-xl font-bold mb-2">Total FIRs</h3>
                        <p className="text-3xl font-semibold">{totalFirs}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md text-center">
                        <h3 className="text-xl font-bold mb-2">Closed FIRs</h3>
                        <p className="text-3xl font-semibold">{closedFirs}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md text-center">
                        <h3 className="text-xl font-bold mb-2">In Progress FIRs</h3>
                        <p className="text-3xl font-semibold">{inProgressFirs}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md text-center">
                        <h3 className="text-xl font-bold mb-2">Police Officers</h3>
                        <p className="text-3xl font-semibold">{totalOfficer.length}</p>
                    </div>


                    
                </div>





                {showLoader && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-75">
                        <div className="bg-white p-6 rounded-md shadow-lg">
                            <p>{loadingMessage}</p>
                        </div>
                    </div>
                )}
                {feedbackMessage && (
                    <div className={`fixed top-0 right-0 m-4 p-4 rounded-md text-white ${feedbackType === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
                        {feedbackMessage}
                    </div>
                )}

                {selectedView === 'Complainants Registered' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {complainants.length ? (
                            complainants.map((complainant) => (
                                <div key={complainant.id} className="bg-white p-4 rounded-lg shadow-md flex items-center">
                                    <div className="w-20 h-20 mr-4 flex-shrink-0">
                                        <img
                                            src={complainant.image ? `data:image/jpeg;base64,${complainant.image}` : 'https://via.placeholder.com/100?text=Image'}
                                            alt={complainant.name}
                                            className="w-full h-full object-cover rounded-md"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold mb-1">{complainant.name}</h3>
                                        <p className="text-gray-600"><strong>Phone Number: </strong>{complainant.phone}</p>
                                        <p className="text-gray-600"><strong>Email:</strong> {complainant.email}</p>
                                        <p className="text-gray-600"><strong>Gender:</strong> {complainant.gender}</p>
                                        <p className="text-gray-600"><strong>D.O.B</strong>{complainant.dob}</p>
                                        <p className="text-gray-600"><strong>IdentificationType: </strong>{complainant.identificationType}</p>
                                        <p className="text-gray-600"><strong>ID Number:</strong> {complainant.idNumber}</p>
                                        <p className="text-gray-600"><strong>ID Address:</strong> {complainant.address}</p>

                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-600">No records found.</p>
                        )}
                    </div>
                )}

                {/* {selectedView === 'View Received FIRs' && (
                    <div>
                        <h2 className="text-2xl font-bold">FIRs Recieved </h2>
                        <ul>
                            {sortedFirs
                                .filter(fir => fir.isPending)
                                .map((fir) => (
                                    <li key={fir.firId} className="bg-white p-8 mb-4 rounded-md shadow-md w-1/2">

                                        <p><strong>Complainant Name :</strong>{fir.complainant.name}</p>
                                        <p></p>
                                        <p ><strong>Incident Type :</strong> {fir.incidentType}</p>
                                        <p><strong>Incident Description :</strong>{fir.incidentDescription}</p>
                                        <p><strong>Status :</strong> {fir.status}</p>
                                        <p><strong>Date:</strong> {new Date(fir.incidentDate).toLocaleDateString()}</p>
                                        <button
                                            onClick={() => handleAssignPoliceOfficer(fir)}
                                            className="mt-2 bg-blue-500 text-white p-2 rounded-md"
                                        >
                                            Assign Police Officer
                                        </button>
                                    </li>
                                )):} 
                        </ul>
                    </div>
                )}*/}



{selectedView === 'View Received FIRs' && (
    <div>
        <h2 className="text-2xl font-bold">FIRs Received</h2>
        {sortedFirs.filter(fir => fir.isPending).length ? (
            <ul>
                {sortedFirs
                    .filter(fir => fir.isPending)
                    .map((fir) => (
                        <li key={fir.firId} className="bg-white p-8 mb-4 rounded-md shadow-md w-1/2">
                            <p><strong>Complainant Name :</strong>{fir.complainant.name}</p>
                            <p><strong>Incident Type :</strong> {fir.incidentType}</p>
                            <p><strong>Incident Description :</strong>{fir.incidentDescription}</p>
                            <p><strong>Status :</strong> {fir.status}</p>
                            <p><strong>Date:</strong> {new Date(fir.incidentDate).toLocaleDateString()}</p>
                            <button
                                onClick={() => handleAssignPoliceOfficer(fir)}
                                className="mt-2 bg-blue-500 text-white p-2 rounded-md"
                            >
                                Assign Police Officer
                            </button>
                        </li>
                    ))
                }
            </ul>
        ) : (
            <p className="text-gray-600">No received FIRs.</p>
        )}
    </div>
)}


{selectedView === 'Manage Stations' && (

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


)}


                {selectedView === 'View Police Officers' && (
                    <div className="flex-1 bg-gray-100">
                        <div className="p-4 relative">
                            <Link to={`/addpolice`} className="absolute top-4 right-4">
                                <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                                    <FaPlus className="mr-2" /> Add Police Officer
                                </button>
                            </Link>

                          
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

                )}


                {/* FIR Report Section */}
                {selectedView === 'FIR Report' && (
                    <>
                        <h2 className="text-2xl font-bold mb-4">FIR Report</h2>
                        <div className="mb-8">
                            {/* <input 
                                type="text" 
                                placeholder="Filter by Phone Number" 
                                value={filterPhone}
                                onChange={(e) => setFilterPhone(e.target.value)}
                                className="border border-gray-300 p-2 mb-2 rounded"
                            /> */}
                            <input
                                type="text"
                                placeholder="Filter by station Details/ Officers"
                                value={filterOfficer}
                                onChange={(e) => setFilterOfficer(e.target.value)}
                                className="border border-gray-300 p-2 mb-2 rounded"
                            />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {sortedFirs.filter(fir =>
                                // (filterPhone ? fir.firId.includes(filterPhone) : true) &&
                                (filterOfficer ? fir.assignedOfficer && fir.assignedOfficer.station.name && fir.assignedOfficer.station.location && fir.assignedOfficer.station.name.includes(filterOfficer) : true)
                            ).map(fir => (
                                <div key={fir.firId} className="p-4 border rounded-lg shadow-md">
                                    <h3 className="text-lg font-semibold">FIR ID: {fir.firId}</h3>
                                    <p>Complainant Name :{fir.complainant.name}</p>
                                    <p>Status: {fir.status}</p>
                                    <p>Date: {fir.incidentDate}</p>
                                    <p>Handled By : {fir.assignedOfficer.name}</p>
                                    <p>Station Name & Branch : {fir.assignedOfficer.station.name}  {fir.assignedOfficer.station.branch}</p>
                                    <p>District : {fir.assignedOfficer.station.location}</p>
                                    <p>Status : {fir.status}</p>
                                    {/* <button onClick={() => handleAssignPoliceOfficer(fir)} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
                                        Assign Officer
                                    </button> */}
                                </div>
                            ))}
                        </div>
                    </>
                )}


                {selectedView === 'FIR Closed' && (
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Closed FIRs</h2>
                        <ul>
                            {firs
                                .filter(fir => fir.status === 'FIR Closed')
                                .map((fir) => (
                                    <li key={fir.firId} className="bg-white p-4 mb-2 rounded-md shadow-md">
                                        <h3 className="text-lg font-semibold">FIR ID: {fir.firId}</h3>
                                        <p>Complainant Name :{fir.complainant.name}</p>
                                        <p>Status: {fir.status}</p>
                                        <p>Date: {fir.incidentDate}</p>
                                        <p>Handled By : {fir.assignedOfficer.name}</p>
                                        <p>Station Name & Branch : {fir.assignedOfficer.station.name}  {fir.assignedOfficer.station.branch}</p>
                                        <p>District : {fir.assignedOfficer.station.location}</p>
                                        <p>Status : {fir.status}</p>
                                    </li>
                                ))}
                        </ul>
                    </div>
                )}

                {showAssignModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-75">
                        <div className="bg-white p-6 rounded-md shadow-lg w-80">
                            <h3 className="text-lg font-semibold mb-4">Assign Police Officer</h3>
                            <select
                                onChange={handleSelectChange}
                                value={selectedStation?.stationId}
                                className="mb-4 w-full p-2 border border-gray-300 rounded-md"
                            >
                                <option value="">Select Station</option>
                                {stations.map(station => (
                                    <option key={station.stationId} value={station.stationId}>
                                        {station.name} - {station.location}-{station.branch}
                                    </option>
                                ))}
                            </select>

                            <select
                                onChange={(e) => handleOfficerChange(e.target.value)}
                                value={selectedOfficerId}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                disabled={!selectedStation}
                            >
                                <option value="">Select Police Officer</option>
                                {assignedPolice.map(officer => (
                                    <option key={officer.officerId} value={officer.officerId}>
                                        {officer.name}
                                    </option>
                                ))}
                            </select>

                            <button
                                onClick={() => setShowAssignModal(false)}
                                className="mt-4 bg-gray-500 text-white p-2 rounded-md"
                            >
                                Close
                            </button>
                            <button
                                onClick={() => handleSendFIR(selectedOfficerId)}
                                className="mt-4 bg-blue-500 text-white p-2 rounded-md"
                            >
                                Assign
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;



// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { FaUserShield, FaBuilding, FaFileAlt, FaRegFileAlt, FaTimesCircle, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const AdminDashboard = () => {
//     const [selectedView, setSelectedView] = useState('');
//     const [stations, setStations] = useState([]);
//     const [firs, setFirs] = useState([]);
//     const [complainants, setComplainants] = useState([]);
//     const [assignedPolice, setAssignedPolice] = useState([]);
//     const [selectedFIR, setSelectedFIR] = useState(null);
//     const [showAssignModal, setShowAssignModal] = useState(false);
//     const [showLoader, setShowLoader] = useState(false);
//     const [feedbackMessage, setFeedbackMessage] = useState('');
//     const [feedbackType, setFeedbackType] = useState('');
//     const [loadingMessage, setLoadingMessage] = useState('');
//     const [selectedOfficerId, setSelectedOfficerId] = useState('');
//     const [searchTerm, setSearchTerm] = useState('');
//     const [filterPhone, setFilterPhone] = useState('');
//     const [filterOfficer, setFilterOfficer] = useState('');
//     const [totalOfficer, setTotalOfficer] = useState([]);

//     const navigate = useNavigate();

//     useEffect(() => {
//         fetchStations();
//         fetchFirs();
//         fetchComplainants();
//         fetchOfficers();
//     }, []);

//     const fetchOfficers = async () => {
//         try {
//             const response = await axios.get('http://localhost:9998/police/all');
//             setTotalOfficer(response.data);
//         } catch (error) {
//             console.error('Error fetching officers:', error);
//         } finally {
//             setShowLoader(false);
//         }
//     };

//     const fetchFirs = async () => {
//         setShowLoader(true);
//         try {
//             const response = await axios.get('http://localhost:9998/fir/all');
//             setFirs(response.data);
//             const pendingFirs = response.data.filter(fir => fir.status === 'pending');
//             if (pendingFirs.length > 0) {
//                 toast.warn(`There are ${pendingFirs.length} pending FIR(s).`);
//             }
//         } catch (error) {
//             console.error('Error fetching FIRs:', error);
//         } finally {
//             setShowLoader(false);
//         }
//     };

//     const fetchStations = async () => {
//         setShowLoader(true);
//         try {
//             const response = await axios.get('http://localhost:9998/station/all');
//             setStations(response.data);
//         } catch (error) {
//             console.error('Error fetching stations:', error);
//         } finally {
//             setShowLoader(false);
//         }
//     };

//     const fetchComplainants = async () => {
//         setShowLoader(true);
//         try {
//             const response = await axios.get('http://localhost:9998/complainant/all');
//             setComplainants(response.data);
//         } catch (error) {
//             console.error('Error fetching complainants:', error);
//         } finally {
//             setShowLoader(false);
//         }
//     };

//     const handleLogout = () => {
//         navigate('/login');
//     };

//     const handleViewChange = (view) => {
//         setSelectedView(view);
//     };

//     const handleAssignPoliceOfficer = (fir) => {
//         setSelectedFIR(fir);
//         setSelectedOfficerId('');
//         setShowAssignModal(true);
//     };

//     const handleSendFIR = async () => {
//         if (selectedFIR && selectedOfficerId) {
//             setShowLoader(true);
//             setLoadingMessage("Assigning officer...");
//             try {
//                 await axios.post(`http://localhost:9998/fir/assignOfficer/${selectedFIR.firId}`, { officerId: selectedOfficerId });
//                 await axios.put(`http://localhost:9998/fir/approve/${selectedFIR.firId}/assigned`);
//                 setFirs(prevFirs =>
//                     prevFirs.map(fir =>
//                         fir.firId === selectedFIR.firId ? { ...fir, status: "assigned", assignedOfficer: { officerId: selectedOfficerId } } : fir
//                     )
//                 );
//                 setFeedbackMessage("Police officer has been assigned.");
//                 setFeedbackType('success');
//             } catch (err) {
//                 console.error('Error assigning officer:', err);
//                 setFeedbackMessage("An error occurred while assigning the officer.");
//                 setFeedbackType('error');
//             } finally {
//                 setShowLoader(false);
//                 setShowAssignModal(false);
//                 setSelectedFIR(null);
//             }
//         } else {
//             setFeedbackMessage("Please select an officer to assign.");
//             setFeedbackType('error');
//         }
//     };

//     const filteredComplainants = complainants.filter(complainant =>
//         complainant.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     const sortedFirs = firs
//         .sort((a, b) => new Date(b.incidentDate) - new Date(a.incidentDate))
//         .map(fir => ({
//             ...fir,
//             isPending: fir.status === 'pending'
//         }))
//         .sort((a, b) => b.isPending - a.isPending);

//     const totalFirs = firs.length;
//     const closedFirs = firs.filter(fir => fir.status === 'FIR Closed').length;
//     const inProgressFirs = firs.filter(fir => fir.status === 'assigned').length;

//     return (
//         <div className="flex min-h-screen">
//             <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
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
//                         <Link to="/viewpolice" className="flex items-center p-3 mb-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md">
//                             <FaUserShield className="mr-3" /> View Police Officers
//                         </Link>
//                     </li>
//                     <li>
//                         <Link to="/viewstation" className="flex items-center p-3 mb-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md">
//                             <FaBuilding className="mr-3" /> Manage Stations
//                         </Link>
//                     </li>
//                     <li>
//                         <button onClick={() => handleViewChange('Complainants Registered')} className="flex items-center p-3 mb-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md">
//                             <FaFileAlt className="mr-3" /> Complainants Registered
//                         </button>
//                     </li>
//                     <li>
//                         <button onClick={() => handleViewChange('View Received FIRs')} className="flex items-center p-3 mb-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md">
//                             <FaRegFileAlt className="mr-3" /> View Received FIRs
//                         </button>
//                     </li>
//                     <li>
//                         <button onClick={() => handleViewChange('FIR Report')} className="flex items-center p-3 mb-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md">
//                             <FaFileAlt className="mr-3" /> FIR Report
//                         </button>
//                     </li>
//                     <li>
//                         <button onClick={() => handleViewChange('FIR Closed')} className="flex items-center p-3 mb-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md">
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
//                                 <span>Back</span>
//                             </button>
//                         </Link>
//                     </li>
//                 </ul>
//             </nav>
//             <div className="flex-1 p-6">
//                 {/* Statistics Section */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
//                     <div className="bg-white p-4 rounded-lg shadow-md text-center">
//                         <h3 className="text-xl font-bold mb-2">Total FIRs</h3>
//                         <p className="text-2xl">{totalFirs}</p>
//                     </div>
//                     <div className="bg-white p-4 rounded-lg shadow-md text-center">
//                         <h3 className="text-xl font-bold mb-2">Closed FIRs</h3>
//                         <p className="text-2xl">{closedFirs}</p>
//                     </div>
//                     <div className="bg-white p-4 rounded-lg shadow-md text-center">
//                         <h3 className="text-xl font-bold mb-2">In Progress FIRs</h3>
//                         <p className="text-2xl">{inProgressFirs}</p>
//                     </div>
//                 </div>

//                 {/* Complainants Section */}
//                 {selectedView === 'Complainants Registered' && (
//                     <>
//                         <h2 className="text-2xl font-bold mb-4">Registered Complainants</h2>
//                         <input
//                             type="text"
//                             placeholder="Search complainants..."
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                             className="border border-gray-300 p-2 mb-4 rounded"
//                         />
//                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                             {filteredComplainants.map(complainant => (
//                                 <div
//                                     key={complainant.id}
//                                     className={`p-4 rounded-lg shadow-md ${complainant.gender === 'Male' ? 'bg-blue-200' : 'bg-pink-200'}`}
//                                 >
//                                     <h3 className="text-lg font-semibold">{complainant.name}</h3>
//                                     <p>Phone: {complainant.phone}</p>
//                                     <p>Gender: {complainant.gender}</p>
//                                 </div>
//                             ))}
//                         </div>
//                     </>
//                 )}

//                 {/* FIR Report Section */}
//                 {selectedView === 'FIR Report' && (
//                     <>
//                         <h2 className="text-2xl font-bold mb-4">FIR Report</h2>
//                         <div className="mb-4">
//                             <input
//                                 type="text"
//                                 placeholder="Filter by Phone Number"
//                                 value={filterPhone}
//                                 onChange={(e) => setFilterPhone(e.target.value)}
//                                 className="border border-gray-300 p-2 mb-2 rounded"
//                             />
//                             <input
//                                 type="text"
//                                 placeholder="Filter by Assigned Officer"
//                                 value={filterOfficer}
//                                 onChange={(e) => setFilterOfficer(e.target.value)}
//                                 className="border border-gray-300 p-2 mb-2 rounded"
//                             />
//                         </div>
//                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                             {sortedFirs.filter(fir =>
//                                 (filterPhone ? fir.complainantPhone.includes(filterPhone) : true) &&
//                                 (filterOfficer ? fir.assignedOfficer && fir.assignedOfficer.officerId.includes(filterOfficer) : true)
//                             ).map(fir => (
//                                 <div key={fir.firId} className="p-4 border rounded-lg shadow-md">
//                                     <h3 className="text-lg font-semibold">FIR ID: {fir.firId}</h3>
//                                     <p>Complainant: {fir.complainantName}</p>
//                                     <p>Status: {fir.status}</p>
//                                     <p>Date: {fir.incidentDate}</p>
//                                     <button onClick={() => handleAssignPoliceOfficer(fir)} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
//                                         Assign Officer
//                                     </button>
//                                 </div>
//                             ))}
//                         </div>
//                     </>
//                 )}

//                 {/* Assign Officer Modal */}
//                 {showAssignModal && (
//                     <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
//                         <div className="bg-white p-6 rounded-lg shadow-lg">
//                             <h2 className="text-xl font-bold mb-4">Assign Officer to FIR ID: {selectedFIR.firId}</h2>
//                             <select
//                                 value={selectedOfficerId}
//                                 onChange={(e) => setSelectedOfficerId(e.target.value)}
//                                 className="border border-gray-300 p-2 mb-4 rounded"
//                             >
//                                 <option value="">Select Officer</option>
//                                 {totalOfficer.map(officer => (
//                                     <option key={officer.officerId} value={officer.officerId}>{officer.name}</option>
//                                 ))}
//                             </select>
//                             <div className="flex justify-end">
//                                 <button onClick={() => setShowAssignModal(false)} className="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2">Cancel</button>
//                                 <button onClick={handleSendFIR} className="bg-blue-500 text-white px-4 py-2 rounded">Assign</button>
//                             </div>
//                         </div>
//                     </div>
//                 )}

//                 {/* Feedback Message */}
//                 {feedbackMessage && (
//                     <div className={`mt-4 p-3 rounded ${feedbackType === 'success' ? 'bg-green-200' : 'bg-red-200'}`}>
//                         {feedbackMessage}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default AdminDashboard;
