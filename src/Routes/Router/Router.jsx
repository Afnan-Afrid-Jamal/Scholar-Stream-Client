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
import AdminPrivateRoute from "../PrivateRoute/AdminPrivateRoute";
import ModeratorPrivateRoute from "../PrivateRoute/ModeratorPrivateRoute";

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
                element: <PaymentSuccessPage />,
            },
            {
                path: "payment-cancelled",
                element: <PaymentFailedPage />,
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
                element: <AdminPrivateRoute><AddScholarship></AddScholarship></AdminPrivateRoute>
            },
            {
                path: "manage-scholarships",
                element: <AdminPrivateRoute><ManageScholarships></ManageScholarships></AdminPrivateRoute>
            },
            {
                path: "manage-users",
                element: <AdminPrivateRoute><ManageUsers></ManageUsers></AdminPrivateRoute>
            },
            {
                path: "analytics",
                element: <AdminPrivateRoute><Analytics></Analytics></AdminPrivateRoute>
            },
            {
                path: "all-reviews",
                element: <ModeratorPrivateRoute><AllReviews></AllReviews></ModeratorPrivateRoute>
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
                element: <ModeratorPrivateRoute><ManageApplications></ManageApplications></ModeratorPrivateRoute>
            },
        ]
    },
    {
        path: "*",
        Component: ErrorPage,
    },
]);
