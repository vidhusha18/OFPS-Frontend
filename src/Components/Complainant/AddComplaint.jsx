// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import { useNavigate } from 'react-router-dom';
// import { FaArrowLeft, FaUserCircle } from 'react-icons/fa';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import i18n from '../../i18n';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaArrowLeft, FaUserCircle } from 'react-icons/fa';

import LanguageSwitcher from '../../LanguageSwitcher';

const districts = [
    'Madurai / மதுரை',
    'Dindigul / திண்டுக்கல்',
    'Virudhunagar / விருதுநகர்',
    'Theni / தேனி',
    'Thoothukudi / தூத்துக்குடி',
    'Trichy / திருச்சிராப்பள்ளி',
    'Chennai / சென்னை',
    'Thirunelveli / திருநெல்வேலி',
    'Coimbatore / கோயம்புத்தூர்'
];

const id = sessionStorage.getItem("ComplainantId");
const handleChangeLanguage = (lng) => {
    i18n.changeLanguage(lng);
};



const incidentTypes = [
    { value: 'Theft', label: 'Theft / Stealing someone else\'s property without permission / மற்றவரின் சொத்துகளை அனுமதி இல்லாமல் கொள்ளுதல்.' },
    { value: 'Burglary', label: 'Burglary / Breaking into a building to commit theft / ஒரு கட்டிடத்தில் புகுந்து கொள்ளை செய்ய முயற்சித்தல்.' },
    { value: 'Assault', label: 'Assault / Physically attacking someone / ஒருவரை உடல்தடையுடன் தாக்குதல்.' },
    { value: 'Robbery', label: 'Robbery / Using force or intimidation to take property from someone / பயமுறுத்தல் அல்லது வலிமையைப் பயன்படுத்தி சொத்துகளைப் பறிப்பு.' },
    { value: 'Fraud', label: 'Fraud / Deceptive actions to gain something illegally, like money / பணம் போன்றவற்றைப் பெறுவதற்கான மோசமான நடவடிக்கைகள்.' },
    { value: 'Murder', label: 'Murder / Intentionally killing another person / மற்றொருவரை நோக்காகக் கொல்லுதல்.' },
    { value: 'Vandalism', label: 'Vandalism / Deliberately damaging property / சொத்துகளை தீராகக் சேதம் செய்தல்.' },
    { value: 'Kidnapping', label: 'Kidnapping / Forcibly taking someone away, often to demand ransom / நகைச்சுவையாகக் கொண்டு செல்லுதல், பெரும்பாலும் பணம் கேட்க.' },
    { value: 'Arson', label: 'Arson / Deliberately setting fire to property / சொத்துகளுக்கு தீ வைப்பது.' },
    { value: 'Drug Trafficking', label: 'Drug Trafficking / Illegal distribution or sale of drugs / மது தடுப்பு அல்லது விற்பனைக்கு சட்டவிரோதமாகச் செயல்.' },
    { value: 'Cybercrime', label: 'Cybercrime / Crimes committed using computers or the internet, such as hacking / கணினிகள் அல்லது இணையத்தைப் பயன்படுத்தி செய்த குற்றங்கள்.' },
    { value: 'Embezzlement', label: 'Embezzlement / Misappropriating funds entrusted to you / உங்கள் மேலாண்மையிலுள்ள நிதிகளைத் திருடுதல்.' },
    { value: 'Domestic Violence', label: 'Domestic Violence / Abuse or violence occurring within a domestic setting / வீட்டுக்குள் நடந்த கூர்மையான தாக்குதல் அல்லது வன்முறை.' },
    { value: 'Extortion', label: 'Extortion / Obtaining money or valuables through coercion or threats / அழுத்தம் அல்லது அச்சுறுத்தல் மூலம் பணம் அல்லது மதிப்பற்றவற்றைப் பெறுதல்.' }
];

const suspectOptions = [
    'Suspect / சந்தேகத்திற்குரியவர்',
    'Perpetrator / குற்றவாளி',
    'Unknown / தெரியவில்லை'
];

