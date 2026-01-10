import React, { useContext, useState } from 'react';
import { FaGoogle } from 'react-icons/fa6';
import { AuthContext } from '../../Provider/AuthContext';
import { Link, useNavigate } from 'react-router';
import axios from 'axios';

const Login = () => {
    const { customGoogleSignIn, customLoginWithEmailAndPassword } = useContext(AuthContext);
    const navigate = useNavigate();
    const [autoFill, setAutoFill] = useState(false);

    const handleGoogleSignIn = async () => {
        try {
            const result = await customGoogleSignIn();
            const googleUser = result.user;

            const registerFormData = {
                name: googleUser.displayName,
                email: googleUser.email,
                photoURL: googleUser.photoURL,
            };

            await axios.post(`${import.meta.env.VITE_API_BASE_URL}/register`, registerFormData);
            navigate('/dashboard');
        } catch (error) {
            console.error(error);
        }
    };

    const handleSignInWithForm = async (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;

        try {
            await customLoginWithEmailAndPassword(email, password);
            navigate('/dashboard');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="max-w-11/12 mx-auto bg-base-100 shadow-xl rounded-2xl p-8 md:p-10 w-full max-w-md">
            <h2 className="text-2xl font-bold text-secondary text-center mb-6">Welcome Back</h2>
            <form onSubmit={handleSignInWithForm} className="flex flex-col gap-5">
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-neutral/80">Email Address</label>
                    <input type="email" name='email' value={autoFill ? `afnanafrid@gmail.com` : ``} placeholder="example@email.com" className="h-11 rounded-lg border border-neutral/30 bg-base-100 px-4 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition text-neutral" required />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-neutral/80">Password</label>
                    <input type="password" name='password' value={autoFill ? `123456Aa@` : ``} placeholder="password" className="h-11 rounded-lg border border-neutral/30 bg-base-100 px-4 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition text-neutral" required />
                </div>
                <button type='submit' className="h-11 rounded-lg bg-primary text-white font-semibold shadow hover:bg-primary/90 active:scale-95 transition">Login</button>
                <button onClick={handleGoogleSignIn} type="button" className="h-11 w-full flex items-center justify-center gap-3 rounded-lg border border-neutral/30 bg-base-100 font-medium shadow-sm hover:border-primary text-primary hover:shadow-md active:scale-95 transition-all cursor-pointer">
                    <FaGoogle className="text-xl" /> Continue with Google
                </button>
            </form>
            <button onClick={() => {
                setAutoFill(!autoFill)
            }} className='h-11 w-full flex items-center justify-center gap-3 rounded-lg border border-neutral/30 bg-base-100 font-medium shadow-sm hover:border-primary text-primary hover:shadow-md active:scale-95 transition-all cursor-pointer my-5'>Try Demo Account</button>
            <p className="text-center text-gray-600 dark:text-gray-400 mt-4">
                Don't have an account? <Link to="/register" className="text-blue-500 font-semibold underline">Register here</Link>
            </p>
        </div>
    );
};

export default Login;