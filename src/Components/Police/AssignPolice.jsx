import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AssignPoliceOfficer = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { fir } = location.state || {};  // Get FIR details from state

    const [policeOfficers, setPoliceOfficers] = useState([]);

    useEffect(() => {
        const fetchPoliceOfficers = async () => {
            try {
                const response = await axios.get('http://localhost:9998/police/all');
                setPoliceOfficers(response.data);
            } catch (error) {
                console.error('Error fetching police officers:', error);
            }
        };

        fetchPoliceOfficers();
    }, []);

    const handleAssign = async (officerId) => {
        try {
            await axios.post('http://localhost:9998/fir/assign', {
                firId: fir.firId,
                officerId
            });
            navigate('/police-dashboard');  // Navigate to Police Officer Dashboard
        } catch (error) {
            console.error('Error assigning police officer:', error);
        }
    };

    return (
        <div className="p-10">
            <h1 className="text-2xl font-bold mb-4">Assign Police Officer</h1>
            <h2 className="text-xl mb-4">FIR ID: {fir.firId}</h2>
            <h3 className="text-lg mb-4">Description: {fir.description}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {policeOfficers.map(officer => (
                    <div key={officer.id} className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold mb-2">{officer.name}</h3>
                        <p className="text-gray-600">Rank: {officer.rank}</p>
                        <p className="text-gray-600">Station: {officer.stationName}</p>
                        <button
                            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
                            onClick={() => handleAssign(officer.id)}
                        >
                            Assign
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AssignPoliceOfficer;
