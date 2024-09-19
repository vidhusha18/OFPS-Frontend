// export default () => {

//     // Replace javascript:void(0) path with your path
//     const navigation = [
//         { title: "FAQ", path: "javascript:void(0)" },
//         { title: "About Us", path: "javascript:void(0)" },
//         { title: "Contact Us", path: "javascript:void(0)" }
//     ]
    
//       return (
//         <div className="bg-blue-900 min-h-screen flex flex-col">
//               <header>
//                   <nav className="items-center pt-5 px-4 mx-auto max-w-screen-xl sm:px-8 sm:flex sm:space-x-6">
//                       <a href="javascript:void(0)">
//                           <img
//                               src="https://www.shareicon.net/data/512x512/2015/11/12/671182_people_512x512.png" 
//                               width={120} 
//                               height={50}
//                               alt="Float UI logo"
//                           />
//                       </a>
//                       <ul className="py-4 flex-1 items-center flex space-x-3 sm:space-x-6 sm:justify-end">
//                           {
//                               navigation.map((item, idx) => (
//                                   <li className="text-gray-200" key={idx}>
//                                       <a href={item.path}>{item.title}</a>
//                                   </li>
//                               ))
//                           }
//                           <li>
//                               <a href="/Login" className="flex items-center text-gray-200">
//                                   Login
//                                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
//                                       <path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd" />
//                                   </svg>
//                               </a>
//                           </li>
//                       </ul>
//                   </nav>
//               </header>
//               <section className="mt-24 mx-auto max-w-screen-xl pb-12 px-4 items-center lg:flex md:px-8">
//                   <div className="space-y-4 flex-1 sm:text-center lg:text-left">
//                       <h1 className="text-white font-bold text-4xl xl:text-5xl">
//                           Online FIR
//                            <span className="text-indigo-400"> Processing System</span>
//                       </h1>
//                       <p className="text-gray-300 max-w-xl leading-relaxed sm:mx-auto lg:ml-0">
//                           It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum
//                       </p>
//                       <div className="pt-10 items-center justify-center space-y-3 sm:space-x-6 sm:space-y-0 sm:flex lg:justify-start">
//                           <a href="/Register" className="px-7 py-3 w-full bg-white text-gray-800 text-center rounded-md shadow-md block sm:w-auto">
//                               Sign Up
//                           </a>
//                           {/* <a href="javascript:void(0)" className="px-7 py-3 w-full bg-gray-700 text-gray-200 text-center rounded-md block sm:w-auto">
//                               Try it out
//                           </a> */}
//                       </div>
//                   </div>
//                   <div className="flex-1 text-center mt-7 lg:mt-0 lg:ml-3">
//                       <img src="https://www.geekinstructor.com/wp-content/uploads/2023/01/register-fir-online-india-1024x576.jpeg" className="w-full mx-auto sm:w-10/12  lg:w-full" />
//                   </div>
//               </section>
//           </div>
//       )
//   }
  
import React, { useState } from 'react';
import Login from './Login'; // Import the Login component
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const [showLogin, setShowLogin] = useState(false);
    const navigate = useNavigate();

    const handleLoginClick = () => {
       navigate("/Login")
    };

    const handleCloseLogin = () => {
        setShowLogin(false);
    };

    return (
        <div className="relative bg-blue-900 min-h-screen flex flex-col">
            <header>
                <nav className="items-center pt-5 px-4 mx-auto max-w-screen-xl sm:px-8 sm:flex sm:space-x-6">
                    <a href="javascript:void(0)">
                        <img
                            src="https://www.shareicon.net/data/512x512/2015/11/12/671182_people_512x512.png"
                            width={120}
                            height={50}
                            alt="Float UI logo"
                        />
                    </a>
                    <ul className="py-4 flex-1 items-center flex space-x-3 sm:space-x-6 sm:justify-end">
                        {[
                            { title: "FAQ", path: "javascript:void(0)" },
                            { title: "About Us", path: "javascript:void(0)" },
                            { title: "Contact Us", path: "javascript:void(0)" }
                        ].map((item, idx) => (
                            <li className="text-gray-200" key={idx}>
                                <a href={item.path}>{item.title}</a>
                            </li>
                        ))}
                        <li>
                            <button
                                onClick={handleLoginClick}
                                className="flex items-center text-gray-200"
                            >
                                Login
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 ml-2"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </li>
                    </ul>
                </nav>
            </header>
            <section className="mt-24 mx-auto max-w-screen-xl pb-12 px-4 items-center lg:flex md:px-8">
                <div className="space-y-4 flex-1 sm:text-center lg:text-left">
                    <h1 className="text-white font-bold text-4xl xl:text-5xl">
                        Online FIR
                        <span className="text-indigo-400"> Processing System</span>
                    </h1>
                    <h1 className="text-gray-300 text-3xl max-w-xl leading-relaxed sm:mx-auto lg:ml-0">
    Digital FIRs: Because Your Time Matters!
</h1>

                    <div className="pt-10 items-center justify-center space-y-3 sm:space-x-6 sm:space-y-0 sm:flex lg:justify-start">
                        <a
                            href="/Register"
                            className="px-7 py-3 w-full bg-white text-gray-800 text-center rounded-md shadow-md block sm:w-auto"
                        >
                            Sign Up
                            
                        </a>
                    </div>
                </div>
                <div className="flex-1 text-center mt-7 lg:mt-0 lg:ml-3">
                    <img
                        src="https://www.geekinstructor.com/wp-content/uploads/2023/01/register-fir-online-india-1024x576.jpeg"
                        className="w-full mx-auto sm:w-10/12 lg:w-full"
                    />
                </div>
            </section>
            <div
                className={`fixed inset-0 bg-gray-800 bg-opacity-75 transition-transform duration-300 ease-in-out ${
                    showLogin ? 'translate-x-0' : 'translate-x-full'
                } z-50 flex items-center justify-center`}
            >
                <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                    <button
                        onClick={handleCloseLogin}
                        className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
                    >
                        &times;
                    </button>
                    <Login />
                </div>
            </div>
        </div>
    );
};

export default HomePage;
