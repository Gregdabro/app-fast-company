import React from "react";
import { useParams } from "react-router-dom";
import Loader from "../../UI/Loader/Loader";
import UserCard from "../../UI/userCard";
import QualitiesCard from "../../UI/qualitiesCard";
import MeetingsCard from "../../UI/meetingsCard";
import Comments from "../../UI/comments";
import { useUser } from "../../../hooks/useUsers";

const UserPage = () => {
    const params = useParams();
    const { userId } = params;

    const { users, isLoading } = useUser();
    const user = users.find((user) => user._id === userId);
    if (!isLoading) {
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
