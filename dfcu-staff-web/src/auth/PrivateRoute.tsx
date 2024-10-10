import { useNavigate } from "react-router-dom";
import { authService } from "../services/authentication.service";
import { useEffect } from "react";

export const PrivateRoute = ({ component: Component, roles, ...rest }: any) => {
    const navigate = useNavigate();
    const user = authService.currentUserValue;
    useEffect(()=>{
        if (!user) {
            navigate("/login");
        }
        // Check if the route has roles restriction and return t
        if (roles && !roles.includes(user.role)) {
            navigate("/");
        }
    },[user]);
    
    return <Component {...rest} />;
};
