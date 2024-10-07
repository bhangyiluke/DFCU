import { Navigate, Route } from "react-router-dom";
import { authService } from "../services/authentication.service";

export const PrivateRoute = ({ component: Component, roles, ...rest }: any) => (
    <Route
        {...rest}
        render={(props: any) => {
            const user = authService.currentUserValue;
            if (!user) {
                // Redirect to the login page if the user is not logged in
                return (
                    <Navigate
                        to={{ pathname: "/login" }}
                        state={{ from: props.location }}
                    />
                );
            }
            // Check if the route has roles restriction and return t
            if (roles && !roles.includes(user.role)) {
                return <Navigate to={{ pathname: "/" }} />;
            }

            return <Component {...props} />;
        }}
    />
);
