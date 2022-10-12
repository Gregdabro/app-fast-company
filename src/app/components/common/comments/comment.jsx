import React from "react";
import PropTypes from "prop-types";
import UserAvatar from "../../UI/userAvatar";
import { displayDate } from "../../../utils/displayDate";
import { useUser } from "../../../hooks/useUsers";

const Comment = (
    {
        content,
        edited_at: edited,
        created_at: created,
        userId,
        onRemove,
        _id: id
    }) => {
    const { getUserById } = useUser();
    const user = getUserById(userId);
    return (
        <div className="bg-light card-body  mb-3">
            <div className="row">
                <div className="col">
                    <div className="d-flex flex-start ">
                        <UserAvatar path={user.image}/>
                        <div className="flex-grow-1 flex-shrink-1">
                            <div className="mb-4">
                                <div className="d-flex justify-content-between align-items-center">
                                    <p className="mb-1 ">
                                        {user && user.name}
                                        <span className="small">
                                            {" "}
                                            {displayDate(edited || created)}
                                        </span>
                                    </p>
                                    <button
                                        className="btn btn-sm text-primary d-flex align-items-center"
                                        onClick={() => onRemove(id)}
                                    >
                                        <i className="bi bi-x-lg"></i>
                                    </button>
                                </div>
                                <p className="small mb-0">{content}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

Comment.propTypes = {
    content: PropTypes.string,
    edited_at: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    created_at: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    userId: PropTypes.string,
    onRemove: PropTypes.func,
    _id: PropTypes.string
};

export default Comment;