const AddComplaintPage = () => {
    const { t, i18n } = useTranslation(); 
    const [complainant, setComplainant] = useState({
        complainantId: '',
        name: '',
        dob: '',
        identificationType: '',
        idNumber: '',
        address: '',
        gender: '',
        phone: ''
    });

    const [firDetails, setFirDetails] = useState({
        incidentType: '',
        incidentDate: '',
        incidentPlace: '',
        incidentDistrict: '',
        incidentDescription: '',
        incidentProof: null,
        suspectType: 'Unknown / தெரியவில்லை',
        incidentSuspect: ''
    });

    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch complainant details from profile (assuming email in sessionStorage)
        const email = sessionStorage.getItem('email');
        if (email) {
            axios.get(`http://localhost:9998/complainant/email/${email}`)
                .then(response => {
                    setComplainant(response.data);
                })
                .catch(err => console.error('Error fetching complainant data:', err));
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFirDetails(prevDetails => ({ ...prevDetails, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFirDetails(prevDetails => ({ ...prevDetails, incidentProof: e.target.files[0] }));
    };

    const handleSuspectChange = (e) => {
        const value = e.target.value;
        setFirDetails(prevDetails => ({
            ...prevDetails,
            suspectType: value,
            incidentSuspect: value === 'Unknown / தெரியவில்லை' ? '' : prevDetails.incidentSuspect
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const today = new Date().toISOString().split('T')[0];
        if (firDetails.incidentDate > today) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Date',
                text: 'Incident date cannot be a future date.',
            });
            return;
        }

        const formData = new FormData();
        Object.keys(firDetails).forEach(key => {
            if (key === 'incidentProof' && firDetails[key]) {
                formData.append(key, firDetails[key]);
            } else {
                formData.append(key, firDetails[key] || '');
            }
        });
        formData.append('id', id);

        try {
            await axios.post('http://localhost:9998/fir/addfir', formData);
            setSubmitted(true);
        } catch (err) {
            console.error('Error submitting FIR:', err);
            Swal.fire({
                icon: 'error',
                title: 'Submission Failed',
                text: 'There was an issue submitting your complaint.',
            });
        }
    };

    if (submitted) {
        return (
            <div className="p-8 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold mb-4">Complaint Successfully Filed</h1>
                </div>
                <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Complaint Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Complainant Details</h3>
                            <p><strong>Name:</strong> {complainant.name}</p>
                            <p><strong>Date of Birth:</strong> {complainant.dob}</p>
                            <p><strong>Identification Type:</strong> {complainant.identificationType}</p>
                            <p><strong>ID Number:</strong> {complainant.idNumber}</p>
                            <p><strong>Address:</strong> {complainant.address}</p>
                            <p><strong>Gender:</strong> {complainant.gender}</p>
                            <p><strong>Phone:</strong> {complainant.phone}</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Complaint Details</h3>
                            <p><strong>Incident Type:</strong> {firDetails.incidentType}</p>
                            <p><strong>Incident Date:</strong> {firDetails.incidentDate}</p>
                            <p><strong>Incident Place:</strong> {firDetails.incidentPlace}</p>
                            <p><strong>Incident District:</strong> {firDetails.incidentDistrict}</p>
                            <p><strong>Description:</strong> {firDetails.incidentDescription}</p>
                            {firDetails.incidentProof && <p><strong>Proof:</strong> {firDetails.incidentProof.name}</p>}
                            <p><strong>Suspect Type:</strong> {firDetails.suspectType}</p>
                            {firDetails.suspectType !== 'Unknown / தெரியவில்லை' && <p><strong>Suspect/Perpetrator Details:</strong> {firDetails.incidentSuspect}</p>}
                        </div>
                    </div>
                </div>
                <div className="mt-6">
                    <button
                        onClick={() => navigate('/complainantDashboard')}
                        className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    >
                        Back to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div>
            
            {/* <nav className="bg-gray-800 p-4 text-white flex items-center justify-between">
                <button
                    onClick={() => navigate('/complainantDashboard')}
                    className="flex items-center space-x-2"
                >
                    <FaArrowLeft className="text-lg" />
                    <span>Back to Dashboard</span>
                </button>
                <div className="flex items-center space-x-2">
                    <FaUserCircle className="text-2xl" />
                    <span>{complainant.name}</span>
                </div>
            </nav> */}

{/* <nav className="bg-indigo-600 text-white py-4 px-6 flex justify-between items-center">

           <div className="text-lg font-bold">
               <button
                   onClick={() => navigate('/complainantDashboard')}
                   className="text-white hover:text-gray-300 flex items-center"
               >


                   <FaArrowLeft className="text-lg" />
                   <span className="ml-2">Back to Dashboard</span>
               </button>
           </div>
           <LanguageSwitcher />
          <div className="text-lg font-bold">Submit Your Complaint </div>
           
       </nav> */}

<nav className="bg-indigo-600 text-white py-4 px-6 flex items-center">
    <div className="flex items-center">
        <button
            onClick={() => navigate('/complainantDashboard')}
            className="text-white hover:text-gray-300 flex items-center"
        >
            <FaArrowLeft className="text-lg" />
            <span className="ml-2">Back to Dashboard</span>
        </button>
    </div>
    
    {/* Spacer to push the title to the center */}
    <div className="flex-grow text-center text-lg font-bold">
        Submit Your Complaint
    </div>

    <div className="flex items-center">
        <LanguageSwitcher />
    </div>
</nav>


            <div className="p-8 max-w-4xl mx-auto bg-white shadow-lg rounded-lg mt-6">
                <h1 className="text-2xl font-semibold mb-6">Add New Complaint</h1>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <h2 className="text-xl font-semibold mb-4">Complainant Details</h2>
                            <div className="space-y-2">
                                <div>
                                    <label className="block text-gray-700">{t('name')}</label>
                                    <input
                                        type="text"
                                        value={complainant.name}
                                        readOnly
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-200"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700">{t('dob')}</label>
                                    <input
                                        type="text"
                                        value={complainant.dob}
                                        readOnly
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-200"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700">{t('incidentType')}</label>
                                    <input
                                        type="text"
                                        value={complainant.identificationType}
                                        readOnly
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-200"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700">{t('idnum')}</label>
                                    <input
                                        type="text"
                                        value={complainant.idNumber}
                                        readOnly
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-200"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700">{t('Address')}</label>
                                    <input
                                        type="text"
                                        value={complainant.address}
                                        readOnly
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-200"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700">{('Gender')}</label>
                                    <input
                                        type="text"
                                        value={complainant.gender}
                                        readOnly
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-200"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700">{('phn')}</label>
                                    <input
                                        type="text"
                                        value={complainant.phone}
                                        readOnly
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-200"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <h2 className="text-xl font-semibold mb-4">{t('compDetails')}</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-gray-700 mb-2">{('incidentType')} *</label>
                                    <select
                                        name="incidentType"
                                        value={firDetails.incidentType}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                        required
                                    >
                                        <option value="" disabled>{t('sincitype')}</option>
                                        {incidentTypes.map(type => (
                                            <option key={type.value} value={type.value}>{type.label}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-gray-700 mb-2">{t('IncidentDate')}*</label>
                                    <input
                                        type="date"
                                        name="incidentDate"
                                        value={firDetails.incidentDate}
                                        onChange={handleInputChange}
                                        max={new Date().toISOString().split('T')[0]}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 mb-2"> {t('IncidentPlace')} *</label>
                                    <input
                                        type="text"
                                        name="incidentPlace"
                                        value={firDetails.incidentPlace}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 mb-2"> {t('IncidentDistrict')} *</label>
                                    <select
                                        name="incidentDistrict"
                                        value={firDetails.incidentDistrict}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                        required
                                    >
                                        <option value="" disabled>{t('selectDistrict')} </option>
                                        {districts.map(district => (
                                            <option key={district} value={district}>{district}</option>
                                        ))}
                                    </select>
                                </div>
                                {/* <div>
                                    <label className="block text-gray-700 mb-2">Incident Description: *</label>
                                    <textarea
                                        name="incidentDescription"
                                        placeholder='Enter detailed description of incident/suspect/Perpetrator'
                                        value={firDetails.incidentDescription}
                                        onChange={handleInputChange}
                                        rows="6"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                        required
                                    />
                                </div> */}
                                <div>
                                    <label className="block text-gray-700 mb-2"> {t('IncidentProof')} *</label>
                                    <input
                                        type="file"
                                        name="incidentProof"
                                        onChange={handleFileChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 mb-2">{t('sustype')} *</label>
                                    <select
                                        name="suspectType"
                                        value={firDetails.suspectType}
                                        onChange={handleSuspectChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                    >
                                        {suspectOptions.map(option => (
                                            <option key={option} value={option}>{option}</option>
                                        ))}
                                    </select>
                                </div>
                                {firDetails.suspectType !== 'Unknown / தெரியவில்லை' && (
                                    <div>
                                        <label className="block text-gray-700 mb-2">Suspect/Perpetrator :சந்தேக நபர்/குற்றவாளி *</label>
                                        <input
                                            type="text"
                                            name="incidentSuspect"
                                            value={firDetails.incidentSuspect}
                                            onChange={handleInputChange}
                                            placeholder="Suspect/Perpetrator Details"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                        />
                                    </div>
                                )}

<div>
                                    <label className="block text-gray-700 mb-2">{t('IncidentDescription')} *</label>
                                    <textarea
                                        name="incidentDescription"
                                        placeholder='Enter detailed description of incident/suspect/Perpetrator'
                                        value={firDetails.incidentDescription}
                                        onChange={handleInputChange}
                                        rows="6"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                        >
                            {t('submitComplaint')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddComplaintPage;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import i18n from '../../i18n';
// import Swal from 'sweetalert2';
// import { useNavigate } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
// import { FaArrowLeft, FaUserCircle } from 'react-icons/fa';

// import LanguageSwitcher from '../../LanguageSwitcher';




// const districts = [
//     'Madurai / மதுரை',
//     'Dindigul / திண்டுக்கல்',
//     'Virudhunagar / விருதுநகர்',
//     'Theni / தேனி',
//     'Thoothukudi / தூத்துக்குடி',
//     'Trichy / திருச்சிராப்பள்ளி',
//     'Chennai / சென்னை',
//     'Thirunelveli / திருநெல்வேலி',
//     'Coimbatore / கோயம்புத்தூர்'
// ];

// const id = sessionStorage.getItem("ComplainantId");


// const handleChangeLanguage = (lng) => {
//     i18n.changeLanguage(lng);
// };

// const incidentTypes = [
//     { value: 'Theft', label: 'Theft / Stealing someone else\'s property without permission / மற்றவரின் சொத்துகளை அனுமதி இல்லாமல் கொள்ளுதல்.' },
//     { value: 'Burglary', label: 'Burglary / Breaking into a building to commit theft / ஒரு கட்டிடத்தில் புகுந்து கொள்ளை செய்ய முயற்சித்தல்.' },
//     { value: 'Assault', label: 'Assault / Physically attacking someone / ஒருவரை உடல்தடையுடன் தாக்குதல்.' },
//     { value: 'Robbery', label: 'Robbery / Using force or intimidation to take property from someone / பயமுறுத்தல் அல்லது வலிமையைப் பயன்படுத்தி சொத்துகளைப் பறிப்பு.' },
//     { value: 'Fraud', label: 'Fraud / Deceptive actions to gain something illegally, like money / பணம் போன்றவற்றைப் பெறுவதற்கான மோசமான நடவடிக்கைகள்.' },
//     { value: 'Murder', label: 'Murder / Intentionally killing another person / மற்றொருவரை நோக்காகக் கொல்லுதல்.' },
//     { value: 'Vandalism', label: 'Vandalism / Deliberately damaging property / சொத்துகளை தீராகக் சேதம் செய்தல்.' },
//     { value: 'Kidnapping', label: 'Kidnapping / Forcibly taking someone away, often to demand ransom / நகைச்சுவையாகக் கொண்டு செல்லுதல், பெரும்பாலும் பணம் கேட்க.' },
//     { value: 'Arson', label: 'Arson / Deliberately setting fire to property / சொத்துகளுக்கு தீ வைப்பது.' },
//     { value: 'Drug Trafficking', label: 'Drug Trafficking / Illegal distribution or sale of drugs / மது தடுப்பு அல்லது விற்பனைக்கு சட்டவிரோதமாகச் செயல்.' },
//     { value: 'Cybercrime', label: 'Cybercrime / Crimes committed using computers or the internet, such as hacking / கணினிகள் அல்லது இணையத்தைப் பயன்படுத்தி செய்த குற்றங்கள்.' },
//     { value: 'Embezzlement', label: 'Embezzlement / Misappropriating funds entrusted to you / உங்கள் மேலாண்மையிலுள்ள நிதிகளைத் திருடுதல்.' },
//     { value: 'Domestic Violence', label: 'Domestic Violence / Abuse or violence occurring within a domestic setting / வீட்டுக்குள் நடந்த கூர்மையான தாக்குதல் அல்லது வன்முறை.' },
//     { value: 'Extortion', label: 'Extortion / Obtaining money or valuables through coercion or threats / அழுத்தம் அல்லது அச்சுறுத்தல் மூலம் பணம் அல்லது மதிப்பற்றவற்றைப் பெறுதல்.' }
// ];

// const suspectOptions = [
//     'Suspect / சந்தேகத்திற்குரியவர்',
//     'Perpetrator / குற்றவாளி',
//     'Unknown / தெரியவில்லை'
// ];

// const AddComplaintPage = () => {

//     const { t, i18n } = useTranslation(); // Use the translation hook

//     const [complainant, setComplainant] = useState({
//         complainantId: '',
//         name: '',
//         dob: '',
//         identificationType: '',
//         idNumber: '',
//         address: '',
//         gender: '',
//         phone: ''
//     });

//     const [firDetails, setFirDetails] = useState({
//         incidentType: '',
//         incidentDate: '',
//         incidentPlace: '',
//         incidentDistrict: '',
//         incidentDescription: '',
//         incidentProof: null,
//         suspectType: 'Unknown / தெரியவில்லை',
//         incidentSuspect: ''
//     });

//     const [submitted, setSubmitted] = useState(false);
//     const navigate = useNavigate();

//     useEffect(() => {
//         // Fetch complainant details from profile (assuming email in sessionStorage)
//         const email = sessionStorage.getItem('email');
//         if (email) {
//             axios.get(`http://localhost:9998/complainant/email/${email}`)
//                 .then(response => {
//                     setComplainant(response.data);
//                 })
//                 .catch(err => console.error('Error fetching complainant data:', err));
//         }
//     }, []);

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFirDetails(prevDetails => ({ ...prevDetails, [name]: value }));
//     };

//     const handleFileChange = (e) => {
//         setFirDetails(prevDetails => ({ ...prevDetails, incidentProof: e.target.files[0] }));
//     };

//     const handleSuspectChange = (e) => {
//         const value = e.target.value;
//         setFirDetails(prevDetails => ({
//             ...prevDetails,
//             suspectType: value,
//             incidentSuspect: value === 'Unknown / தெரியவில்லை' ? '' : prevDetails.incidentSuspect
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const today = new Date().toISOString().split('T')[0];
//         if (firDetails.incidentDate > today) {
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Invalid Date',
//                 text: 'Incident date cannot be a future date.',
//             });
//             return;
//         }

//         const formData = new FormData();
//         Object.keys(firDetails).forEach(key => {
//             if (key === 'incidentProof' && firDetails[key]) {
//                 formData.append(key, firDetails[key]);
//             } else {
//                 formData.append(key, firDetails[key] || '');
//             }
//         });
//         formData.append('id', id);

//         try {
//             await axios.post('http://localhost:9998/fir/addfir', formData);
//             setSubmitted(true);
//         } catch (err) {
//             console.error('Error submitting FIR:', err);
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Submission Failed',
//                 text: 'There was an issue submitting your complaint.',
//             });
//         }
//     };

//     if (submitted) {
//         return (
//             <div className="p-8 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">

//                 <div className="mb-6">
//                     <h1 className="text-2xl font-semibold mb-4">Complaint Successfully Filed</h1>
//                 </div>
//                 <div className="bg-gray-100 p-6 rounded-lg shadow-md">
//                     <h2 className="text-xl font-semibold mb-4">Complaint Details</h2>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         <div>
//                             <h3 className="text-lg font-semibold mb-2">Complainant Details</h3>
//                             <p><strong>Name:</strong> {complainant.name}</p>
//                             <p><strong>Date of Birth:</strong> {complainant.dob}</p>
//                             <p><strong>Identification Type:</strong> {complainant.identificationType}</p>
//                             <p><strong>ID Number:</strong> {complainant.idNumber}</p>
//                             <p><strong>Address:</strong> {complainant.address}</p>
//                             <p><strong>Gender:</strong> {complainant.gender}</p>
//                             <p><strong>Phone:</strong> {complainant.phone}</p>
//                         </div>
//                         <div>
//                             <h3 className="text-lg font-semibold mb-2">Complaint Details</h3>
//                             <p><strong>Incident Type:</strong> {firDetails.incidentType}</p>
//                             <p><strong>Incident Date:/</strong> {firDetails.incidentDate}</p>
//                             <p><strong>Incident Place:</strong> {firDetails.incidentPlace}</p>
//                             <p><strong>Incident District/சம்பவம் நடந்த மாவட்டம்</strong> {firDetails.incidentDistrict}</p>
//                             <p><strong>Description/</strong> {firDetails.incidentDescription}</p>
//                             {firDetails.incidentProof && <p><strong>Proof:</strong> {firDetails.incidentProof.name}</p>}
//                             <p><strong>Suspect Type:</strong> {firDetails.suspectType}</p>
//                             {firDetails.suspectType !== 'Unknown / தெரியவில்லை' && <p><strong>Suspect/Perpetrator Details:</strong> {firDetails.incidentSuspect}</p>}
//                         </div>
//                     </div>
//                 </div>
//                 <div className="mt-6">
//                     <button
//                         onClick={() => navigate('/complainantDashboard')}
//                         className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
//                     >
//                         Back to Dashboard
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div>
//             <LanguageSwitcher />
//             <nav className="bg-indigo-600 text-white py-4 px-6 flex justify-between items-center">

//                 <div className="text-lg font-bold">
//                     <button
//                         onClick={() => navigate('/complainantDashboard')}
//                         className="text-white hover:text-gray-300 flex items-center"
//                     >


//                         <FaArrowLeft className="text-lg" />
//                         <span className="ml-2">{t('Back to Dashboard')}</span>
//                     </button>
//                 </div>


                
//                 {/* <button 
//           onClick={() => window.history.back()}
//           className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition duration-300"
//         >
//           Back
//         </button> */}

//                 {/* <button
//                         onClick={() => navigate('/complainantDashboard')}
//                         className="text-white hover:text-gray-300 flex items-center"
//                     >


//                         <FaArrowLeft className="text-lg" />
//                         <span className="ml-2">Back to Dashboard</span>
                    
                    
//                     </button> */}

               


//             </nav>

//             <div className="p-8 max-w-4xl mx-auto bg-white shadow-lg rounded-lg mt-6">
//                 <h1 className="text-2xl font-semibold mb-6">Add New Complaint</h1>
//                 <form onSubmit={handleSubmit} encType="multipart/form-data">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                         <div className="bg-gray-100 p-4 rounded-lg">
//                             <h2 className="text-xl font-semibold mb-4">Complainant Details</h2>
//                             <div className="space-y-2">
//                                 <div>
//                                     <label className="block text-gray-700">{t('name')} </label>
//                                     <input
//                                         type="text"
//                                         value={complainant.name}
//                                         readOnly
//                                         className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-200"
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className="block text-gray-700">{t('dob')}</label>
//                                     <input
//                                         type="text"
//                                         value={complainant.dob}
//                                         readOnly
//                                         className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-200"
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className="block text-gray-700">{t('idType')}</label>
//                                     <input
//                                         type="text"
//                                         value={complainant.identificationType}
//                                         readOnly
//                                         className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-200"
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className="block text-gray-700">{t('idnum')}</label>
//                                     <input
//                                         type="text"
//                                         value={complainant.idNumber}
//                                         readOnly
//                                         className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-200"
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className="block text-gray-700">{t('Address')}</label>
//                                     <input
//                                         type="text"
//                                         value={complainant.address}
//                                         readOnly
//                                         className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-200"
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className="block text-gray-700">{t('Gender')}</label>
//                                     <input
//                                         type="text"
//                                         value={complainant.gender}
//                                         readOnly
//                                         className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-200"
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className="block text-gray-700">{t('phn')}</label>
//                                     <input
//                                         type="text"
//                                         value={complainant.phone}
//                                         readOnly
//                                         className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-200"
//                                     />
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="bg-gray-100 p-4 rounded-lg">
//                             <h2 className="text-xl font-semibold mb-4">{t('compDetails')}</h2>
//                             <div className="space-y-4">
//                                 <div>
//                                     <label className="block text-gray-700 mb-2">{t('incidentType')} *</label>
//                                     <select
//                                         name="incidentType"
//                                         value={firDetails.incidentType}
//                                         onChange={handleInputChange}
//                                         className="w-full px-4 py-2 border border-gray-300 rounded-md"
//                                         required
//                                     >
//                                         <option value="" disabled>{t('sincitype')}</option>
//                                         {incidentTypes.map(type => (
//                                             <option key={type.value} value={type.value}>{type.label}</option>
//                                         ))}
//                                     </select>
//                                 </div>
//                                 <div>
//                                     <label className="block text-gray-700 mb-2">{t('IncidentDate')} *</label>
//                                     <input
//                                         type="date"
//                                         name="incidentDate"
//                                         value={firDetails.incidentDate}
//                                         onChange={handleInputChange}
//                                         max={new Date().toISOString().split('T')[0]}
//                                         className="w-full px-4 py-2 border border-gray-300 rounded-md"
//                                         required
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className="block text-gray-700 mb-2">{t('IncidentPlace')} *</label>
//                                     <input
//                                         type="text"
//                                         name="incidentPlace"
//                                         value={firDetails.incidentPlace}
//                                         onChange={handleInputChange}
//                                         className="w-full px-4 py-2 border border-gray-300 rounded-md"
//                                         required
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className="block text-gray-700 mb-2">{t('IncidentDistrict')} *</label>
//                                     <select
//                                         name="incidentDistrict"
//                                         value={firDetails.incidentDistrict}
//                                         onChange={handleInputChange}
//                                         className="w-full px-4 py-2 border border-gray-300 rounded-md"
//                                         required
//                                     >
//                                         <option value="" disabled>{t('selectDistrict')}</option>
//                                         {districts.map(district => (
//                                             <option key={district} value={district}>{district}</option>
//                                         ))}
//                                     </select>
//                                 </div>
//                                 {/* <div>
//                                     <label className="block text-gray-700 mb-2">Incident Description: *</label>
//                                     <textarea
//                                         name="incidentDescription"
//                                         placeholder='Enter detailed description of incident/suspect/Perpetrator'
//                                         value={firDetails.incidentDescription}
//                                         onChange={handleInputChange}
//                                         rows="6"
//                                         className="w-full px-4 py-2 border border-gray-300 rounded-md"
//                                         required
//                                     />
//                                 </div> */}
//                                 <div>
//                                     <label className="block text-gray-700 mb-2"> {t('IncidentProof')} *</label>
//                                     <input
//                                         type="file"
//                                         name="incidentProof"
//                                         onChange={handleFileChange}
//                                         className="w-full px-4 py-2 border border-gray-300 rounded-md"
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className="block text-gray-700 mb-2">{t('SuspectType')} *</label>
//                                     <select
//                                         name="suspectType"
//                                         value={firDetails.suspectType}
//                                         onChange={handleSuspectChange}
//                                         className="w-full px-4 py-2 border border-gray-300 rounded-md"
//                                     >
//                                         {suspectOptions.map(option => (
//                                             <option key={option} value={option}>{option}</option>
//                                         ))}
//                                     </select>
//                                 </div>
//                                 {firDetails.suspectType !== 'Unknown / தெரியவில்லை' && (
//                                     <div>
//                                         <label className="block text-gray-700 mb-2">Suspect/Perpetrator :சந்தேக நபர்/குற்றவாளி</label>
//                                         <input
//                                             type="text"
//                                             name="incidentSuspect"
//                                             value={firDetails.incidentSuspect}
//                                             onChange={handleInputChange}
//                                             placeholder="Suspect/Perpetrator Details"
//                                             className="w-full px-4 py-2 border border-gray-300 rounded-md"
//                                         />
//                                     </div>
//                                 )}

//                                 <div>
//                                     <label className="block text-gray-700 mb-2">{t('IncidentDescription')} *</label>
//                                     <textarea
//                                         name="incidentDescription"
//                                         placeholder='Enter detailed description of incident/suspect/Perpetrator'
//                                         value={firDetails.incidentDescription}
//                                         onChange={handleInputChange}
//                                         rows="6"
//                                         className="w-full px-4 py-2 border border-gray-300 rounded-md"
//                                         required
//                                     />
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="flex justify-end">
//                         <button
//                             type="submit"
//                             className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
//                         >
//                             {t('SubmitComplaint')}

//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default AddComplaintPage;







