

// import React, { useState, useEffect } from 'react';
// import { FaUser, FaPhone, FaEnvelope, FaLock, FaKey, FaMapMarkerAlt, FaIdCard, FaCalendarAlt, FaInfoCircle, FaExclamationCircle, FaCheckCircle } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const SignUp = () => {
//     const [name, setName] = useState('');
//     const [phone, setPhone] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [address, setAddress] = useState('');
//     const [identificationType, setIdentificationType] = useState('');
//     const [idNumber, setIdNumber] = useState('');
//     const [dob, setDob] = useState('');
//     const [age, setAge] = useState('');
//     const [gender, setGender] = useState('');
//     const [relationType, setRelationType] = useState('');
//     const [relativeName, setRelativeName] = useState('');
//     const [image, setImage] = useState(null);
//     const [error, setError] = useState('');
//     const [showAgeAlert, setShowAgeAlert] = useState(false);
//     const [minDate, setMinDate] = useState('');
//     const [termsAccepted, setTermsAccepted] = useState(false);
//     const [showTermsPopup, setShowTermsPopup] = useState(false);
//     const [idNumberError, setIdNumberError] = useState('');
//     const [phoneError, setPhoneError] = useState('');    //Define phoneError state
//     const navigate = useNavigate();

//     const identificationTypes = ['Aadhar', 'Passport'];
//     const relationTypes = ['Mother', 'Father', 'Spouse', 'Guardian'];
//     const genders = ['Male', 'Female', 'Transgender', 'Other'];



//     useEffect(() => {
//         // Set the maximum date for date picker (today)
//         const today = new Date().toISOString().split('T')[0];
//         setMaxDate(today);
//     }, []);

//     const handleDOBChange = (e) => {
//         const dobValue = e.target.value;
//         setDob(dobValue);
//         const calculatedAge = calculateAge(dobValue);
//         setAge(calculatedAge);
//         if (calculatedAge < 18) {
//             setShowAgeAlert(true);
//         } else {
//             setShowAgeAlert(false);
//         }
//     };
//     const handlePhoneChange = (e) => {
//         const phoneValue = e.target.value;
//         //   Filter out non-numeric characters
//         const numericValue = phoneValue.replace(/\D/g, '');
//         setPhone(numericValue);

//         if (validatePhone(numericValue)) {
//             setPhoneError('');
//         } else {
//             setPhoneError('Phone number should be 10 digits');
//         }
//     };

//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         if (file && (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg')) {
//             setImage(URL.createObjectURL(file));
//         } else {
//             toast.error('Please upload a valid image (JPEG or PNG)');
//         }
//     };

//     const handleImageClick = () => {
//         document.getElementById('imageUpload').click();
//     };

//     useEffect(() => {
//         //    Set the maximum date for date picker (today)
//         const today = new Date().toISOString().split('T')[0];
//         setMaxDate(today);
//     }, []);

//     const setMaxDate = (date) => {
//         document.getElementById('dob').setAttribute('max', date);
//     };

//     const calculateAge = (dob) => {
//         const today = new Date();
//         const birthDate = new Date(dob);
//         let age = today.getFullYear() - birthDate.getFullYear();
//         const monthDifference = today.getMonth() - birthDate.getMonth();
//         if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
//             age--;
//         }
//         return age;
//     };


//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (!termsAccepted) {
//             toast.error('You must accept the Terms and Conditions');
//             return;
//         }

//         if (password !== confirmPassword) {
//             toast.error('Passwords do not match');
//             return;
//         }

//         if (!image) {
//             toast.error('Please upload an image');
//             return;
//         }

//         if (age < 18) {
//             toast.error('You must be 18 years or older to register');
//             return;
//         }

//         const formData = new FormData();
//         formData.append('name', name);
//         formData.append('phone', phone);
//         formData.append('email', email);
//         formData.append('password', password);
//         formData.append('address', address);
//         formData.append('identificationType', identificationType);
//         formData.append('idNumber', idNumber);
//         formData.append('dob', dob);
//         formData.append('gender', gender);
//         formData.append('relationType', relationType);
//         formData.append('relativeName', relativeName);
//         formData.append('image', document.getElementById('imageUpload').files[0]);

//         try {
//             const response = await fetch('http://localhost:9998/complainant', {
//                 method: 'POST',
//                 body: formData,
//             });

//             if (response.ok) {
//                 toast.success('Registration successful! ');
//                 navigate('/login');
//             } else {
//                 const errorData = await response.json();
//                 toast.error(errorData.message || 'Registration failed');
//             }
//         } catch (error) {
//             toast.error('An error occurred');
//         }
//     };

//     const validatePhone = (phone) => {
//         const regex = /^[0-9]{10}$/;
//         return regex.test(phone);
//     };

//     const validateIdNumber = (idNumber) => {
//         if (identificationType === 'Aadhar') {
//             return /^\d{12}$/.test(idNumber); // 12 digits for Aadhar
//         } else if (identificationType === 'Passport') {
//             return /^[A-Z0-9]{6,8}$/.test(idNumber); // Alphanumeric, 6-9 characters for Passport
//         }
//         return false;
//     };

//     // const validateIdNumber = (idNumber, identificationType) => {
//     //     if (identificationType === 'Aadhar') {
//     //         return /^\d{12}$/.test(idNumber); // 12 digits for Aadhar
//     //     } else if (identificationType === 'Indian Passport') {
//     //         return /^[A-Z][0-9]{7}$/.test(idNumber); // 1 uppercase letter followed by 7 digits for Indian Passport
//     //     } else if (identificationType === 'US Passport') {
//     //         return /^[A-Z]{2}[0-9]{7}$/.test(idNumber); // 2 uppercase letters followed by 7 digits for US Passport
//     //     }
//     //     return false;
//     // };

//     const openTermsPopup = () => {
//         setShowTermsPopup(true);
//     };

//     const closeTermsPopup = () => {
//         setShowTermsPopup(false);
//     };

//     return (
//         <div className="flex h-max mt-8 w-max">
//             {/* Left Column: Registration Form */}
//             <div className="bg-white p-6 border border-red-500 w-1/2">

