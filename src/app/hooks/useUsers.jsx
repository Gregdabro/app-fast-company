import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import userService from "../services/user.service";
import Loader from "../components/UI/Loader/Loader";
import { errorCatcher } from "../utils/errorCatcher";
import { useAuth } from "./useAuth";

const UserContext = React.createContext();

export const useUser = () => {
    return useContext(UserContext);
};

const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const { currentUser } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    async function getUsers() {
        try {
            const { content } = await userService.get();
            setUsers(content);
            setIsLoading(false);
        } catch (error) {
            errorCatcher(error, setError);
        }
    }

    function getUserById(userId) {
        return users.find((user) => user._id === userId);
    }

    useEffect(() => {
        if (!isLoading) {
            const newUsers = [...users];
            const indexOfUser = newUsers.findIndex(user => user._id === currentUser._id);
            newUsers[indexOfUser] = currentUser;
            setUsers(newUsers);
        }
    }, [currentUser]);

    useEffect(() => {
        getUsers();
    }, []);

    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);

    return (
        <UserContext.Provider
            value={ { users, getUserById, isLoading } }
        >
            {!isLoading ? children : <Loader/>}
        </UserContext.Provider>
    );
};

UserProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export default UserProvider;
