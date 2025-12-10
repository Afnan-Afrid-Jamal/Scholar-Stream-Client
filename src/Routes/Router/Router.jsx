import { createBrowserRouter } from "react-router";
import Navbar from "../../Component/Shared/Navbar";
import MainLayout from "../../Layouts/MainLayout";
import ErrorPage from "../../Pages/Error Page/ErrorPage";
import Home from "../../Pages/Home/Home";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: MainLayout,
        children: [
            {
                index: true,
                element: <Home></Home>,
            },
        ]
    },
    {
        path: "*",
        Component: ErrorPage,
    },
]);