import { authService } from "../services/authentication.service";

const authHeader = () => {
    //If the current user has a token, then just include it on the header
    const user = authService.currentUserValue;
    // const header = { "Access-Control-Allow-Origin": "*" };
    if (user && user.accessToken) {
        return { Authorization: `Bearer ${user.accessToken}` };
    } else {
        return {};
    }
};

export default authHeader;
