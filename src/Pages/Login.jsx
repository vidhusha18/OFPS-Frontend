// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FaEnvelope, FaLock, FaSync, FaUserShield } from 'react-icons/fa';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const CAPTCHA_DATA = {
//     'https://i.sstatic.net/S4SAc.png': 'wjr4s2',
//     'https://miro.medium.com/v2/resize:fit:1024/0*obnHri9w__4Cmhbj.jpg': 'smwm',
//     'https://i.sstatic.net/iEH93.png': '3bIHDUS',
//     'https://mathieularose.com/decoding-captchas/wdgvze-3.png': 'wdyvze',
//     'https://parzelsec.de/content/images/2019/04/threshhold-1.png':'JY Pdf',
//     'https://miro.medium.com/v2/resize:fit:600/1*MHqIWdansPvRMEmUK2KNPw.png':'W6 8HP',
//     'https://upload.wikimedia.org/wikipedia/commons/6/6a/5k3tC40A_-_CAPTCHA_images.png': '5k3tC40A'
// };

// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [userType, setUserType] = useState('');
//     const [error, setError] = useState('');
//     const [captchaImage, setCaptchaImage] = useState('');
//     const [captchaAnswer, setCaptchaAnswer] = useState('');
//     const [userCaptchaAnswer, setUserCaptchaAnswer] = useState('');
//     const [captchaVisible, setCaptchaVisible] = useState(false);
//     const [showAdminForm, setShowAdminForm] = useState(false);
//     const navigate = useNavigate();

//     const selectRandomCaptcha = () => {
//         const captchaKeys = Object.keys(CAPTCHA_DATA);
//         const randomIndex = Math.floor(Math.random() * captchaKeys.length);
//         const selectedCaptchaUrl = captchaKeys[randomIndex];
//         setCaptchaImage(selectedCaptchaUrl);
//         setCaptchaAnswer(CAPTCHA_DATA[selectedCaptchaUrl]);
//     };

//     useEffect(() => {
//         if (captchaVisible) {
//             selectRandomCaptcha();
//         }
//     }, [captchaVisible]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (showAdminForm) {
//             if (email === 'admin' && password === 'admin') {
//                 toast.success('Admin logged in successfully!'); // Fixed here
//                 navigate('/adminDashboard');
//                 return;
//             } else {
//                 toast.error('Invalid admin credentials');
//                 return;
//             }
//         }

//         if (!userType || !email || !password) {
//             toast.error('Please fill in all required fields');
//             return;
//         }

//         if (captchaVisible && userCaptchaAnswer !== captchaAnswer) {
//             toast.error('CAPTCHA verification failed');
//             return;
//         }

//         try {
//             const endpoint = userType === 'complainant' ? '/complainant/login' : '/police/login';
//             const response = await fetch(`http://localhost:9998${endpoint}`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ email, password }),
//             });

//             if (response.ok) {
//                 const result = await response.json();
//                 sessionStorage.setItem("ComplainantId", result.complainantId);
//                 let dashboardPath = '';

//                 if (userType === 'complainant') {
//                     dashboardPath = '/complainantDashboard';
//                 } else if (userType === 'police') {
//                     dashboardPath = '/policeDashboard';
//                 }

//                 if (dashboardPath) {
//                     toast.success('Login successful!');
//                     navigate(dashboardPath);
//                 } else {
//                     toast.error('Dashboard path not determined');
//                 }
//             } else {
//                 toast.error('Invalid credentials');
//             }
//         } catch (error) {
//             toast.error('An error occurred');
//         }
//     };

//     useEffect(() => {
//         if (userType === 'complainant' && email && password) {
//             setCaptchaVisible(true);
//         } else {
//             setCaptchaVisible(false);
//         }
//     }, [userType, email, password]);

//     useEffect(() => {
//         if (email && password) {
//             sessionStorage.setItem('email', email);
//             sessionStorage.setItem('password', password);
//         }
//     }, [email, password]);

//     useEffect(() => {
//         const storedEmail = sessionStorage.getItem('email');
//         const storedPassword = sessionStorage.getItem('password');
//         if (storedEmail && storedPassword) {
//             setEmail(storedEmail);
//             setPassword(storedPassword);
//         }
//     }, []);

