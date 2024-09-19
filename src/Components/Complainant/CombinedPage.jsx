import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CombinedPage = () => {
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        image: '',
        aadharNumber: '',
        gender: '',
        dob: '',
        identificationType: '',
        idNumber: '',
        relationType: '',
        relativeName: '',
    });
    const [dob, setDob] = useState('');
    const [imageError, setImageError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const storedEmail = sessionStorage.getItem('email');
        if (storedEmail) {
            axios.get(`http://localhost:9998/complainant/email/${storedEmail}`)
                .then(response => {
                    const data = response.data;
                    setProfile(data);
                    setDob(data.dob || '');
                })
                .catch(error => {
                    console.error('Error fetching profile data:', error);
                });
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Check if image is uploaded and gender is selected
        if (!profile.image) {
            setImageError('Please upload an image.');
            return;
        }
        
        if (!profile.gender) {
            alert('Please select a gender.');
            return;
        }

        axios.post('http://localhost:9998/complainant/register', profile)
            .then(response => {
                console.log('Profile updated successfully:', response.data);
                navigate('/complaintPage'); // Navigate to complaint page on successful profile update
            })
            .catch(error => {
                console.error('Error updating profile:', error);
            });
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Profile</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="mb-4">
                    <label className="block text-gray-700">Name</label>
                    <input
                        type="text"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        value={profile.email}
                        readOnly
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Phone</label>
                    <input
                        type="text"
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Address</label>
                    <input
                        type="text"
                        value={profile.address}
                        onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Upload Image</label>
                    <input
                        type="file"
                        onChange={(e) => setProfile({ ...profile, image: e.target.files[0] })}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                    {imageError && <p className="text-red-500">{imageError}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Aadhar Number</label>
                    <input
                        type="text"
                        value={profile.aadharNumber}
                        onChange={(e) => setProfile({ ...profile, aadharNumber: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Gender</label>
                    <select
                        value={profile.gender}
                        onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Date of Birth</label>
                    <input
                        type="date"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Identification Type</label>
                    <input
                        type="text"
                        value={profile.identificationType}
                        onChange={(e) => setProfile({ ...profile, identificationType: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">ID Number</label>
                    <input
                        type="text"
                        value={profile.idNumber}
                        onChange={(e) => setProfile({ ...profile, idNumber: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Relation Type</label>
                    <input
                        type="text"
                        value={profile.relationType}
                        onChange={(e) => setProfile({ ...profile, relationType: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Relative Name</label>
                    <input
                        type="text"
                        value={profile.relativeName}
                        onChange={(e) => setProfile({ ...profile, relativeName: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full px-4 py-2 text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700"
                >
                    Update Profile
                </button>
            </form>
        </div>
    );
};

export default CombinedPage;
