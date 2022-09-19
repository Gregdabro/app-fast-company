import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../api";
import Loader from "../../UI/Loader/Loader";
import UserCard from "../../UI/userCard";
import QualitiesCard from "../../UI/qualitiesCard";
import MeetingsCard from "../../UI/meetingsCard";
import Comments from "../../UI/comments";

const UserPage = () => {
    const [user, setUser] = useState(undefined);
    const params = useParams();
    const { userId } = params;

    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);

    if (user) {
        return (
            <div className="container">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <UserCard user={user}/>
                        <QualitiesCard data={user.qualities}/>
                        <MeetingsCard value={user.completedMeetings}/>
                    </div>
                    <div className="col-md-8">
                        <Comments userId={userId} />
                    </div>
                </div>

            </div>
        );
    } else {
        return <Loader/>;
    }
};

export default UserPage;
