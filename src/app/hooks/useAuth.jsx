import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import userService from "../services/user.service";
import localStorageService, { setTokens } from "../services/localStorage.service";
import { errorCatcher } from "../utils/errorCatcher";
import { toast } from "react-toastify";
import { randomInt } from "../utils/randomInt";
import { useHistory } from "react-router-dom";
import Loader from "../components/UI/Loader/Loader";
import { createAvaaatar } from "../utils/createAvaaatar";

export const httpAuth = axios.create({
    baseURL: "https://identitytoolkit.googleapis.com/v1/",
    params: {
        key: process.env.REACT_APP_FIREBASE_KEY
    }
});
const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    const [currentUser, setUser] = useState();
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const history = useHistory();

    async function signUp({ email, password, ...rest }) {
        try {
            const { data } = await httpAuth.post("accounts:signUp", {
                email,
                password,
                returnSecureToken: true
            });
            console.log("data", data);
            setTokens(data);
            await createUser({
                _id: data.localId,
                email,
                rate: randomInt(1, 5),
                completedMeetings: randomInt(0, 200),
                image: createAvaaatar(),
                ...rest
            });
        } catch (error) {
            errorCatcher(error, setError);
            const { code, message } = error.response.data.error;
            if (code === 400) {
                if (message === "EMAIL_EXISTS") {
                    const errorObject = {
                        email: "Пользователь с таким email уже существует"
                    };
                    throw errorObject;
                }
            }
        }
    }

    async function logIn({ email, password }) {
        try {
            const { data } = await httpAuth.post("accounts:signInWithPassword", {
                email,
                password,
                returnSecureToken: true
            });
            setTokens(data);
            await getUserData();
        } catch (error) {
            errorCatcher(error, setError);
            const { code, message } = error.response.data.error;
            if (code === 400) {
                if (message === "EMAIL_NOT_FOUND" || message === "INVALID_PASSWORD") {
                    const errorObject = {
                        email: "Неверный логин или пароль"
                    };
                    throw errorObject;
                }
            }
        }
    }

    function logOut() {
        localStorageService.removeAuthData();
        setUser(null);
        history.replace("/");
    }

    async function createUser(data) {
        try {
            const { content } = await userService.create(data);
            setUser(content);
        } catch (error) {
            errorCatcher(error, setError);
        }
    }

    async function getUserData() {
        try {
            const { content } = await userService.getCurrentUser();
            setUser(content);
        } catch (error) {
            errorCatcher(error, setError);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (localStorageService.getAccessToken()) {
            getUserData();
        } else {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);

    return (
        <AuthContext.Provider value={{ signUp, logIn, logOut, currentUser }}>
            {!isLoading ? children : <Loader/>}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export default AuthProvider;
