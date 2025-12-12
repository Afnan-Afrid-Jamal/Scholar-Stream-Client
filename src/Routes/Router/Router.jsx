import { createBrowserRouter } from "react-router";
import MainLayout from "../../Layouts/MainLayout";
import ErrorPage from "../../Pages/Error Page/ErrorPage";
import Home from "../../Pages/Home/Home";
import AllScholarships from "../../Pages/All Scholarships/AllScholarships";
import ScholarshipDetails from "../../Pages/Scholarship Details/ScholarshipDetails";

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
        ],
    },
    {
        path: "*",
        Component: ErrorPage,
    },
]);