//                 <div className="">
//                     <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Create OFPS Account</h2>
//                     <form onSubmit={handleSubmit} className="space-y-8">
//                         {/* Image Upload */}
//                         <div
//                             className="relative w-32 h-32 bg-gray-300 rounded-full overflow-hidden flex items-center justify-center cursor-pointer mx-auto"
//                             onClick={handleImageClick}
//                         >
//                             {image ? (
//                                 <img src={image} alt="Profile" className="w-full h-full object-cover" />
//                             ) : (
//                                 <span className="text-gray-600">Add Photo</span>
//                             )}
//                             <input
//                                 type="file"
//                                 id="imageUpload"
//                                 accept="image/png, image/jpeg"
//                                 className="absolute inset-0 opacity-0 cursor-pointer"
//                                 onChange={handleImageChange}
//                             />
//                         </div>

//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             {/* Form Fields */}
//                             <div><label>Name/
//                                 பெயர் *</label>
//                                 <div className="relative">

//                                     <input
//                                         type="text"
//                                         value={name}
//                                         onChange={(e) => setName(e.target.value)}
//                                         required
//                                         placeholder="Name"
//                                         className="w-full px-10 py-3 text-gray-500 bg-transparent border border-gray-300 rounded-lg shadow-sm outline-none focus:border-indigo-600"
//                                     />
//                                     <FaUser className="absolute top-4 left-3 text-gray-400" />
//                                 </div>
//                             </div>

//                             <div className='border-red-700'><label>Phone Number/தொலைபேசி எண் *</label>
//                                 <div className="relative">
//                                     <input
//                                         type="tel"
//                                         value={phone}
//                                         onChange={handlePhoneChange}
//                                         required
//                                         placeholder="Phone Number"
//                                         className={`w-full px-10 py-3 text-gray-500 bg-transparent border ${phoneError ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm outline-none focus:border-indigo-600`}
//                                     />
//                                     <FaPhone className="absolute top-4 left-3 text-gray-400" />
//                                     {phoneError && <p className="text-red-500 text-sm mt-1">{phoneError}</p>}
//                                 </div>
//                             </div>
//                             <div><label>Email/மின்னஞ்சல்  *</label>
//                                 <div className="relative">
//                                     <input
//                                         type="email"
//                                         value={email}
//                                         onChange={(e) => setEmail(e.target.value)}
//                                         required
//                                         placeholder="Email"
//                                         className="w-full px-10 py-3 text-gray-500 bg-transparent border border-gray-300 rounded-lg shadow-sm outline-none focus:border-indigo-600"
//                                     />
//                                     <FaEnvelope className="absolute top-4 left-3 text-gray-400" />
//                                 </div>
//                             </div>

//                             <div><label>Password/கடவுச்சொல் *</label>
//                                 <div className="relative">
//                                     <input
//                                         type="password"
//                                         value={password}
//                                         onChange={(e) => setPassword(e.target.value)}
//                                         required
//                                         placeholder="Password"
//                                         className="w-full px-10 py-3 text-gray-500 bg-transparent border border-gray-300 rounded-lg shadow-sm outline-none focus:border-indigo-600"
//                                     />
//                                     <FaLock className="absolute top-4 left-3 text-gray-400" />
//                                 </div>
//                             </div>

//                             <div><label>Confirm Password/கடவுச்சொல் உறுதி *</label>
//                                 <div className="relative">
//                                     <input
//                                         type="password"
//                                         value={confirmPassword}
//                                         onChange={(e) => setConfirmPassword(e.target.value)}
//                                         required
//                                         placeholder="Confirm Password"
//                                         className="w-full px-10 py-3 text-gray-500 bg-transparent border border-gray-300 rounded-lg shadow-sm outline-none focus:border-indigo-600"
//                                     />
//                                     <FaKey className="absolute top-4 left-3 text-gray-400" />
//                                 </div>
//                             </div>

//                             <div><label>Address/ முகவரி*</label>
//                                 <div className="relative">
//                                     <input
//                                         type="text"
//                                         value={address}
//                                         onChange={(e) => setAddress(e.target.value)}
//                                         required
//                                         placeholder="Address"
//                                         className="w-full px-10 py-3 text-gray-500 bg-transparent border border-gray-300 rounded-lg shadow-sm outline-none focus:border-indigo-600"
//                                     />
//                                     <FaMapMarkerAlt className="absolute top-4 left-3 text-gray-400" />
//                                 </div>
//                             </div>

//                             <div><label>Idententification Type/அடையாள வகை *</label>
//                                 <div className="relative">
//                                     <select
//                                         value={identificationType}
//                                         onChange={(e) => setIdentificationType(e.target.value)}
//                                         required
//                                         className="w-full px-10 py-3 text-gray-500 bg-transparent border border-gray-300 rounded-lg shadow-sm outline-none focus:border-indigo-600"
//                                     >
//                                         <option value="">Select ID Type</option>
//                                         {identificationTypes.map((type) => (
//                                             <option key={type} value={type}>{type}</option>
//                                         ))}
//                                     </select>
//                                     <FaIdCard className="absolute top-4 left-3 text-gray-400" />
//                                 </div>
//                             </div>


//                             <div><label>ID Number/அடையாள எண் *</label>
//                                 <div className="relative">
//                                     <input
//                                         type="text"
//                                         value={idNumber}
//                                         onChange={(e) => {
//                                             setIdNumber(e.target.value);
//                                             if (validateIdNumber(e.target.value)) {
//                                                 setIdNumberError('');
//                                             } else {
//                                                 setIdNumberError(`Invalid ${identificationType} Number`);
//                                             }
//                                         }}
//                                         required
//                                         placeholder="ID Number"
//                                         className={`w-full px-10 py-3 text-gray-500 bg-transparent border ${idNumberError ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm outline-none focus:border-indigo-600`}
//                                     />
//                                     <FaIdCard className="absolute top-4 left-3 text-gray-400" />
//                                     {idNumberError && <p className="text-red-500 text-sm mt-1">{idNumberError}</p>}
//                                 </div>
//                             </div>

