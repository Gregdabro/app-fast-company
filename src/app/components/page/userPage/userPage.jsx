import React from "react";
import { useParams } from "react-router-dom";
import Loader from "../../UI/Loader/Loader";
import UserCard from "../../UI/userCard";
import QualitiesCard from "../../UI/qualitiesCard";
import MeetingsCard from "../../UI/meetingsCard";
import Comments from "../../UI/comments";
import { useUser } from "../../../hooks/useUsers";
import { CommentsProvider } from "../../../hooks/useComments";

const UserPage = () => {
    const params = useParams();
    const { userId } = params;
    const { getUserById } = useUser();
    const user = getUserById(userId);

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
                        <CommentsProvider>
                            <Comments />
                        </CommentsProvider>
                    </div>
                </div>

            </div>
        );
    } else {
        return <Loader/>;
    }
};

export default UserPage;
