import React, { useState } from 'react'
import chatBg from '../assets/img/chat bg.png';
import chatLogo from '/ChaHub logo.png?url';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from '../firebase/index';
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from 'react-router-dom';


const Register = () => {

    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;

        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            const userId = response.user.uid;
            console.log("User Created:", response.user);

            await updateProfile(response.user, {
                displayName: displayName,
            })

            await setDoc(doc(db, "users", userId), {
                uid: userId,
                displayName: displayName || "Anonymous",
                email: email,
            });
            localStorage.setItem("userId", userId);

            await setDoc(doc(db, "userChats", userId), {});
            navigate("/");

            console.log("User saved in Firestore!");
        } catch (error) {
            console.log(error.code);
            setError(true);
        }
    }

    return (
        <div className="bg-[#ede7f6] min-h-screen flex flex-col items-center px-6">
            <nav className="w-full max-w-6xl flex justify-between items-center py-6">
                <div className='text-[#6c66ff] flex items-center'>
                    <img src={chatLogo} alt="logo" className='w-7 sm:w-14 mr-3' />
                    <h1 className="text-xl sm:text-3xl font-bold">ChatHub</h1>
                </div>
                <div className="hidden md:flex space-x-6">
                    <a href="#" className="text-gray-700">Home</a>
                    <a href="#" className="text-gray-700">About</a>
                    <a href="#" className="text-gray-700">Service</a>
                    <a href="#" className="text-gray-700">Contact</a>
                </div>
                <div className="space-x-4">
                    <button className="sm:px-4 sm:py-2 border border-light-blue hover:bg-light-blue hover:text-white text-[#6c44ff] rounded-md cursor-pointer font-semibold px-2 py-1 text-sm">Login</button>
                    <button className="sm:px-4 sm:py-2 bg-light-blue hover:bg-[#6c44ff] cursor-pointer text-white rounded-md font-semibold px-2 py-1 text-sm">Sign in</button>
                </div>
            </nav>

            <div className="flex flex-col md:flex-row items-center mt-8 sm:mt-16 max-w-6xl">
                <div className="md:w-1/2 flex items-center mr-0 sm:mr-20">
                    <form action="" className='w-full max-w-md space-y-4' onSubmit={handleSubmit}>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 text-center">Welcome Back!</h2>
                            <p className="text-center text-gray-600">Continue with Google or enter your details</p>
                        </div>

                        <div className="mt-4">
                            <input id='name' type="text" className="w-full p-2 border-b border-light-blue mt-1 outline-none" placeholder="Fullname" />
                        </div>

                        <div className="mt-4">
                            <input id='email' type="email" className="w-full p-2 border-b border-light-blue mt-1 outline-none" placeholder="Email" />
                        </div>

                        <div className="mt-4">
                            <input id='password' type="password" className="w-full p-2 border-b border-light-blue mt-1 outline-none" placeholder="Password" />
                        </div>

                        <button className="mt-6 w-full bg-light-blue hover:bg-[#6c44ff] text-white py-2 rounded-md text-lg cursor-pointer">Sign Up</button>

                        {error && <span className='text-red-600'>Something went wrong</span>}

                        <p className="mt-4 text-center text-gray-600">
                            Don't have an account? <Link to="/login" className="text-light-blue font-bold">Login here</Link>
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

export default Register;