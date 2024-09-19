import React, { useState, useEffect } from 'react';
import { FaSearch, FaPlus } from 'react-icons/fa';
import Swal from 'sweetalert2';
import axios from 'axios'; // Ensure axios is installed or use any method to check profile
import { useNavigate } from 'react-router-dom';

const ComplaintPage = () => {
    const [referenceNumber, setReferenceNumber] = useState('');
    const [profileComplete, setProfileComplete] = useState(true); // Assuming default to true, update based on profile status
const naviget = useNavigate();
    useEffect(() => {
        // Fetch profile status when component mounts
        axios.get('http://localhost:9998/fir/all') // Adjust endpoint as needed
            .then(response => {
                const { complete } = response.data; // Assume response contains a 'complete' field
                setProfileComplete(complete);
            })
            .catch(error => {
                console.error('Error fetching profile status:', error);
            });
    }, []);

    const handleSearch = () => {
        // Handle search logic here
    };

    const handleAddComplaint = () => {
        naviget('/addComplaint')
        if (!profileComplete) {
            Swal.fire({
                title: 'Profile Incomplete',
                text: 'Please complete your profile before adding a complaint.',
                icon: 'warning',
                confirmButtonText: 'Update Profile',
                showCancelButton: true,
                cancelButtonText: 'Cancel',
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = '/complainantprofile'; // Redirect to profile page to complete it
                }
            });
        } else {
            // Redirect to add complaint page or show the form
            window.location.href = '/complainantprofile'; // Adjust to the route or logic for adding complaints
        }
    };

    return (
        <div className="w-full h-screen flex flex-col bg-gray-50">
            {/* Navbar */}
            <nav className="bg-indigo-600 text-white py-4 px-8 flex justify-between items-center">
                <div className="text-lg font-bold">Complaints</div>
                <div className="flex space-x-6">
                    <a href="/" className="hover:underline">Home</a>
                    <a href="/faq" className="hover:underline">FAQ</a>
                    <a href="/contact" className="hover:underline">Contact Us</a>
                    <a href="/complainantprofile" className="hover:underline">Profile</a>
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-grow p-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Complaints</h1>
                    <button
                        onClick={handleAddComplaint}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg flex items-center"
                    >
                        <FaPlus className="mr-2" /> Add Complaint
                    </button>
                </div>

                {/* Complaint Tabs */}
                <div className="mb-6">
                    <div className="flex space-x-4 mb-4">
                        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg">New Complaint</button>
                        <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg">Submitted Complaints</button>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="relative mb-6">
                    <input
                        type="text"
                        value={referenceNumber}
                        onChange={(e) => setReferenceNumber(e.target.value)}
                        placeholder="Search by reference number/FIR number"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600"
                    />
                    <button
                        onClick={handleSearch}
                        className="absolute top-1/2 right-4 transform -translate-y-1/2 text-indigo-600"
                    >
                        <FaSearch />
                    </button>
                </div>

                {/* Placeholder for Complaints */}
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <p className="text-gray-600">No complaints found. Add a new complaint to get started.</p>
                </div>
            </main>
        </div>
    );
};

export default ComplaintPage;
