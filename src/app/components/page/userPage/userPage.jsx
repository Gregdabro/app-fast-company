import React from "react";
import { useUser } from "../../../hooks/useUsers";
import UserCard from "../../UI/userCard";
import QualitiesCard from "../../UI/qualitiesCard";
import MeetingsCard from "../../UI/meetingsCard";
import { CommentsProvider } from "../../../hooks/useComments";
import Comments from "../../UI/comments";
import Loader from "../../UI/Loader/Loader";
import PropTypes from "prop-types";

const UserPage = ({ userId }) => {
    const { getUserById } = useUser();
    const user = getUserById(userId);
    if (user) {
        return (
            <div className="container">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <UserCard user={user} />
                        <QualitiesCard data={user.qualities} />
                        <MeetingsCard value={user.completedMeetings} />
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

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;
