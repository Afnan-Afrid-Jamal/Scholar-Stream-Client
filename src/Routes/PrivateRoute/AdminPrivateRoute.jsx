import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../../Provider/AuthContext';
import LoadingSpinner from '../../Component/Shared/LoadingSpinner';
import axios from 'axios';

const AdminPrivateRoute = ({ children }) => {
    const { user, loading: authLoading } = useContext(AuthContext);
    const [role, setRole] = useState(null);
    const [roleLoading, setRoleLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {

        if (user?.email) {
            axios.get(`${import.meta.env.VITE_API_BASE_URL}/user?email=${user.email}`)
                .then(res => {
                    setRole(res.data.role);
                    setRoleLoading(false);
                })
                .catch(() => {
                    setRoleLoading(false);
                });
        } else if (!authLoading) {
            setRoleLoading(false);
        }
    }, [user, authLoading]);


    if (authLoading || roleLoading) {
        return <LoadingSpinner />;
    }


    if (user && role === "Admin") {
        return children;
    }


    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default AdminPrivateRoute;