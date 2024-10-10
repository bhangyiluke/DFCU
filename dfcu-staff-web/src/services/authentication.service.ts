import { BehaviorSubject } from "rxjs";
import { apiUrl } from "../config";
import handleResponse from "../helpers/handle-response";

const user = localStorage.getItem("currentUser")
    ? JSON.parse(localStorage.getItem("currentUser") || "")
    : undefined;

// alert(JSON.stringify(user));
const currentUserSubject = new BehaviorSubject(user);

const logout = () => {
    localStorage.removeItem("currentUser");
    currentUserSubject.next(null);
};

const login = (usernameOrEmail: string, password: string) => {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usernameOrEmail, password }),
    };

    return fetch(`${apiUrl}/auth/signin`, requestOptions)
        .then(handleResponse)
        .then((user) => {
            console.log("/auth/signin", user);
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem("currentUser", JSON.stringify(user));
            currentUserSubject.next(user);

            return user;
        });
};

const register = (username: string, password: string) => {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    };
    return fetch(`${apiUrl}/auth/signup`, requestOptions)
        .then(handleResponse)
        .then((data) => {
            console.log("/auth/signup", data);
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            return data;
        });
};

export const authService = {
    login,
    logout,
    register,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue() {
        return currentUserSubject.value;
    },
};