//                             <div><label>Date Of Birth/பிறந்த தேதி *</label>
//                                 <div className="relative">
//                                     <input
//                                         type="date"
//                                         id="dob"
//                                         value={dob}

//                                         onChange={handleDOBChange}
//                                         required
//                                         placeholder="Date of Birth"
//                                         className="w-full px-10 py-3 text-gray-500 bg-transparent border border-gray-500 rounded-lg shadow-sm outline-none focus:border-indigo-600"
//                                     />
//                                     <FaCalendarAlt className="absolute top-4 left-3 text-gray-400" />
//                                 </div>
//                             </div>

//                             <div><label>Gender/பாலினம் *</label>
//                                 <div className="relative">
//                                     <select
//                                         value={gender}
//                                         onChange={(e) => setGender(e.target.value)}
//                                         required
//                                         className="w-full px-10 py-3 text-gray-500 bg-transparent border border-gray-300 rounded-lg shadow-sm outline-none focus:border-indigo-600"
//                                     >
//                                         <option value="">Select Gender</option>
//                                         {genders.map((gender) => (
//                                             <option key={gender} value={gender}>{gender}</option>
//                                         ))}
//                                     </select>
//                                     <FaExclamationCircle className="absolute top-4 left-3 text-gray-400" />
//                                 </div>
//                             </div>
//                             <div><label>Relation Type/உறவு வகை *</label>
//                                 <div className="relative">
//                                     <select
//                                         value={relationType}
//                                         onChange={(e) => setRelationType(e.target.value)}
//                                         required
//                                         className="w-full px-10 py-3 text-gray-500 bg-transparent border border-gray-300 rounded-lg shadow-sm outline-none focus:border-indigo-600"
//                                     >
//                                         <option value="">Select Relation Type</option>
//                                         {relationTypes.map((type) => (
//                                             <option key={type} value={type}>{type}</option>
//                                         ))}
//                                     </select>
//                                     <FaExclamationCircle className="absolute top-4 left-3 text-gray-400" />
//                                 </div>
//                             </div>

//                             <div><label>Relative Name/உறவினரின் பெயர் *</label>
//                                 <div className="relative">
//                                     <input
//                                         type="text"
//                                         value={relativeName}
//                                         onChange={(e) => setRelativeName(e.target.value)}
//                                         required
//                                         placeholder="Relative's Name"
//                                         className="w-full px-10 py-3 text-gray-500 bg-transparent border border-gray-300 rounded-lg shadow-sm outline-none focus:border-indigo-600"
//                                     />
//                                     <FaExclamationCircle className="absolute top-4 left-3 text-gray-400" />
//                                 </div>
//                             </div>
//                         </div>


//                         <div className="flex items-center mb-4">
//                             <input
//                                 type="checkbox"
//                                 id="terms"
//                                 checked={termsAccepted}
//                                 onChange={(e) => setTermsAccepted(e.target.checked)}
//                                 className="mr-2"
//                             />
//                             <label htmlFor="terms" className="text-gray-600">
//                                 I accept the <button type="button" onClick={openTermsPopup} className="text-indigo-600 underline">Terms and Conditions</button>
//                             </label>
//                         </div>

//                         <button
//                             type="submit"
//                             className="w-40 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none"
//                         >
//                             Register
//                         </button>
//                     </form>
//                 </div>
//             </div>

//             {/* Right Column: Important Notes */}
//             <div className="hidden md:flex md:w-1/2 bg-gray-100 ml-10 p-8 flex-col items-center justify-center border border-indigo-600 rounded-lg">
//                 <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
//                     <FaInfoCircle className="text-indigo-600 mr-2 " />
//                     POINTS TO REMEMBER
//                 </h2>
//                 <strong>  <p className="text-gray-600 mb-4 text-center">
//                     Before proceeding with the registration, please make sure to review the following important points:
//                 </p>
//                     <ul className="list-disc list-inside mb-4 text-gray-600">
//                         <li className="flex items-center">
//                             {/* <FaCheckCircle className="text-indigo-600 mr-2" /> */}
//                             👉 Ensure you have a valid email address as it will be used for communication.
//                         </li>
//                         <li className="flex items-center">
//                             {/* <FaCheckCircle className="text-indigo-600 mr-2" /> */}
//                             👉 Upload a clear and recent photograph for identification purposes.
//                         </li>
//                         <li className="flex items-center">
//                             {/* <FaCheckCircle className="text-indigo-600 mr-2" /> */}
//                             👉  All fields marked with * are Mandatory and need to be filled accurately.
//                         </li>
//                         <li className="flex items-center">
//                             {/* <FaCheckCircle className="text-indigo-600 mr-2" /> */}
//                             👉 The Online FIR Processing System (OFPS) is available for registering complaints online.
//                         </li>
//                         <li className="flex items-center">
//                             {/* <FaCheckCircle className="text-indigo-600 mr-2" /> */}
//                             👉 For any queries regarding the FIR processing system, refer to our official website or contact support.
//                         </li>
//                         <li className="flex items-center">
//                             {/* <FaCheckCircle className="text-indigo-600 mr-2" /> */}
//                             👉  Make sure to read and understand the Terms and Conditions before completing the registration.
//                         </li>
//                     </ul>
//                     <h1 className="text-gray-600 text-center">
//                         ⚠️ False complaints are subject to prosecution under IPC.
//                     </h1></strong>
//             </div>

//             {/* Terms and Conditions Popup */}
//             {showTermsPopup && (
//                 <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
//                     <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto">
//                         <h3 className="text-xl font-bold mb-4">Terms and Conditions *</h3>
//                         <p className="text-gray-700 mb-4">
//                             Though the Online FIR Process is done in this application, the complainant must connect with a police officer or be present at the police station whenever called.
//                             Even though the FIR can be filed online, any evidence collected throughout the various stages of FIR process will be disclosed in person except the final F.I.R Closure
//                         </p>
//                         <button onClick={closeTermsPopup} className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
//                             Close
//                         </button>
//                     </div>
//                 </div>
//             )}

//             <ToastContainer />
//         </div>
//     );
// };

