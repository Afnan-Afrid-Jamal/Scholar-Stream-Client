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
                element: <MyProfile></MyProfile>
            },
            {
                path: "my-profile",
                element: <MyProfile></MyProfile>
            },
            {
                path: "add-scholarship",
                element: <AddScholarship></AddScholarship>
            },
            {
                path: "manage-scholarships",
                element: <ManageScholarships></ManageScholarships>
            },
            {
                path: "manage-users",
                element: <ManageUsers></ManageUsers>
            },
            {
                path: "analytics",
                element: <Analytics></Analytics>
            },
            {
                path: "all-reviews",
                element: <AllReviews></AllReviews>
            },
            {
                path: "my-reviews",
                element: <MyReviews></MyReviews>
            },
            {
                path: "my-applications",
                element: <MyApplications></MyApplications>
            },
            {
                path: "manage-applications",
                element: <ManageApplications></ManageApplications>
            },
        ]
    },
    {
        path: "*",
        Component: ErrorPage,
    },
]);
