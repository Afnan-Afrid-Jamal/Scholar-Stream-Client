import { createBrowserRouter } from "react-router";
import MainLayout from "../../Layouts/MainLayout";
import ErrorPage from "../../Pages/Error Page/ErrorPage";
import Home from "../../Pages/Home/Home";
import AllScholarships from "../../Pages/All Scholarships/AllScholarships";

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
        ],
    },
    {
        path: "*",
        Component: ErrorPage,
    },
]);
