import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../components/page/userPage/userPage";
import UsersListPage from "../components/page/usersListPage";
import UserProvider from "../hooks/useUsers";
import UserEditPage from "../components/page/userEditPage";

const Users = () => {
    const params = useParams();
    const { userId, edit } = params;
    return (
        <>
            <UserProvider>
                {userId
                    ? (edit ? <UserEditPage/> : <UserPage userId={userId}/>)
                    : <UsersListPage/>
                }
            </UserProvider>
        </>
    );
};

export default Users;
