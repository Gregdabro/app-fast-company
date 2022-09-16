import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import api from "../../../api";
import Loader from "../../UI/Loader/Loader";
import UserCard from "../../UI/userCard";

const UserPage = () => {
    const [user, setUser] = useState(undefined);
    const params = useParams();
    const { userId } = params;

    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);

    // const history = useHistory();

    // const handleSave = () => {
    //     history.replace(`/users/${userId}/edit`);
    // };

    if (user) {
        return (
            <div className="container">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <UserCard user={user}/>
                    </div>
                    <div className="col-md-8">Comments</div>
                </div>

            </div>
        );
    } else {
        return <Loader/>;
    };
};

UserPage.propTypes = {
    id: PropTypes.string
};

export default UserPage;
