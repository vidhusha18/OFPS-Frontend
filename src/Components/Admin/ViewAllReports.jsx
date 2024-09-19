// src/components/AllReports.jsx


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AllReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:9998/report/all')
      .then(response => {
        setReports(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching reports", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Investigation Reports</h1>
      {reports.length === 0 ? (
        <p>No reports available.</p>
      ) : (
        <div>
          {reports.map(report => (
            <div key={report.reportId} className="border p-4 mb-4 rounded shadow">
              <h2 className="text-xl font-bold">Report ID: {report.reportId}</h2>
              <p ><strong>Complainant Name: {report.fir.complainant.name}</strong></p>
              <p><strong>FIR ID:</strong> {report.fir.firId}</p>
              <p><strong>Handled by officer :{report.fir.assignedOfficer.name} </strong></p>
              <p><strong>Station name :{report.fir.assignedOfficer.station.name} </strong></p>
              <p><strong>Report Details:</strong> {report.reportDetails}</p>
              <p><strong>Report Date:</strong> {report.date}</p>
              {/* <Link
                to={`/${report.fir.complainant.complainantId}`}
                className="text-blue-500 hover:underline"
              >
                View Details
              </Link> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllReports;

