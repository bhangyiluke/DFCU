import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/layout/MainLayout/MainLayout";
import { About, Dashboard, Settings } from "@/pages";
import SignIn from "@/auth/SignIn";
import Register from "@/auth/Register";

const router = createBrowserRouter([
    {
        path: "/login",
        element: <SignIn />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Dashboard />,
            },
            {
                path: "/about",
                element: <About />,
            },
            {
                path: "/settings",
                children: [
                    {
                        path: "/settings/users",
                        element: <Settings.Users />,
                    },
                    {
                        path: "/settings/system",
                        element: <Settings.System />,
                    },
                ],
            },
        ],
    },
]);

export default router;
