import React from "react";

const LoadingSpinner = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
            <div className="flex flex-col items-center space-y-4">
                {/* Spinner */}
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
                {/* Optional Text */}
                <p className="text-white text-lg font-medium">Loading...</p>
            </div>
        </div>
    );
};

export default LoadingSpinner;
