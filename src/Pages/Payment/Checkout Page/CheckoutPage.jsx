import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import LoadingSpinner from '../../../Component/Shared/LoadingSpinner';

const CheckoutPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    // Fetch scholarship details
    const { data: scholarship, isLoading, error } = useQuery({
        queryKey: ['scholarshipDetails', id],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/view-details/${id}`);
            return res.data;
        },
        enabled: !!id,
    });

    const handlePayment = async () => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/create-payment-intent`, {
                scholarshipId: id,
                userEmail: location.state?.userEmail,
            });

            // Normally here you would integrate Stripe checkout or similar
            // After successful payment, redirect to success page
            navigate('/payment/success', {
                state: {
                    scholarshipName: scholarship.scholarshipName,
                    userEmail: location.state?.userEmail,
                    transactionId: res.data.transactionId || '123456', // example
                },
            });
        } catch (err) {
            console.error(err);
            alert('Payment failed!');
        }
    };

    if (isLoading) return <LoadingSpinner />;
    if (error) return <p>Error loading scholarship data.</p>;

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">{scholarship.scholarshipName}</h1>
            <p>University: {scholarship.universityName}</p>
            <p>Tuition Fees: ${scholarship.tuitionFees}</p>
            <p>Application Fees: ${scholarship.applicationFees}</p>
            <button
                onClick={handlePayment}
                className="mt-4 bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
            >
                Pay & Apply
            </button>
        </div>
    );
};

export default CheckoutPage;
