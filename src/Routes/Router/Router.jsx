import { createBrowserRouter } from "react-router";
import MainLayout from "../../Layouts/MainLayout";
import ErrorPage from "../../Pages/Error Page/ErrorPage";
import Home from "../../Pages/Home/Home";
import AllScholarships from "../../Pages/All Scholarships/AllScholarships";
import ScholarshipDetails from "../../Pages/Scholarship Details/ScholarshipDetails";
import Login from "../../Pages/Login/Login";
import Register from "../../Pages/Register/Register";
import DashboardLayout from "../../Layouts/DashboardLayout";
import MyProfile from "../../Pages/Dashboard/MyProfile";
import AddScholarship from "../../Pages/Dashboard/AddScholarship";
import ManageScholarships from "../../Pages/Dashboard/ManageScholarships";
import ManageUsers from "../../Pages/Dashboard/ManageUsers";
import Analytics from "../../Pages/Dashboard/Analytics";
import AllReviews from "../../Pages/Dashboard/AllReviews";
import PaymentSuccessPage from "../../Pages/Payment/Payment Success Page/PaymentSuccessPage";
import PaymentFailedPage from "../../Pages/Payment/Payment Failed Page/PaymentFailedPage";
import MyReviews from "../../Pages/Dashboard/MyReviews";
import MyApplications from "../../Pages/Dashboard/MyApplications";
import ManageApplications from "../../Pages/Dashboard/ManageApplications";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: MainLayout,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "all-scholarships",
                element: <AllScholarships />,
            },
            {
                path: "scholarship-details/:id",
                element: <ScholarshipDetails></ScholarshipDetails>,
            },
            {
                path: "login",
                element: <Login></Login>,
            },
            {
                path: "register",
                element: <Register></Register>,
            },
            {
                path: "payment-success",
                element: <PrivateRoute><PaymentSuccessPage /></PrivateRoute>,
            },
            {
                path: "payment-cancelled",
                element: <PrivateRoute><PaymentFailedPage /></PrivateRoute>,
            },

        ],
    },
    {
        path: "/dashboard",
        element: <DashboardLayout></DashboardLayout>,
        children: [
            {
                index: true,
                element: <PrivateRoute><MyProfile></MyProfile></PrivateRoute>
            },
            {
                path: "my-profile",
                element: <PrivateRoute><MyProfile></MyProfile></PrivateRoute>
            },
            {
                path: "add-scholarship",
                element: <PrivateRoute><AddScholarship></AddScholarship></PrivateRoute>
            },
            {
                path: "manage-scholarships",
                element: <PrivateRoute><ManageScholarships></ManageScholarships></PrivateRoute>
            },
            {
                path: "manage-users",
                element: <PrivateRoute><ManageUsers></ManageUsers></PrivateRoute>
            },
            {
                path: "analytics",
                element: <PrivateRoute><Analytics></Analytics></PrivateRoute>
            },
            {
                path: "all-reviews",
                element: <PrivateRoute><AllReviews></AllReviews></PrivateRoute>
            },
            {
                path: "my-reviews",
                element: <PrivateRoute><MyReviews></MyReviews></PrivateRoute>
            },
            {
                path: "my-applications",
                element: <PrivateRoute><MyApplications></MyApplications></PrivateRoute>
            },
            {
                path: "manage-applications",
                element: <PrivateRoute><ManageApplications></ManageApplications></PrivateRoute>
            },
        ]
    },
    {
        path: "*",
        Component: ErrorPage,
    },
]);
