import React, { useContext, useState } from 'react';
import { FaGoogle } from 'react-icons/fa6';
import { uploadImage } from '../../Utils';
import { AuthContext } from '../../Provider/AuthContext';
import { Link } from 'react-router';
import axios from 'axios';

const Register = () => {

    const { user, customCreateUserWithEmailAndPassword, customGoogleSignIn } = useContext(AuthContext);

    const [photoURL, setPhotoURL] = useState("")

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;
        const url = await uploadImage(file);
        setPhotoURL(url);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;

        const registerFormData = {
            name, email, photoURL
        }

        try {
            await customCreateUserWithEmailAndPassword(email, password, name, photoURL);
            await axios.post(`${import.meta.env.VITE_API_BASE_URL}/register`, registerFormData);
        } catch (error) {
            console.log(error);
        }

    };


    // Google SignUp
    const handleGoogleSignUp = async () => {

        try {
            await customGoogleSignIn()

            const name = user.displayName;
            const email = user.email;
            const photoURL = user.photoURL;


            const registerFormData = {
                name, email, photoURL
            }

            await axios.post(`${import.meta.env.VITE_API_BASE_URL}/register`, registerFormData);
        } catch (error) {
            console.log(error);
        }

    }


    return (
        <div className="max-w-11/12 mx-auto bg-base-100 shadow-xl rounded-2xl p-8 md:p-10 w-full max-w-md">
            <h2 className="text-2xl font-bold text-secondary text-center mb-6">
                Create an Account
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* Name */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-neutral/80">Full Name</label>
                    <input type="text" placeholder="John Doe" name="name" required
                        className="h-11 rounded-lg border border-neutral/30 bg-base-100 px-4 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition text-neutral" />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-neutral/80">Email Address</label>
                    <input type="email" name="email" placeholder="example@email.com" required
                        className="h-11 rounded-lg border border-neutral/30 bg-base-100 px-4 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition text-neutral" />
                </div>

                {/* Photo Upload */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-neutral/80">Upload Photo</label>
                    <input type="file" name="photoURL" className="file-input file-input-primary w-full" onChange={handleImageUpload} />
                </div>

                {/* Password */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-neutral/80">Password</label>
                    <input type="password" name="password" placeholder="password" required
                        className="h-11 rounded-lg border border-neutral/30 bg-base-100 px-4 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition text-neutral" />
                </div>

                {/* Register Button */}
                <button type="submit"
                    className="h-11 rounded-lg bg-primary text-white font-semibold shadow hover:bg-primary/90 active:scale-95 transition">
                    Register
                </button>

                {/* Google Button */}
                <button onClick={handleGoogleSignUp} type="button"
                    className="h-11 w-full flex items-center justify-center gap-3 rounded-lg border border-neutral/30 bg-base-100 text-neutral font-medium shadow-sm hover:border-primary text-primary hover:shadow-md active:scale-95 transition-all cursor-pointer">
                    <FaGoogle className="text-xl" />
                    Continue with Google
                </button>
            </form>
            <p className="text-center text-gray-600 dark:text-gray-400 mt-4">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-500 font-semibold underline">
                    Login here
                </Link>
            </p>
        </div>
    );
};

export default Register;
