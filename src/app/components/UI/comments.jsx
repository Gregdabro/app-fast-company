import React, { useEffect, useState } from "react";
import api from "../../api";
import { orderBy } from "lodash";
import AddCommentForm from "../common/comments/addCommentForm";
import CommentsList from "../common/comments/commentsList";
import PropTypes from "prop-types";
import { useComments } from "../../hooks/useComments";

const Comments = () => {
    const [comments, setComments] = useState([]);
    const { createComment } = useComments();
    useEffect(() => {
        // api.comments
        //     .fetchCommentsForUser(userId)
        //     .then((data) => setComments(data));
    }, []);

    const handleSubmit = (data) => {
        createComment(data);
        // api.comments
        //     .add({ ...data, pageId: userId })
        //     .then((data) => setComments([...comments, data]));
    };

    const handleRemoveComment = (id) => {
        api.comments
            .remove(id)
            .then((commentsForUser) => setComments(commentsForUser));
    };

    const sortedComments = orderBy(comments, ["created_at"], ["desc"]);

    return (
        <>
            <div className="card mb-2">
                {" "}
                <div className="card-body ">
                    <AddCommentForm
                        onSubmit={handleSubmit}
                    />
                </div>
            </div>
            {sortedComments && (
                <div className="card mb-3">
                    <div className="card-body ">
                        <h2>Comments</h2>
                        <hr/>
                        <CommentsList
                            comments={sortedComments}
                            onRemove={handleRemoveComment}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

Comments.propTypes = {
    userId: PropTypes.string
};

export default Comments;
