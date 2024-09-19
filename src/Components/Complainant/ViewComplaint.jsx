import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUser,FaArrowLeft } from 'react-icons/fa';

const ViewComplaints = () => {
    const [complaints, setComplaints] = useState([]);
    const [complainant, setComplainant] = useState(null);
    const [userEmail, setUserEmail] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchComplainant = async () => {
            const email = sessionStorage.getItem('email');
            if (email) {
                setUserEmail(email); // Set userEmail state
                try {
                    const response = await fetch(`http://localhost:9998/complainant/email/${email}`);
                    const data = await response.json();
                    setComplainant(data);
                } catch (error) {
                    console.error("Failed to fetch complainant:", error);
                }
            } else {
                console.error("No email found in session storage.");
            }
        };

        fetchComplainant();
    }, []);

    useEffect(() => {
        const fetchComplaints = async () => {
            if (complainant && complainant.complainantId) {
                try {
                    const response = await fetch(`http://localhost:9998/fir/firOf/complainant/${complainant.complainantId}`);
                    const data = await response.json();
                    setComplaints(data);
                } catch (error) {
                    console.error("Failed to fetch complaints:", error);
                }
            }
        };

        fetchComplaints();
    }, [complainant]);

    const handleBackToDashboard = () => {
        navigate('/complainantDashboard');
    };

    const handleProfileClick = () => {
        // Handle profile click logic, e.g., navigate to profile page or show profile options
        console.log('Profile clicked');
    };

    return (
        <div className="w-full h-screen p-8 bg-gray-100">
            <nav className="bg-indigo-600 text-white py-4 px-6 flex justify-between items-center">
            <button
                        onClick={() => navigate('/complainantDashboard')}
                        className="text-white hover:text-gray-300 flex items-center"
                    >
                        <FaArrowLeft className="text-lg" />
                        <span className="ml-2">Back to Dashboard</span>
                    </button>
                <div className="text-lg font-bold">Your Submited Complaint </div>
                {/* <div className="flex space-x-6">
                    <Link to="/" className="text-white hover:underline">Home</Link>
                    <Link to="/faq" className="text-white hover:underline">FAQ</Link>
                    <Link to="/contact" className="text-white hover:underline">Contact Us</Link>
                    <div className="flex items-center space-x-2 text-white cursor-pointer" onClick={handleProfileClick}>
                        <FaUser />
                        <h5>{userEmail}</h5>
                    </div>
                   
                </div> */}
            </nav>
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Submitted Complaints</h1>
            {complaints.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {complaints.map((complaint) => (
                        <div key={complaint.firId} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <h2 className="text-xl font-semibold mb-2 text-blue-600">{complaint.incidentType}</h2>
                           <p className="text-gray-700 mb-2"><strong> Incident Detail: </strong>{complaint.incidentDescription}</p>
                            <p className="text-gray-700 mb-2"><span className="font-semibold">Incident Occured:</span> {complaint.incidentPlace}</p>
                            <p className="text-gray-700 mb-2"><span className="font-semibold">Incident Date:</span> {complaint.incidentDate}</p>
                            {/* <p className="text-gray-600 mb-2"><span className="font-semibold">FIR Status:</span> {complaint.status}</p> */}
                            <p className="text-gray-700"><span className="font-semibold">Suspect Type:</span> {complaint.suspectType}</p>
                            <p className="text-gray-700"><span className="font-semibold">Suspect:</span> {complaint.incidentSuspect}</p>
                            <p className="text-gray-700 mb-2"><span className="font-bold">FIR Status:</span> {complaint?.status||'N/A' }</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-700">No complaints found.</p>
            )}
        </div>
    );
};

export default ViewComplaints;