// export default SignUp;



// import React, { useState, useEffect } from 'react';
// import {
//     FaUser, FaPhone, FaEnvelope, FaLock, FaKey,
//     FaMapMarkerAlt, FaIdCard, FaCalendarAlt,
//     FaInfoCircle, FaExclamationCircle
// } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify';
// import Swal from 'sweetalert2';
// import 'react-toastify/dist/ReactToastify.css';
// import i18n from '../i18n';
// import LanguageSwitcher from '../LanguageSwitcher';
// import { useTranslation } from 'react-i18next';

// const SignUp = () => {
//     const [name, setName] = useState('');
//     const [phone, setPhone] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [address, setAddress] = useState('');
//     const [identificationType, setIdentificationType] = useState('');
//     const [idNumber, setIdNumber] = useState('');
//     const [dob, setDob] = useState('');
//     const [age, setAge] = useState('');
//     const [gender, setGender] = useState('');
//     const [relationType, setRelationType] = useState('');
//     const [relativeName, setRelativeName] = useState('');
//     const [image, setImage] = useState(null);
//     const [error, setError] = useState('');
//     const [showAgeAlert, setShowAgeAlert] = useState(false);
//     const [termsAccepted, setTermsAccepted] = useState(false);
//     const [showTermsPopup, setShowTermsPopup] = useState(false);
//     const [idNumberError, setIdNumberError] = useState('');
//     const [phoneError, setPhoneError] = useState('');

//     const navigate = useNavigate();


//     const handleChangeLanguage = (lng) => {
//         i18n.changeLanguage(lng);
//     };

//     const{ t } =useTranslation();



//     const identificationTypes = ['Aadhar', 'Passport'];
//     const relationTypes = ['Mother', 'Father', 'Spouse', 'Guardian'];
//     const genders = ['Male', 'Female', 'Transgender', 'Other'];

//     useEffect(() => {
//         const today = new Date().toISOString().split('T')[0];
//         setMaxDate(today);
//     }, []);


//         const setMaxDate = (date) => {
//         document.getElementById('dob').setAttribute('max', date);
//     };
//     const handleDOBChange = (e) => {
//         const dobValue = e.target.value;
//         setDob(dobValue);
//         const calculatedAge = calculateAge(dobValue);
//         setAge(calculatedAge);
//         setShowAgeAlert(calculatedAge < 18);
//     };

//     const handlePhoneChange = (e) => {
//         const phoneValue = e.target.value.replace(/\D/g, '');
//         setPhone(phoneValue);
//         setPhoneError(validatePhone(phoneValue) ? '' : 'Phone number should be 10 digits');
//     };

