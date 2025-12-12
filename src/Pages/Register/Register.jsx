import React from 'react';
import { FaGoogle } from 'react-icons/fa6';
import { uploadImage } from '../../Utils';

const Register = () => {

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;
        const url = await uploadImage(file);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <div className="max-w-11/12 mx-auto bg-base-100 shadow-xl rounded-2xl p-8 md:p-10 w-full max-w-md">
            <h2 className="text-2xl font-bold text-secondary text-center mb-6">
                Create an Account
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* Name */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-neutral/80">Full Name</label>
                    <input type="text" placeholder="John Doe" required
                        className="h-11 rounded-lg border border-neutral/30 bg-base-100 px-4 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition text-neutral" />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-neutral/80">Email Address</label>
                    <input type="email" placeholder="example@email.com" required
                        className="h-11 rounded-lg border border-neutral/30 bg-base-100 px-4 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition text-neutral" />
                </div>

                {/* Photo Upload */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-neutral/80">Upload Photo</label>
                    <input type="file" className="file-input file-input-primary w-full" onChange={handleImageUpload} />
                </div>

                {/* Password */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-neutral/80">Password</label>
                    <input type="password" placeholder="password" required
                        className="h-11 rounded-lg border border-neutral/30 bg-base-100 px-4 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition text-neutral" />
                </div>

                {/* Register Button */}
                <button type="submit"
                    className="h-11 rounded-lg bg-primary text-white font-semibold shadow hover:bg-primary/90 active:scale-95 transition">
                    Register
                </button>

                {/* Google Button */}
                <button type="button"
                    className="h-11 w-full flex items-center justify-center gap-3 rounded-lg border border-neutral/30 bg-base-100 text-neutral font-medium shadow-sm hover:border-primary text-primary hover:shadow-md active:scale-95 transition-all cursor-pointer">
                    <FaGoogle className="text-xl" />
                    Continue with Google
                </button>
            </form>
        </div>
    );
};

export default Register;
