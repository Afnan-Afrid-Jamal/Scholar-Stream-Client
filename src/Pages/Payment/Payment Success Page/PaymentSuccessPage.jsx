import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router";
import axios from "axios";
import { FaCheckCircle } from "react-icons/fa";

const PaymentSuccessPage = () => {
    const [searchParams] = useSearchParams();
    const session_id = searchParams.get("session_id");
    const [application, setApplication] = useState(null);

    useEffect(() => {
        if (session_id) {
            // Update payment status
            axios
                .patch(`${import.meta.env.VITE_API_BASE_URL}/payment-success`, { sessionId: session_id })
                .then(() => {

                    axios
                        .get(`${import.meta.env.VITE_API_BASE_URL}/application-by-session?sessionId=${session_id}`)
                        .then(res => setApplication(res.data))
                        .catch(err => console.error(err));
                })
                .catch(err => console.error(err));
        }
    }, [session_id]);

    if (!application) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-blue-50">
                <p className="text-blue-700 font-medium">Loading your application details...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
            <div className="bg-white max-w-lg w-full rounded-xl shadow-xl p-10 text-center border border-blue-100">
                <FaCheckCircle className="text-blue-600 text-6xl mx-auto mb-6" />

                <h1 className="text-3xl font-semibold text-blue-800 mb-3">
                    Payment Successful
                </h1>

                <p className="text-gray-600 leading-relaxed mb-6">
                    Your payment has been processed successfully. Your scholarship application is now officially submitted.
                </p>

                {/* Scholarship Details */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
                    <p className="text-sm text-blue-700"><strong>Scholarship:</strong> {application.scholarshipName}</p>
                    <p className="text-sm text-blue-700"><strong>University:</strong> {application.universityName}</p>
                    <p className="text-sm text-blue-700"><strong>Category:</strong> {application.scholarshipCategory}</p>
                    <p className="text-sm text-blue-700"><strong>Degree:</strong> {application.degree}</p>
                    <p className="text-sm text-blue-700"><strong>Amount Paid:</strong> ${application.totalPaid}</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                        to="/dashboard/my-applications"
                        className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-medium transition"
                    >
                        Go to My Applications
                    </Link>

                    <Link
                        to="/all-scholarships"
                        className="flex-1 text-center border border-blue-600 text-blue-600 hover:bg-blue-50 py-2.5 rounded-lg font-medium transition"
                    >
                        View Scholarships
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccessPage;
