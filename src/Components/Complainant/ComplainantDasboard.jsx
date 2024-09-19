

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';

const ComplainantDashboard = () => {
    const navigate = useNavigate();
    
    // Retrieve the user's email from session storage
    const   email = sessionStorage.getItem('email');

    // Handle logout
    const handleLogout = () => {
    sessionStorage.removeItem("email");
        navigate('/login');  // Assuming your login page is at "/login"
    };

    // Navigate to profile page
    const handleProfileClick = () => {
        if (  email) {
            navigate(`/profile/${encodeURIComponent(  email)}`);
        }
    };

    return (
        <div className="w-full h-screen flex flex-col bg-gray-50">
            {/* Navbar */}
            <nav className="bg-indigo-600 text-white py-4 px-8 flex justify-between items-center">
                
                <div className="text-lg font-bold">Complainant Dashboard</div>
                <div className="flex space-x-6">
                    
                    <div className="flex items-center space-x-2 text-white cursor-pointer" onClick={handleProfileClick}>
                        <FaUser />
                        <h5>{  email}</h5>
                    </div>
                    <button onClick={handleLogout} className="px-4 py-2 bg-red-600 text-white rounded-lg">
                        Logout
                    </button>
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-grow p-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
                        <img 
                            src="https://cdn.iconscout.com/icon/premium/png-256-thumb/man-reporting-police-3529615-2952530.png" 
                            alt="Complaint" 
                            className="w-24 h-24 object-cover mb-4"
                        />
                        <h2 className="text-xl font-semibold mb-2">Complaint</h2>
                        <p className="text-gray-600 mb-4"> Register your complaints</p>
                        <Link to="/addComplaint">
                            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg">Register</button>
                        </Link>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
                        <img 
                            src="data:image/png;base64,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" 
                            alt="F.I.R Download" 
                            className="w-24 h-24 object-cover mb-4"
                        />
                        <h2 className="text-xl font-semibold mb-2">F.I.R Download</h2>
                        <p className="text-gray-600 mb-4">Download your F.I.R.</p>
                        <Link to="/report-details/:complainantId">
                        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg">open</button>
                        </Link>
                    </div>
                    {/* <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
                        <img 
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/FAQ_icon_%28Noun_like%29.svg/1200px-FAQ_icon_%28Noun_like%29.svg.png" 
                            alt="FAQ" 
                            className="w-24 h-24 object-cover mb-4"
                        />
                        <h2 className="text-xl font-semibold mb-2">FAQ</h2>
                        <p className="text-gray-600 mb-4">Explore frequently asked questions.</p>
                        <Link to="/faq">
                            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg">Explore</button>
                        </Link>
                    </div> */}

                    <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
                        <img 
         
                           src="https://cdn2.iconfinder.com/data/icons/miscellaneous-205-solid/128/assessment_document_evaluation_research_magnifying-glass_notice_checklist_feedback_survey_reviews-1024.png"
                            className="w-26 h-24 object-cover mb-4"
                        />
                        <h2 className="text-xl font-semibold mb-2">Check F.I.R Status</h2>
                        <p className="text-gray-600 mb-4"> Track status and details of your F.I.R</p>
                        <Link to="/viewComplaints">
                            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg">View</button>
                        </Link>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default ComplainantDashboard;
