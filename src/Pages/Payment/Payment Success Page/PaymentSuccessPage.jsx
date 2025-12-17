import { useEffect } from 'react';
import { useSearchParams } from 'react-router';
import axios from 'axios';

const PaymentSuccessPage = () => {
    const [searchParams] = useSearchParams();
    const session_id = searchParams.get('session_id');

    useEffect(() => {
        if (session_id) {
            axios.patch(`${import.meta.env.VITE_API_BASE_URL}/payment-success`, { transactionId: session_id })
                .then(res => console.log("Payment status updated:", res.data))
                .catch(err => console.error(err));
        }
    }, [session_id]);

    return <h1>Payment Successful!</h1>;
};

export default PaymentSuccessPage;
