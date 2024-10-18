import { Navigate, createBrowserRouter } from "react-router-dom";
import { PrivateRoute } from "@/auth/PrivateRoute";
import Register from "@/auth/Register";
import SignIn from "@/auth/SignIn";
import MainLayout from "@/layout/MainLayout/MainLayout";
import {
    About,
    Dashboard,
    EmployeeList,
    ErrorPage,
    Settings,
} from "@/pages";
import { authService } from "@/services/authentication.service";

// const getCurrentUser = () =>{
//     const navigate = useNavigate();
//     const user = authService.currentUserValue;
//     if (!user) {
//         navigate("/login");
//     }
//     // Check if the route has roles restriction and return t
//     // if (roles && !roles.includes(user.role)) {
//     //     navigate("/");
//     // }
//     return authService.currentUser.subscribe((u) => ({
//         user: u,
//         isAdmin: u && u.role === "ADMIN",
//     }));
// }


const router = createBrowserRouter([
    {
        path: "/login",
        element: <SignIn />,
    },
    {
        path: "/logout",
        action: () => {
            authService.logout();
            return <Navigate to="/login" />;
        },
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        // Use the loader to preload the user details if already logged in
        path: "/",
        element: <PrivateRoute component={MainLayout} />,
        // loader: getCurrentUser,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Dashboard />,
            },
            {
                path: "/employees",
                element: <EmployeeList />,
            },
            {
                path: "/about",
                element: <About />,
            },
            {
                path: "/settings",
                children: [
                    {
                        path: "users",
                        element: <Settings.Users />,
                    },
                    {
                        path: "system",
                        element: <Settings.System />,
                    },
                ],
            },
            {
                path: "*",
                element: <h1>PAGE NOT FOUND</h1>,
            }
        ],
    }
]);

export default router;
