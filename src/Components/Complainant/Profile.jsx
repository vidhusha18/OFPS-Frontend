

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaCalendarAlt, FaIdCard, FaEye, FaEyeSlash ,  FaLock,FaArrowLeft} from 'react-icons/fa';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [updatedProfile, setUpdatedProfile] = useState({});
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const email = sessionStorage.getItem('email');

        if (!email) {
            toast.error('No user email found. Please log in again.');
            return;
        }

        axios.get(`http://localhost:9998/complainant/email/${email}`, { responseType: 'json' })
            .then(response => {
                const data = response.data;
                setProfile(data);
                setUpdatedProfile(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching profile data:', err);
                setError('Failed to fetch profile data.');
                setLoading(false);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProfile(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        axios.put(`http://localhost:9998/complainant/email/${profile.email}`, updatedProfile)
            .then(() => {
                setProfile(updatedProfile);
                setEditMode(false);
                toast.success('Profile updated successfully.');
            })
            .catch(err => {
                console.error('Error updating profile data:', err);
                toast.error('Failed to update profile data.');
            });
    };

    const handleCancel = () => {
        setUpdatedProfile(profile);
        setEditMode(false);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    if (loading) return <div>Loading...</div>;

    return (
        <main className="w-full h-screen bg-gray-50 flex flex-col">
            <header className="bg-indigo-600 text-white p-4 shadow-md flex items-center justify-between">
                <div className="flex items-center">
                    <button
                        onClick={() => navigate('/complainantDashboard')}
                        className="text-white hover:text-gray-300 flex items-center"
                    >
                        <FaArrowLeft className="text-lg" />
                        <span className="ml-2">Back to Dashboard</span>
                    </button>
                </div>
                <div className="text-sm flex items-center">
                    <FaUser className="mr-2 text-xl" />
                    <span className="mr-4">Hi, welcome {profile.name}</span>
                    {/* <button onClick={() => setEditMode(!editMode)} className="text-gray-300 hover:text-white ml-4">
                        {editMode ? 'Cancel' : 'Edit'}
                    </button> */}
                </div>
            </header>

            <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-6 flex flex-col md:flex-row">
                <div className="md:w-1/3 flex flex-col items-center mb-6 md:mb-0">
                    <div className="w-32 h-32 mb-4 relative">
                        <img
                            src={profile.image ? `data:image/jpeg;base64,${profile.image}` : 'https://via.placeholder.com/150'}
                            alt="Profile"
                            className="w-full h-full object-cover rounded-full"
                        />
                        <div className="text-center mt-2">
                            <p className="text-lg font-semibold">{profile.name}</p>
                        </div>
                    </div>
                    {/* The profile picture change option is removed */}
                </div>

                <div className="md:w-2/3 md:ml-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-center space-x-3">
                            <FaUser className="text-gray-500" />
                            <div className="flex-1">
                                <label className="block text-gray-700">Name:</label>
                                {editMode ? (
                                    <input
                                        type="text"
                                        name="name"
                                        value={updatedProfile.name || ''}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                    />
                                ) : (
                                    <p className="text-gray-800">{profile.name}</p>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            <FaEnvelope className="text-gray-500" />
                            <div className="flex-1">
                                <label className="block text-gray-700">Email:</label>
                                <p className="text-gray-800">{profile.email}</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            <FaPhone className="text-gray-500" />
                            <div className="flex-1">
                                <label className="block text-gray-700">Phone:</label>
                                {editMode ? (
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={updatedProfile.phone || ''}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                    />
                                ) : (
                                    <p className="text-gray-800">{profile.phone}</p>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            <FaMapMarkerAlt className="text-gray-500" />
                            <div className="flex-1">
                                <label className="block text-gray-700">Address:</label>
                                {editMode ? (
                                    <input
                                        type="text"
                                        name="address"
                                        value={updatedProfile.address || ''}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                    />
                                ) : (
                                    <p className="text-gray-800">{profile.address}</p>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            <FaCalendarAlt className="text-gray-500" />
                            <div className="flex-1">
                                <label className="block text-gray-700">Date of Birth:</label>
                                {editMode ? (
                                    <input
                                        type="date"
                                        name="dob"
                                        value={updatedProfile.dob || ''}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                    />
                                ) : (
                                    <p className="text-gray-800">{profile.dob}</p>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            <FaIdCard className="text-gray-500" />
                            <div className="flex-1">
                                <label className="block text-gray-700">ID Number:</label>
                                {editMode ? (
                                    <input
                                        type="text"
                                        name="idNumber"
                                        value={updatedProfile.idNumber || ''}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                    />
                                ) : (
                                    <p className="text-gray-800">{profile.idNumber}</p>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            <FaIdCard className="text-gray-500" />
                            <div className="flex-1">
                                <label className="block text-gray-700">Identification Type:</label>
                                {editMode ? (
                                    <select
                                        name="identificationType"
                                        value={updatedProfile.identificationType || ''}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                    >
                                        <option value="" disabled>Select ID Type</option>
                                        <option value="Aadhar">Aadhar</option>
                                        <option value="Passport">Passport</option>
                                    </select>
                                ) : (
                                    <p className="text-gray-800">{profile.identificationType}</p>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            <FaIdCard className="text-gray-500" />
                            <div className="flex-1">
                                <label className="block text-gray-700">Gender:</label>
                                {editMode ? (
                                    <select
                                        name="gender"
                                        value={updatedProfile.gender || ''}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                    >
                                        <option value="" disabled>Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Transgender">Transgender</option>
                                        <option value="Other">Other</option>
                                    </select>
                                ) : (
                                    <p className="text-gray-800">{profile.gender}</p>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            <FaIdCard className="text-gray-500" />
                            <div className="flex-1">
                                <label className="block text-gray-700">Relation Type:</label>
                                {editMode ? (
                                    <select
                                        name="relationType"
                                        value={updatedProfile.relationType || ''}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                    >
                                        <option value="" disabled>Select Relation Type</option>
                                        <option value="Mother">Mother</option>
                                        <option value="Father">Father</option>
                                        <option value="Spouse">Spouse</option>
                                        <option value="Guardian">Guardian</option>
                                    </select>
                                ) : (
                                    <p className="text-gray-800">{profile.relationType}</p>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            <FaIdCard className="text-gray-500" />
                            <div className="flex-1">
                                <label className="block text-gray-700">Relative's Name:</label>
                                {editMode ? (
                                    <input
                                        type="text"
                                        name="relativeName"
                                        value={updatedProfile.relativeName || ''}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                    />
                                ) : (
                                    <p className="text-gray-800">{profile.relativeName}</p>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            <FaLock className="text-gray-500" />
                            <div className="flex-1 relative">
                                <label className="block text-gray-700">Password:</label>
                                {editMode ? (
                                    <div className="relative">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            name="password"
                                            value={updatedProfile.password || ''}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                        />
                                        <button
                                            type="button"
                                            onClick={togglePasswordVisibility}
                                            className="absolute inset-y-0 right-0 flex items-center px-2"
                                        >
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </button>
                                    </div>
                                ) : (
                                    <p className="text-gray-800">•••••••••</p>
                                )}
                            </div>
                        </div>

                        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

                        <div className="flex justify-end mt-4">
                            {editMode ? (
                                <>
                                    <button
                                        type="button"
                                        onClick={handleSave}
                                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                                    >
                                        Save
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        className="ml-4 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                                    >
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => setEditMode(true)}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                                >
                                    Edit Profile
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </main>
    );
};

export default Profile;



