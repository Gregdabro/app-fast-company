import React, { useEffect, useState } from "react";
import UserPage from "./userPage";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import Users from "./users";
import api from "../api";

const UsersList = () => {
    const params = useParams();
    const { userId } = params;
    const [users, setUsers] = useState(null);

    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);
    
    return (
        <>
            {userId
                ? <UserPage id={userId} history={history} />
                : <Users users={users} />
            }
        </>
    );
};

UsersList.propTypes = {
    match: PropTypes.object,
    location: PropTypes.object
};

export default UsersList;