//     return (
//         <main>
//             <center>
//             <br /><br /><br /><br />
//             <div className="max-w-sm w-full text-gray-600 bg-white p-6 rounded-lg shadow-lg">
//                 <div className="text-center">
//                     <img src="https://www.shareicon.net/data/512x512/2015/11/12/671182_people_512x512.png" width={140} className="mx-auto mb-4" alt="Logo" />
//                     <div className="mt-2 space-y-2">
//                         <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
//                             {showAdminForm ? 'Admin Login' : 'Log in to your account'}
//                         </h3>
//                     </div>
//                 </div>
//                 <form onSubmit={handleSubmit} className="mt-8 space-y-4">
//                     {showAdminForm ? (
//                         <>
//                             <div className="relative">
//                                 <input
//                                     type="text"
//                                     value={email}
//                                     onChange={(e) => setEmail(e.target.value)}
//                                     required
//                                     placeholder="Username"
//                                     className="w-full px-10 py-2 text-gray-500 bg-transparent border border-gray-300 rounded-lg shadow-sm outline-none focus:border-indigo-600"
//                                 />
//                                 <FaUserShield className="absolute top-3 left-3 text-gray-400" />
//                             </div>
//                             <div className="relative">
//                                 <input
//                                     type="password"
//                                     value={password}
//                                     onChange={(e) => setPassword(e.target.value)}
//                                     required
//                                     placeholder="Password"
//                                     className="w-full px-10 py-2 text-gray-500 bg-transparent border border-gray-300 rounded-lg shadow-sm outline-none focus:border-indigo-600"
//                                 />
//                                 <FaLock className="absolute top-3 left-3 text-gray-400" />
//                             </div>
//                         </>
//                     ) : (
//                         <>
//                             <div className="relative">
//                                 <select
//                                     value={userType}
//                                     onChange={(e) => setUserType(e.target.value)}
//                                     className="w-full px-4 py-2 text-gray-500 bg-transparent border border-gray-300 rounded-lg shadow-sm outline-none focus:border-indigo-600"
//                                 >
//                                     <option value="" disabled>Select user type</option>
//                                     <option value="complainant">Complainant</option>
//                                     <option value="police">Police Officer</option>
//                                 </select>
//                             </div>
//                             <div className="relative">
//                                 <input
//                                     type="email"
//                                     value={email}
//                                     onChange={(e) => setEmail(e.target.value)}
//                                     required
//                                     placeholder="Email"
//                                     className="w-full px-10 py-2 text-gray-500 bg-transparent border border-gray-300 rounded-lg shadow-sm outline-none focus:border-indigo-600"
//                                 />
//                                 <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
//                             </div>
//                             <div className="relative">
//                                 <input
//                                     type="password"
//                                     value={password}
//                                     onChange={(e) => setPassword(e.target.value)}
//                                     required
//                                     placeholder="Password"
//                                     className="w-full px-10 py-2 text-gray-500 bg-transparent border border-gray-300 rounded-lg shadow-sm outline-none focus:border-indigo-600"
//                                 />
//                                 <FaLock className="absolute top-3 left-3 text-gray-400" />
//                             </div>
//                             {captchaVisible && (
//                                 <>
//                                     <div className="flex items-center mb-2 space-x-2">
//                                         <img src={captchaImage} alt="CAPTCHA" className="w-32 h-12 object-cover" />
//                                         <button
//                                             type="button"
//                                             onClick={selectRandomCaptcha}
//                                             className="p-2 text-white bg-indigo-600 hover:bg-indigo-500 rounded-full"
//                                             aria-label="Refresh CAPTCHA"
//                                         >
//                                             <FaSync className="w-5 h-5" />
//                                         </button>
//                                     </div>
//                                     <div className="relative">
//                                         <input
//                                             type="text"
//                                             value={userCaptchaAnswer}
//                                             onChange={(e) => setUserCaptchaAnswer(e.target.value)}
//                                             required
//                                             placeholder="Enter CAPTCHA"
//                                             className="w-full px-4 py-2 text-gray-500 bg-transparent border border-gray-300 rounded-lg shadow-sm outline-none focus:border-indigo-600"
//                                         />
//                                     </div>
//                                 </>
//                             )}
//                         </>
//                     )}
//                     {error && <p className="text-red-500 text-center">{error}</p>}
//                     <button
//                         type="submit"
//                         className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
//                     >
//                         {showAdminForm ? 'Admin Login' : 'Login'}
//                     </button>
//                     {!showAdminForm && (
//                         <div className="text-center mt-4">
//                             <p>Don't have an account? <a href="/Register" className="font-medium text-indigo-600 hover:text-indigo-500">Sign up</a></p>
//                         </div>
//                     )}
//                 </form>
//                 <div className="mt-4 flex justify-center">
//                     <button
//                         onClick={() => setShowAdminForm(!showAdminForm)}
//                         className="flex items-center text-indigo-600 hover:text-indigo-500 font-medium"
//                     >
//                         <FaUserShield className="w-6 h-6 mr-2" />
//                         {showAdminForm ? 'Switch to User Login' : 'Admin Login'}
//                     </button>
//                 </div>
//                 <ToastContainer />
//             </div>
//             </center>
//         </main>
//     );
// };

