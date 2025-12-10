import React from "react";
import { Link } from "react-router";
import { FaExclamationTriangle } from "react-icons/fa";

const ErrorPage = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center min-h-screen bg-base-200 px-5">

            {/* Icon */}
            <FaExclamationTriangle className="text-secondary text-7xl mb-6 animate-bounce" />

            {/* Heading */}
            <h1 className="text-6xl font-bold text-secondary mb-4">404</h1>

            {/* Subheading */}
            <h2 className="text-2xl font-semibold text-neutral mb-3">
                Page Not Found
            </h2>

            {/* Description */}
            <p className="text-neutral/70 max-w-md mb-8">
                The page you are looking for may have been removed, had its name changed,
                or is temporarily unavailable.
            </p>

            {/* Button */}
            <Link
                to="/"
                className="btn btn-primary px-6 text-white text-lg"
            >
                Go Back Home
            </Link>
        </div>
    );
};

export default ErrorPage;
