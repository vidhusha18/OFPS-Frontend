import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import axios from 'axios';
import { FaArrowLeft, FaUserCircle } from 'react-icons/fa';

// Register pdfmake fonts
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const ReportDetails = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Retrieve complainantId from session storage
    const complainantId = sessionStorage.getItem('ComplainantId');

    useEffect(() => {
        if (!complainantId) {
            console.error("No complainant ID found in session storage.");
            navigate('/complainantDashboard'); // Redirect if no complainantId is found
            return;
        }

        const fetchReports = async () => {
            try {
                console.log(complainantId);
                const response = await axios.get(`http://localhost:9998/report/complainant/${complainantId}`);
                setReports(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch reports:", error);
                setLoading(false);
            }
        };

        fetchReports();
    }, [complainantId, navigate]);

    // const generatePDF = (report) => {
    //     const docDefinition = {
    //         content: [
    //             { text: `FIR (First Information Report)`, style: 'header' },
    //             // { text: `Report ID: ${report.reportId}`, style: 'subheader' },
    //             { text: `Registered FIR ID: ${report.fir.firId}`, style: 'subheader' },

    //             { text: `Complainant Name: ${report.fir.complainant.name}`, style: 'text' },
    //             { text: `Complainant Contact: ${report.fir.complainant.phone}`, style: 'text' },
    //             { text: `Complainant Address: ${report.fir.complainant.address}`, style: 'text' },
    //             { text: `Complainant identification Type: ${report.fir.complainant.identificationType}`, style: 'text' },
    //             { text: `Complainant ID Number: ${report.fir.complainant.idNumber}`, style: 'text' },
    //             { text: `Complainant Relative Type: ${report.fir.complainant.relationType}`, style: 'text' }
    //             ,
    //             { text: `Complainant Relative Name: ${report.fir.complainant.relativeName}`, style: 'text' },
    //             { text: `Incident Description: ${report.fir.incidentDescription}`, style: 'text' },
    //             // { text: `Report Details: ${report.reportDetails}`, style: 'text' },
    //             { text: `Report Date: ${report.date}`, style: 'text' },
    //             { text: `Police Officer: ${report.officer.name}`, style: 'text' },
    //             { text: `Police Station : ${report.officer.station.name}`, style: 'text' },
    //             // { text: `Police Officer: ${report.officer.name}`, style: 'text' },
    //             { text: `Police  Station Branch : ${report.officer.station.branch}`, style: 'text' },
    //             { text: `The FIR has been Closed with the First Information Report Closure  by Police Officer Mr/Ms.  ${report.officer.name} , ${report.officer.designation} from ${report.officer.station.name} with the FIR closure , ${report.reportDetails}`, style: 'subheader' },
    //         ],
    //         styles: {
    //             header: {
    //                 fontSize: 18,
    //                 bold: true,
    //             },
    //             subheader: {
    //                 fontSize: 14,
    //                 margin: [0, 10, 0, 5],
    //             },
    //             text: {
    //                 fontSize: 12,
    //                 margin: [0, 5, 0, 5],
    //             },
    //         },
    //     };
    //     pdfMake.createPdf(docDefinition).download(`Report_${report.reportId}.pdf`);
    // };

    const generatePDF = (report) => {
        const docDefinition = {
            content: [
                { text: `FIR (First Information Report)`, style: 'header', alignment: 'center' },
                { text: `Registered FIR ID: ${report.fir.firId}`, style: 'subheader', alignment: 'center' },
    
                {
                    columns: [
                        [
                            { text: `Complainant Name: ${report.fir.complainant.name}`, style: 'text' },
                            { text: `Complainant Contact: ${report.fir.complainant.phone}`, style: 'text' },
                            { text: `Complainant Address: ${report.fir.complainant.address}`, style: 'text' },
                            { text: `Complainant ID Type: ${report.fir.complainant.identificationType}`, style: 'text' },
                            { text: `Complainant ID Number: ${report.fir.complainant.idNumber}`, style: 'text' },
                            { text: `Relative Type: ${report.fir.complainant.relationType}`, style: 'text' },
                            { text: `Relative Name: ${report.fir.complainant.relativeName}`, style: 'text' },
                        ],
                        [
                            { text: `Incident Description:`, style: 'subheader' },
                            { text: report.fir.incidentDescription, style: 'text', margin: [0, 0, 0, 10] },
                            { text: `Report Date: ${report.date}`, style: 'text' },
                            { text: `Police Officer: ${report.officer.name}`, style: 'text' },
                            { text: `Police Station: ${report.officer.station.name}`, style: 'text' },
                            { text: `Station Branch: ${report.officer.station.branch}`, style: 'text' },
                        ]
                    ],
                    columnGap: 20
                },
                {
                    text: `The FIR has been closed with the First Information Report Closure by Police Officer Mr/Ms. ${report.officer.name}, ${report.officer.designation} from ${report.officer.station.name} with the FIR closure: ${report.reportDetails}`,
                    style: 'subheader',
                    margin: [0, 20, 0, 0]
                },
            ],
            styles: {
                header: {
                    fontSize: 18,
                    bold: true,
                },
                subheader: {
                    fontSize: 14,
                    margin: [0, 10, 0, 5],
                    alignment: 'left',
                },
                text: {
                    fontSize: 12,
                    margin: [0, 5, 0, 5],
                    alignment: 'left',
                },
            },
        };
    
        pdfMake.createPdf(docDefinition).download(`Report_${report.reportId}.pdf`);
    };
    

    if (loading) return <p>Loading...</p>;

    return (
        <div className="w-full h-screen p-8 bg-gray-100">
            <nav className="bg-indigo-600 text-white py-4 px-6 flex justify-between items-center">

           
                <div className="text-lg font-bold">
                    <button
                        onClick={() => navigate('/complainantDashboard')}
                        className="text-white hover:text-gray-300 flex items-center"
                    >


                        <FaArrowLeft className="text-lg" />
                        <span className="ml-2">Back to Dashboard</span>
                    </button>
                </div>

                <div className="text-lg font-bold">Download Your Submited Complaint </div>
                {/* <button 
          onClick={() => window.history.back()}
          className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition duration-300"
        >
          Back
        </button> */}

                {/* <button
                        onClick={() => navigate('/complainantDashboard')}
                        className="text-white hover:text-gray-300 flex items-center"
                    >


                        <FaArrowLeft className="text-lg" />
                        <span className="ml-2">Back to Dashboard</span>
                    </button> */}
            </nav>
            <br></br><br></br>
            {/* <h1 className="text-3xl font-semibold mb-6 text-gray-800"> Download your Investigation Report </h1> */}
            {reports.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reports.map((report) => (
                        <div key={report.reportId} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                            
                            <h2 className="text-xl font-semibold mb-2 text-blue-600">Report ID: {report.reportId}</h2>
                            <p className="text-gray-700 mb-2"><span className="font-semibold">FIR ID:</span> {report.fir.firId}</p>
                            <p className="text-gray-700 mb-2"><span className="font-semibold">Complainant Name:</span> {report.fir.complainant.name}</p>
                            <p className="text-gray-600 mb-2"><span className="font-semibold"></span></p>
                            <p className="text-gray-700 mb-2"><span className="font-semibold">Incident Description:</span> {report.fir.incidentDescription}</p>
                            <p className="text-gray-600 mb-2"><span className="font-semibold">Report Details:</span> {report.reportDetails}</p>

                            <p className="text-gray-600 mb-2"><span className="font-semibold">Report Date:</span> {report.date}</p>
                            <p className="text-gray-600 mb-2"><span className="font-semibold">Handled by Police Officer:</span> {report.officer.name}</p>
                            <button
                                onClick={() => generatePDF(report)}
                                className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 transition duration-300"
                            >
                                Download as PDF
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-700">No reports found.</p>
            )}
        </div>
    );
};

export default ReportDetails;
