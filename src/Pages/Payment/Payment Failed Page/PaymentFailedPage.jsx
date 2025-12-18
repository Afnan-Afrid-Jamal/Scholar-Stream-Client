import { useEffect, useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router";
import { FaTimesCircle } from "react-icons/fa";
import axios from "axios";

const PaymentFailedPage = () => {
    const [searchParams] = useSearchParams();
    const session_id = searchParams.get("session_id");
    const [application, setApplication] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (session_id) {
            // Fetch failed payment details
            axios
                .get(`${import.meta.env.VITE_API_BASE_URL}/application-by-session?sessionId=${session_id}`)
                .then(res => {
                    setApplication(res.data);
                    if (res.data.paymentError) {
                        setErrorMessage(res.data.paymentError);
                    }
                })
                .catch(err => console.error(err));
        }
    }, [session_id]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-red-50 px-4">
            <div className="bg-white max-w-lg w-full rounded-xl shadow-xl p-10 text-center border border-red-100">
                <FaTimesCircle className="text-red-600 text-6xl mx-auto mb-6" />

                <h1 className="text-3xl font-semibold text-red-800 mb-3">
                    Payment Failed
                </h1>

                <p className="text-gray-600 leading-relaxed mb-6">
                    {errorMessage || "Your payment could not be processed. Please try again."}
                </p>

                {application && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-left">
                        <p className="text-sm text-red-700">
                            <strong>Scholarship:</strong> {application.scholarshipName}
                        </p>
                    </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex-1 text-center bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-lg font-medium transition"
                    >
                        Retry Payment
                    </button>

                    <Link
                        to="/dashboard"
                        className="flex-1 text-center border border-red-600 text-red-600 hover:bg-red-50 py-2.5 rounded-lg font-medium transition"
                    >
                        Go to Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PaymentFailedPage;
