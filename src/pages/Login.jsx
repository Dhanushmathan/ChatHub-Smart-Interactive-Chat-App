import React, { useState } from 'react'
import chatBg from '../assets/img/chat bg.png';
import chatLogo from '/ChaHub logo.png?url';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';

const Login = () => {

    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
        } catch (error) {
            setError(true);
        }
    }

    return (
        <div className="bg-[#ede7f6] min-h-screen flex flex-col items-center px-6 overflow-y-hidden">
            <nav className="w-full max-w-6xl flex justify-between items-center py-6">
                <div className='text-[#6c66ff] flex items-center'>
                    <img src={chatLogo} alt="logo" className='xs:w-7 sm:w-14 mr-3' />
                    <h1 className="xs:text-xl sm:text-3xl font-bold">ChatHub</h1>
                </div>
                <div className="hidden md:flex space-x-6">
                    <a href="#" className="text-gray-700">Home</a>
                    <a href="#" className="text-gray-700">About</a>
                    <a href="#" className="text-gray-700">Service</a>
                    <a href="#" className="text-gray-700">Contact</a>
                </div>
                <div className="space-x-4">
                    <button className="sm:px-4 sm:py-2 border border-light-blue hover:bg-light-blue hover:text-white text-[#6c44ff] rounded-md cursor-pointer font-semibold xs:px-2 xs:py-1 xs:text-sm">Login</button>
                    <button className="sm:px-4 sm:py-2 bg-light-blue hover:bg-[#6c44ff] cursor-pointer text-white rounded-md font-semibold xs:px-2 xs:py-1 xs:text-sm">Sign in</button>
                </div>
            </nav>

            <div className="flex flex-col md:flex-row items-center xs:mt-8 sm:mt-16 max-w-6xl">
                <div className="md:w-1/2 flex items-center xs:mr-0 sm:mr-20">
                    <form action="" className="w-full max-w-md space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 text-center">Welcome Back!</h2>
                            <p className="text-center text-gray-600">Continue with Google or enter your details</p>
                        </div>

                        <div className="mt-4">
                            <input id='email' type="email" className="w-full p-2 border-b border-light-blue mt-1 outline-none" placeholder="Email" />
                        </div>

                        <div className="mt-4">
                            <input id='password' type="password" className="w-full p-2 border-b border-light-blue mt-1 outline-none" placeholder="Password" />
                        </div>

                        <button className="mt-6 w-full bg-light-blue hover:bg-[#6c44ff] text-white py-2 rounded-md text-lg cursor-pointer">Login</button>

                        {error && <span className='text-red-600 text-center'>Something went wrong</span>}

                        <p className="mt-4 text-center text-gray-600">
                            Don't have an account? <Link to="/register" className='text-light-blue font-bold'>Register here</Link>
                        </p>
                    </form>
                </div>

                <div className="md:w-1/2 flex justify-center mt-10 md:mt-0">
                    <img src={chatBg} className="w-full" />
                </div>
            </div>
        </div>
    )
}

export default Login;