// export default Login;



import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaSync, FaUserShield } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2'; // Import SweetAlert
import 'react-toastify/dist/ReactToastify.css';

const CAPTCHA_DATA = {
    'https://i.sstatic.net/S4SAc.png': 'wjr4s2',
    'https://miro.medium.com/v2/resize:fit:1024/0*obnHri9w__4Cmhbj.jpg': 'smwm',
    'https://i.sstatic.net/iEH93.png': '3bIHDUS',
    'https://mathieularose.com/decoding-captchas/wdgvze-3.png': 'wdyvze',
    'https://parzelsec.de/content/images/2019/04/threshhold-1.png':'JY Pdf',
    'https://miro.medium.com/v2/resize:fit:600/1*MHqIWdansPvRMEmUK2KNPw.png':'W6 8HP',
    'https://upload.wikimedia.org/wikipedia/commons/6/6a/5k3tC40A_-_CAPTCHA_images.png': '5k3tC40A'
};

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('');
    const [captchaImage, setCaptchaImage] = useState('');
    const [captchaAnswer, setCaptchaAnswer] = useState('');
    const [userCaptchaAnswer, setUserCaptchaAnswer] = useState('');
    const [captchaVisible, setCaptchaVisible] = useState(false);
    const [showAdminForm, setShowAdminForm] = useState(false);
    const navigate = useNavigate();

    const selectRandomCaptcha = () => {
        const captchaKeys = Object.keys(CAPTCHA_DATA);
        const randomIndex = Math.floor(Math.random() * captchaKeys.length);
        const selectedCaptchaUrl = captchaKeys[randomIndex];
        setCaptchaImage(selectedCaptchaUrl);
        setCaptchaAnswer(CAPTCHA_DATA[selectedCaptchaUrl]);
    };

    useEffect(() => {
        if (captchaVisible) {
            selectRandomCaptcha();
        }
    }, [captchaVisible]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (showAdminForm) {
            if (email === 'admin' && password === 'admin') {
                Swal.fire('Success!', 'Admin logged in successfully!', 'success');
                navigate('/adminDashboard');
                return;
            } else {
                Swal.fire('Error!', 'Invalid admin credentials', 'error');
                return;
            }
        }

        if (!userType || !email || !password) {
            Swal.fire('Error!', 'Please fill in all required fields', 'error');
            return;
        }

        if (captchaVisible && userCaptchaAnswer !== captchaAnswer) {
            Swal.fire('Error!', 'CAPTCHA verification failed', 'error');
            return;
        }

        try {
            const endpoint = userType === 'complainant' ? '/complainant/login' : '/police/login';
            const response = await fetch(`http://localhost:9998${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const result = await response.json();
                sessionStorage.setItem("ComplainantId", result.complainantId);
                let dashboardPath = '';

                if (userType === 'complainant') {
                    dashboardPath = '/complainantDashboard';
                } else if (userType === 'police') {
                    dashboardPath = '/policeDashboard';
                }

                if (dashboardPath) {
                    Swal.fire('Success!', 'Login successful!', 'success');
                    navigate(dashboardPath);
                } else {
                    Swal.fire('Error!', 'Dashboard path not determined', 'error');
                }
            } else {
                Swal.fire('Error!', 'Invalid credentials', 'error');
            }
        } catch (error) {
            Swal.fire('Error!', 'An error occurred', 'error');
        }
    };

    useEffect(() => {
        if (userType === 'complainant' && email && password) {
            setCaptchaVisible(true);
        } else {
            setCaptchaVisible(false);
        }
    }, [userType, email, password]);

    useEffect(() => {
        if (email && password) {
            sessionStorage.setItem('email', email);
            sessionStorage.setItem('password', password);
        }
    }, [email, password]);

    useEffect(() => {
        const storedEmail = sessionStorage.getItem('email');
        const storedPassword = sessionStorage.getItem('password');
        if (storedEmail && storedPassword) {
            setEmail(storedEmail);
            setPassword(storedPassword);
        }
    }, []);

    return (
        <main>
            <center>
                <br /><br /><br /><br />

                <div className="max-w-sm w-full text-gray-600 bg-white p-6 rounded-lg shadow-lg">
                <div className="absolute top-4 left-4">
    <button
        onClick={() => navigate('/')}
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
    >
        Back to Home
    </button>
</div>
                    <div className="text-center">
                        <img src="https://www.shareicon.net/data/512x512/2015/11/12/671182_people_512x512.png" width={140} className="mx-auto mb-4" alt="Logo" />
                        <div className="mt-2 space-y-2">
                            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
                                {showAdminForm ? 'Admin Login' : 'Log in to your account'}
                            </h3>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                        {showAdminForm ? (
                            <>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        placeholder="Username"
                                        className="w-full px-10 py-2 text-gray-500 bg-transparent border border-gray-300 rounded-lg shadow-sm outline-none focus:border-indigo-600"
                                    />
                                    <FaUserShield className="absolute top-3 left-3 text-gray-400" />
                                </div>
                                <div className="relative">
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        placeholder="Password"
                                        className="w-full px-10 py-2 text-gray-500 bg-transparent border border-gray-300 rounded-lg shadow-sm outline-none focus:border-indigo-600"
                                    />
                                    <FaLock className="absolute top-3 left-3 text-gray-400" />
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="relative">
                                    <select
                                        value={userType}
                                        onChange={(e) => setUserType(e.target.value)}
                                        className="w-full px-4 py-2 text-gray-500 bg-transparent border border-gray-300 rounded-lg shadow-sm outline-none focus:border-indigo-600"
                                    >
                                        <option value="" disabled>Select user type</option>
                                        <option value="complainant">Complainant</option>
                                        <option value="police">Police Officer</option>
                                    </select>
                                </div>
                                <div className="relative">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        placeholder="Email"
                                        className="w-full px-10 py-2 text-gray-500 bg-transparent border border-gray-300 rounded-lg shadow-sm outline-none focus:border-indigo-600"
                                    />
                                    <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
                                </div>
                                <div className="relative">
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        placeholder="Password"
                                        className="w-full px-10 py-2 text-gray-500 bg-transparent border border-gray-300 rounded-lg shadow-sm outline-none focus:border-indigo-600"
                                    />
                                    <FaLock className="absolute top-3 left-3 text-gray-400" />
                                </div>
                                {captchaVisible && (
                                    <>
                                        <div className="flex items-center mb-2 space-x-2">
                                            <img src={captchaImage} alt="CAPTCHA" className="w-32 h-12 object-cover" />
                                            <button
                                                type="button"
                                                onClick={selectRandomCaptcha}
                                                className="p-2 text-white bg-indigo-600 hover:bg-indigo-500 rounded-full"
                                                aria-label="Refresh CAPTCHA"
                                            >
                                                <FaSync className="w-5 h-5" />
                                            </button>
                                        </div>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                value={userCaptchaAnswer}
                                                onChange={(e) => setUserCaptchaAnswer(e.target.value)}
                                                required
                                                placeholder="Enter CAPTCHA"
                                                className="w-full px-4 py-2 text-gray-500 bg-transparent border border-gray-300 rounded-lg shadow-sm outline-none focus:border-indigo-600"
                                            />
                                        </div>
                                    </>
                                )}
                            </>
                        )}
                        <button type="submit" className="w-full px-4 py-2 text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg">
                            {showAdminForm ? 'Login' : 'Submit'}
                        </button>
                    </form>
                    <ToastContainer />
                </div>
            </center>
        </main>
    );
};

export default Login;