//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
//             setImage(URL.createObjectURL(file));
//         } else {
//             toast.error('Please upload a valid image (JPEG or PNG)');
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (!termsAccepted) {
//             toast.error('You must accept the Terms and Conditions');
//             return;
//         }

//         if (password !== confirmPassword) {
//             toast.error('Passwords do not match');
//             return;
//         }

//         if (!image) {
//             toast.error('Please upload an image');
//             return;
//         }

//         if (age < 18) {
//             toast.error('You must be 18 years or older to register');
//             return;
//         }

//         const formData = new FormData();
//         formData.append('name', name);
//         formData.append('phone', phone);
//         formData.append('email', email);
//         formData.append('password', password);
//         formData.append('address', address);
//         formData.append('identificationType', identificationType);
//         formData.append('idNumber', idNumber);
//         formData.append('dob', dob);
//         formData.append('gender', gender);
//         formData.append('relationType', relationType);
//         formData.append('relativeName', relativeName);
//         formData.append('image', document.getElementById('imageUpload').files[0]);

//         try {
//             const response = await fetch('http://localhost:9998/complainant', {
//                 method: 'POST',
//                 body: formData,
//             });

//             if (response.ok) {
//                 Swal.fire({
//                     title: 'Registration Successful!',
//                     text: 'You can now log in to your account.',
//                     icon: 'success',
//                     confirmButtonText: 'Okay'
//                 }).then(() => navigate('/login'));
//             } else {
//                 const errorData = await response.json();
//                 toast.error(errorData.message || 'Registration failed');
//             }
//         } catch (error) {
//             toast.error('An error occurred');
//         }
//     };

//     const validatePhone = (phone) => {
//         const regex = /^[0-9]{10}$/;
//         return regex.test(phone);
//     };

//     const validateIdNumber = (idNumber) => {
//         if (identificationType === 'Aadhar') {
//             return /^\d{12}$/.test(idNumber);
//         } else if (identificationType === 'Passport') {
//             return /^[A-Z0-9]{6,8}$/.test(idNumber);
//         }
//         return false;
//     };

//     const calculateAge = (dob) => {
//         const today = new Date();
//         const birthDate = new Date(dob);
//         let age = today.getFullYear() - birthDate.getFullYear();
//         const monthDifference = today.getMonth() - birthDate.getMonth();
//         if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
//             age--;
//         }
//         return age;
//     };

//     const openTermsPopup = () => {
//         setShowTermsPopup(true);
//     };

//     const closeTermsPopup = () => {
//         setShowTermsPopup(false);
//     };

//     return (
//         <div className="flex justify-center items-center min-h-70 bg-gray-100">
//              <LanguageSwitcher />
//              {/* left column register */}
//             <div className="bg-white p- border border-red-500 w max-w-md  rounded-lg shadow-lg">
//                 <button onClick={() => navigate('/')} className="mb-4 text-indigo-600 ">
//                     Back to Home
//                 </button>
//                 <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Create OFPS Account</h2>
//                 <form onSubmit={handleSubmit} className="space-y-8">
//                     {/* Image Upload */}
//                     <div
//                         className="relative w-32 h-32 bg-gray-300 rounded-full overflow-hidden flex items-center justify-center cursor-pointer mx-auto"
//                         onClick={() => document.getElementById('imageUpload').click()}
//                     >
//                         {image ? (
//                             <img src={image} alt="Profile" className="w-full h-full object-cover" />
//                         ) : (
//                             <span className="text-gray-600">{t('pic')}</span>
//                         )}
//                         <input
//                             type="file"
//                             id="imageUpload"
//                             accept="image/png, image/jpeg"
//                             className="absolute inset-0 opacity-0 cursor-pointer"
//                             onChange={handleImageChange}
//                         />
//                     </div>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         {/* Form Fields */}
//                         <div>
//                             <label>{t('name')} *</label>
//                             <input
//                                 type="text"
//                                 value={name}
//                                 onChange={(e) => setName(e.target.value)}
//                                 required
//                                 placeholder="Name"
//                                 className="w-full px-10 py-3 text-gray-500 bg-transparent border border-gray-300 rounded-lg shadow-sm outline-none focus:border-indigo-600"
//                             />
//                             <FaUser className="absolute top-4 left-3 text-gray-400" />
//                         </div>

//                         <div>
//                             <label>{t('phn')} *</label>
//                             <input
//                                 type="tel"
//                                 value={phone}
//                                 onChange={handlePhoneChange}
//                                 required
//                                 placeholder="Phone Number"
//                                 className={`w-full px-10 py-3 text-gray-500 bg-transparent border ${phoneError ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm outline-none focus:border-indigo-600`}
//                             />
//                             {phoneError && <p className="text-red-500 text-sm mt-1">{phoneError}</p>}
//                         </div>

//                         <div>
//                             <label>{t('email')}*</label>
//                             <input
//                                 type="email"
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                                 required
//                                 placeholder="Email"
//                                 className="w-full px-10 py-3 text-gray-500 bg-transparent border border-gray-300 rounded-lg shadow-sm outline-none focus:border-indigo-600"
//                             />
//                         </div>

//                         <div>
//                             <label>{t('Password')}*</label>
//                             <input
//                                 type="password"
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                                 required
//                                 placeholder="Password"
//                                 className="w-full px-10 py-3 text-gray-500 bg-transparent border border-gray-300 rounded-lg shadow-sm outline-none focus:border-indigo-600"
//                             />
//                         </div>

//                         <div>
//                             <label>{t('cPass')}*</label>
//                             <input
//                                 type="password"
//                                 value={confirmPassword}
//                                 onChange={(e) => setConfirmPassword(e.target.value)}
//                                 required
//                                 placeholder="Confirm Password"
//                                 className="w-full px-10 py-3 text-gray-500 bg-transparent border border-gray-300 rounded-lg shadow-sm outline-none focus:border-indigo-600"
//                             />
//                         </div>

//                         <div>
//                             <label>{t('Address')} *</label>
//                             <input
//                                 type="text"
//                                 value={address}
//                                 onChange={(e) => setAddress(e.target.value)}
//                                 required
//                                 placeholder="Address"
//                                 className="w-full px-10 py-3 text-gray-500 bg-transparent border border-gray-300 rounded-lg shadow-sm outline-none focus:border-indigo-600"
//                             />
//                         </div>

//                         <div>
//                             <label> {t('idType')}*</label>
//                             <select
//                                 value={identificationType}
//                                 onChange={(e) => setIdentificationType(e.target.value)}
//                                 required
//                                 className="w-full px-10 py-3 text-gray-500 bg-transparent border border-gray-300 rounded-lg shadow-sm outline-none focus:border-indigo-600"
//                             >
//                                 <option value="">Select Identification Type</option>
//                                 {identificationTypes.map((type) => (
//                                     <option key={type} value={type}>{type}</option>
//                                 ))}
//                             </select>
//                             <FaExclamationCircle className="absolute top-4 left-3 text-gray-400" />
//                         </div>

//                         <div>
//                             <label>{t('idnum')} *</label>
//                             <div className="relative">
//                                 <input
//                                     type="text"
//                                     value={idNumber}
//                                     onChange={(e) => {
//                                         setIdNumber(e.target.value);
//                                         if (validateIdNumber(e.target.value)) {
//                                             setIdNumberError('');
//                                         } else {
//                                             setIdNumberError(`Invalid ${identificationType} Number`);
//                                         }
//                                     }}
//                                     required
//                                     placeholder="ID Number"
//                                     className={`w-full px-10 py-3 text-gray-500 bg-transparent border ${idNumberError ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm outline-none focus:border-indigo-600`}
//                                 />
//                                 <FaIdCard className="absolute top-4 left-3 text-gray-400" />
//                                 {idNumberError && <p className="text-red-500 text-sm mt-1">{idNumberError}</p>}
//                             </div>
//                         </div>

//                         <div>
//                             <label>{t('dob')} * </label>
//                             <div className="relative">
//                                 <input
//                                     type="date"
//                                     id="dob"
//                                     value={dob}
//                                     onChange={handleDOBChange}
//                                     required
//                                     className="w-full px-10 py-3 text-gray-500 bg-transparent border border-gray-300 rounded-lg shadow-sm outline-none focus:border-indigo-600"
//                                 />
//                                 <FaCalendarAlt className="absolute top-4 left-3 text-gray-400" />
//                             </div>
//                         </div>

//                         <div>
//                             <label>{t('Gender')} *</label>
//                             <div className="relative">
//                                 <select
//                                     value={gender}
//                                     onChange={(e) => setGender(e.target.value)}
//                                     required
//                                     className="w-full px-10 py-3 text-gray-500 bg-transparent border border-gray-300 rounded-lg shadow-sm outline-none focus:border-indigo-600"
//                                 >
//                                     <option value="">Select Gender</option>
//                                     {genders.map((gender) => (
//                                         <option key={gender} value={gender}>{gender}</option>
//                                     ))}
//                                 </select>
//                                 <FaExclamationCircle className="absolute top-4 left-3 text-gray-400" />
//                             </div>
//                         </div>

//                         <div>
//                             <label>{t('relType')} *</label>
//                             <div className="relative">
//                                 <select
//                                     value={relationType}
//                                     onChange={(e) => setRelationType(e.target.value)}
//                                     required
//                                     className="w-full px-10 py-3 text-gray-500 bg-transparent border border-gray-300 rounded-lg shadow-sm outline-none focus:border-indigo-600"
//                                 >
//                                     <option value="">Select Relation Type</option>
//                                     {relationTypes.map((type) => (
//                                         <option key={type} value={type}>{type}</option>
//                                     ))}
//                                 </select>
//                                 <FaExclamationCircle className="absolute top-4 left-3 text-gray-400" />
//                             </div>
//                         </div>

//                         <div>
//                             <label>{t('relName')} *</label>
//                             <div className="relative">
//                                 <input
//                                     type="text"
//                                     value={relativeName}
//                                     onChange={(e) => setRelativeName(e.target.value)}
//                                     required
//                                     placeholder="Relative's Name"
//                                     className="w-full px-10 py-3 text-gray-500 bg-transparent border border-gray-300 rounded-lg shadow-sm outline-none focus:border-indigo-600"
//                                 />
//                                 <FaExclamationCircle className="absolute top-4 left-3 text-gray-400" />
//                             </div>
//                         </div>
//                     </div>

//                     <div className="flex items-center mb-4">
//                         <input
//                             type="checkbox"
//                             id="terms"
//                             checked={termsAccepted}
//                             onChange={(e) => setTermsAccepted(e.target.checked)}
//                             className="mr-2"
//                         />
//                         <label htmlFor="terms" className="text-gray-600">
//                             {t('term2')} <button type="button" onClick={openTermsPopup} className="text-indigo-600 underline">{t('term3')}</button>
//                         </label>
//                     </div>

//                     <button
//                         type="submit"
//                         className="w-40 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none"
//                     >
//                         {t('reg')}
//                     </button>
//                 </form>

//                 {/* Terms and Conditions Popup */}
//                 {showTermsPopup && (
//                     <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
//                         <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto">
//                             <h3 className="text-xl font-bold mb-4">Terms and Conditions *</h3>
//                             <p className="text-gray-700 mb-4">{t('term1')}
//                               </p>
//                             <button onClick={closeTermsPopup} className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
//                                 Close
//                             </button>
//                         </div>
//                     </div>
//                 )}

//                 <ToastContainer />
//             </div>

//             {/* Right Column: Important Notes */}
//             <div className="hidden md:flex md:w-1/2 bg-gray-100 ml-10 p-8 flex-col items-center justify-center border border-indigo-600 rounded-lg">
//                 <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
//                     <FaInfoCircle className="text-indigo-600 mr-2 " />
//                     POINTS TO REMEMBER
//                 </h2>
//                 <strong>
//                     <p className="text-gray-600 mb-4 text-center">
//                         Before proceeding with the registration, please make sure to review the following important points:
//                     </p>
//                     <ul className="list-disc list-inside mb-4 text-gray-600">
//                         <li className="flex items-center">👉 Ensure you have a valid email address as it will be used for communication.</li>
//                         <li className="flex items-center">👉 Upload a clear and recent photograph for identification purposes.</li>
//                         <li className="flex items-center">👉 All fields marked with * are Mandatory and need to be filled accurately.</li>
//                         <li className="flex items-center">👉 The Online FIR Processing System (OFPS) is available for registering complaints online.</li>
//                         <li className="flex items-center">👉 For any queries regarding the FIR processing system, refer to our official website or contact support.</li>
//                         <li className="flex items-center">👉 Make sure to read and understand the Terms and Conditions before completing the registration.</li>
//                     </ul>
//                     <h1 className="text-gray-600 text-center">⚠️ False complaints are subject to prosecution under IPC.</h1>
//                 </strong>
//             </div>
//         </div>
//     );
// };

// export default SignUp;


import React, { useState, useEffect } from 'react';
import {
    FaUser, FaPhone, FaEnvelope, FaLock, FaKey,
    FaMapMarkerAlt, FaIdCard, FaCalendarAlt,
    FaInfoCircle, FaExclamationCircle
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2';
import 'react-toastify/dist/ReactToastify.css';
import i18n from '../i18n';
import LanguageSwitcher from '../LanguageSwitcher';
import { useTranslation } from 'react-i18next';

const SignUp = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [address, setAddress] = useState('');
    const [identificationType, setIdentificationType] = useState('');
    const [idNumber, setIdNumber] = useState('');
    const [dob, setDob] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [relationType, setRelationType] = useState('');
    const [relativeName, setRelativeName] = useState('');
    const [image, setImage] = useState(null);
    const [error, setError] = useState('');
    const [showAgeAlert, setShowAgeAlert] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [showTermsPopup, setShowTermsPopup] = useState(false);
    const [idNumberError, setIdNumberError] = useState('');
    const [phoneError, setPhoneError] = useState('');

    const navigate = useNavigate();

    const handleChangeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    const { t } = useTranslation();

    const identificationTypes = ['Aadhar', 'Passport'];
    const relationTypes = ['Mother', 'Father', 'Spouse', 'Guardian'];
    const genders = ['Male', 'Female', 'Transgender', 'Other'];

    // useEffect(() => {
    //     const today = new Date().toISOString().split('T')[0];
    //     setMaxDate(today);
    // }, []);

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        const dobInput = document.getElementById('dob');
        if (dobInput) {
            dobInput.setAttribute('max', today);
        }
    }, []);


    const setMaxDate = (date) => {
        document.getElementById('dob').setAttribute('max', date);
    };

    const handleDOBChange = (e) => {
        const dobValue = e.target.value;
        setDob(dobValue);
        const calculatedAge = calculateAge(dobValue);
        setAge(calculatedAge);
        setShowAgeAlert(calculatedAge < 18);
    };

    const handlePhoneChange = (e) => {
        const phoneValue = e.target.value.replace(/\D/g, '');
        setPhone(phoneValue);
        setPhoneError(validatePhone(phoneValue) ? '' : 'Phone number should be 10 digits');
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
            setImage(URL.createObjectURL(file));
        } else {
            toast.error('Please upload a valid image (JPEG or PNG)');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!termsAccepted) {
            toast.error('You must accept the Terms and Conditions');
            return;
        }

        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        if (!image) {
            toast.error('Please upload an image');
            return;
        }

        if (age < 18) {
            toast.error('You must be 18 years or older to register');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('phone', phone);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('address', address);
        formData.append('identificationType', identificationType);
        formData.append('idNumber', idNumber);
        formData.append('dob', dob);
        formData.append('gender', gender);
        formData.append('relationType', relationType);
        formData.append('relativeName', relativeName);
        formData.append('image', document.getElementById('imageUpload').files[0]);

        try {
            const response = await fetch('http://localhost:9998/complainant', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                Swal.fire({
                    title: 'Registration Successful!',
                    text: 'You can now log in to your account.',
                    icon: 'success',
                    confirmButtonText: 'Okay'
                }).then(() => navigate('/login'));
            } else {
                const errorData = await response.json();
                toast.error(errorData.message || 'Registration failed');
            }
        } catch (error) {
            toast.error('An error occurred');
        }
    };

    const validatePhone = (phone) => {
        const regex = /^[0-9]{10}$/;
        return regex.test(phone);
    };

    // const validateIdNumber = (idNumber) => {
    //     if (identificationType === 'Aadhar') {
    //         return /^\d{12}$/.test(idNumber);
    //     } else if (identificationType === 'Passport') {
    //         return /^[A-Z0-9]{6,8}$/.test(idNumber);
    //     }
    //     return false;
    // };

    const validateIdNumber = (idNumber) => {
        if (identificationType === 'Aadhar') {
            return /^\d{12}$/.test(idNumber); // 12 digits for Aadhar
        } else if (identificationType === 'Passport') {
            // At least one uppercase letter, 6-8 alphanumeric characters
            return /^(?=.*[A-Z])[A-Za-z0-9]{6,8}$/.test(idNumber);
        }
        return false;
    };
    

    const calculateAge = (dob) => {
        const today = new Date();
        const birthDate = new Date(dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const openTermsPopup = () => {
        setShowTermsPopup(true);
    };

    const closeTermsPopup = () => {
        setShowTermsPopup(false);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
                    <div className="absolute top-4 left-4">
    <button
        onClick={() => navigate('/')}
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
    >
        Back to Home
    </button>
</div>

            <LanguageSwitcher />
   

            <div className="flex flex-col md:flex-row w-full max-w-6xl space-x-4">
                {/* Left Column: Sign-Up Form */}
                <div className="bg-white p-6 border border-gray-300 rounded-lg shadow-lg flex-1 min-w-0">
                    {/* <button onClick={() => navigate('/')} className="mb-4 text-indigo-600">
                        Back to Home
                    </button> */}
                    <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Create OFPS Account</h2>
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Image Upload */}
                        <div
                            className="relative w-32 h-32 bg-gray-300 rounded-full overflow-hidden flex items-center justify-center cursor-pointer mx-auto"
                            onClick={() => document.getElementById('imageUpload').click()}
                        >
                            {image ? (
                                <img src={image} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-gray-600">{t('pic')}</span>
                            )}
                            <input
                                type="file"
                                id="imageUpload"
                                accept="image/png, image/jpeg"
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                onChange={handleImageChange}
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Form Fields */}
                            <div>
                                <label>{t('name')} *</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    placeholder="Name"
                                    className="w-full px-10 py-3 text-gray-500 bg-transparent border border-gray-300 rounded-lg shadow-sm outline-none focus:border-indigo-600"
                                />
                                <FaUser className="absolute top-4 left-3 text-gray-400" />
                            </div>
                            {/* Other form fields here... */}


                            <div>
                                <label>{t('phn')} *</label>                            <input
                                    type="tel"
                                    value={phone}
                                    onChange={handlePhoneChange}
                                    required
                                    placeholder="Phone Number"
                                    className={`w-full px-10 py-3 text-gray-500 bg-transparent border ${phoneError ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm outline-none focus:border-indigo-600`}
                                />
                                {phoneError && <p className="text-red-500 text-sm mt-1">{phoneError}</p>}
                            </div>

                            <div>
                                <label>{t('email')}*</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="Email"
                                    className="w-full px-10 py-3 text-gray-500 bg-transparent border border-gray-300 rounded-lg shadow-sm outline-none focus:border-indigo-600"
                                />
                            </div>

                            <div>
                                <label>{t('Password')}*</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder="Password"
                                    className="w-full px-10 py-3 text-gray-500 bg-transparent border border-gray-300 rounded-lg shadow-sm outline-none focus:border-indigo-600"
                                />
                            </div>

                            <div>
                                <label>{t('cPass')}*</label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    placeholder="Confirm Password"
                                    className="w-full px-10 py-3 text-gray-500 bg-transparent border border-gray-300 rounded-lg shadow-sm outline-none focus:border-indigo-600"
                                />
                            </div>

                            <div>
                                <label>{t('Address')} *</label>
                                <input
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    required
                                    placeholder="Address"
                                    className="w-full px-10 py-3 text-gray-500 bg-transparent border border-gray-300 rounded-lg shadow-sm outline-none focus:border-indigo-600"
                                />
                            </div>

                            <div>
                                <label> {t('idType')}*</label>
                                <select
                                    value={identificationType}
                                    onChange={(e) => setIdentificationType(e.target.value)}
                                    required
                                    className="w-full px-10 py-3 text-gray-500 bg-transparent border border-gray-300 rounded-lg shadow-sm outline-none focus:border-indigo-600"
                                >
                                    <option value="">Select Identification Type</option>
                                    {identificationTypes.map((type) => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                                <FaExclamationCircle className="absolute top-4 left-3 text-gray-400" />
                            </div>

                            <div>
                                <label>{t('idnum')} *</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={idNumber}
                                        onChange={(e) => {
                                            setIdNumber(e.target.value);
                                            if (validateIdNumber(e.target.value)) {
                                                setIdNumberError('');
                                            } else {
                                                setIdNumberError(`Invalid ${identificationType} Number`);
                                            }
                                        }}
                                        required
                                        placeholder="ID Number"
                                        className={`w-full px-10 py-3 text-gray-500 bg-transparent border ${idNumberError ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm outline-none focus:border-indigo-600`}
                                    />
                                    <FaIdCard className="absolute top-4 left-3 text-gray-400" />
                                    {idNumberError && <p className="text-red-500 text-sm mt-1">{idNumberError}</p>}
                                </div>
                            </div>

                            <div>
                                <label>{t('dob')} * </label>
                                <div className="relative">
                                    <input
                                        type="date"
                                        id="dob"
                                        value={dob}
                                        onChange={handleDOBChange}
                                        required
                                        className="w-full px-10 py-3 text-gray-500 bg-transparent border border-gray-300 rounded-lg shadow-sm outline-none focus:border-indigo-600"
                                    />
                                    <FaCalendarAlt className="absolute top-4 left-3 text-gray-400" />
                                </div>
                            </div>

                            <div>
                                <label>{t('Gender')} *</label>
                                <div className="relative">
                                    <select
                                        value={gender}
                                        onChange={(e) => setGender(e.target.value)}
                                        required
                                        className="w-full px-10 py-3 text-gray-500 bg-transparent border border-gray-300 rounded-lg shadow-sm outline-none focus:border-indigo-600"
                                    >
                                        <option value="">Select Gender</option>
                                        {genders.map((gender) => (
                                            <option key={gender} value={gender}>{gender}</option>
                                        ))}
                                    </select>
                                    <FaExclamationCircle className="absolute top-4 left-3 text-gray-400" />
                                </div>
                            </div>

                            <div>
                                <label>{t('relType')} *</label>
                                <div className="relative">
                                    <select
                                        value={relationType}
                                        onChange={(e) => setRelationType(e.target.value)}
                                        required
                                        className="w-full px-10 py-3 text-gray-500 bg-transparent border border-gray-300 rounded-lg shadow-sm outline-none focus:border-indigo-600"
                                    >
                                        <option value="">Select Relation Type</option>
                                        {relationTypes.map((type) => (
                                            <option key={type} value={type}>{type}</option>
                                        ))}
                                    </select>
                                    <FaExclamationCircle className="absolute top-4 left-3 text-gray-400" />
                                </div>
                            </div>


                            <div>
                                <label>{t('relName')} *</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={relativeName}
                                        onChange={(e) => setRelativeName(e.target.value)}
                                        required
                                        placeholder="Relative's Name"
                                        className="w-full px-10 py-3 text-gray-500 bg-transparent border border-gray-300 rounded-lg shadow-sm outline-none focus:border-indigo-600"
                                    />
                                    <FaExclamationCircle className="absolute top-4 left-3 text-gray-400" />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center mb-4">
                            <input
                                type="checkbox"
                                id="terms"
                                checked={termsAccepted}
                                onChange={(e) => setTermsAccepted(e.target.checked)}
                                className="mr-2"
                            />
                            <label htmlFor="terms" className="text-gray-600">
                                {t('term2')} <button type="button" onClick={openTermsPopup} className="text-indigo-600 underline">{t('term3')}</button>
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="w-40 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none"
                        >
                            {t('reg')}
                        </button>
                    </form>

                    {/* Terms and Conditions Popup */}
                    {showTermsPopup && (
                        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto">
                                <h3 className="text-xl font-bold mb-4">Terms and Conditions *</h3>
                                <p className="text-gray-700 mb-4">{t('term1')}</p>
                                <button onClick={closeTermsPopup} className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                                    Close
                                </button>
                            </div>
                        </div>
                    )}

                    <ToastContainer />
                </div>

                {/* Right Column: Important Notes */}
                {/* <div className="hidden md:flex bg-gray-100 border border-indigo-600 rounded-lg flex-1 min-w-0 h-full"> */}
                {/* <div className="hidden md:flex md:w-1/2 bg-gray-100 border border-indigo-600 rounded-lg flex-1 min-w-2 h-full my-auto mx-10 p-8">

                    <div className="p-8 flex flex-col items-center justify-center w-full h-full">
                        <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
                            <FaInfoCircle className="text-indigo-600 mr-2 " />
                            POINTS TO REMEMBER
                        </h2>
                        <strong>
                            <p className="text-gray-600 mb-6 text-center">
                                Before proceeding with the registration, please make sure to review the following important points:
                            </p>
                            <ul className="list-disc list-inside mb-4 text-gray-600">
                                <li className="flex items-center">👉 Ensure you have a valid email address as it will be used for communication.</li>
                                <li className="flex items-center">👉 Upload a clear and recent photograph for identification purposes.</li>
                                <li className="flex items-center">👉 All fields marked with * are Mandatory and need to be filled accurately.</li>
                                <li className="flex items-center">👉 The Online FIR Processing System (OFPS) is available for registering complaints online.</li>
                                <li className="flex items-center">👉 For any queries regarding the FIR processing system, refer to our official website or contact support.</li>
                                <li className="flex items-center">👉 Make sure to read and understand the Terms and Conditions before completing the registration.</li>
                            </ul>
                            <h1 className="text-gray-600 text-center">⚠️ False complaints are subject to prosecution under IPC.</h1>
                        </strong>
                    </div>
                </div> */}

<div className="hidden md:flex md:w-3/5 bg-gray-100 border border-indigo-600 rounded-lg flex-1 min-w-0 h-full my-auto mx-10 flex-col justify-start p-8">
<center>  <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
        <FaInfoCircle className="text-indigo-600 mr-4" />
        {t('ptr')}
    </h2></center>
    <strong>
        <p className="text-gray-600 mb-4 text-center">
           {t('imp')}  </p>
        <ul className="list-disc list-inside mb-4 text-gray-600">
            <li className="flex items-center">{t('pt1')}</li>
            <br></br><li className="flex items-center">{t('pt2')}</li>
            <br></br> <li className="flex items-center">{t('pt3')}</li>
            <br></br> <li className="flex items-center">{t('pt4')}</li>
            <br></br> <li className="flex items-center">{t('pt7')}</li>
            <br></br> <li className="flex items-center">{t('pt5')}</li>
        </ul>
        <h1 className="text-red-500 text-center">{t('pt6')}</h1>
    </strong>
</div>

                
            </div>
        </div>
    );
};

export default SignUp;
