import React from "react";
import PropTypes from "prop-types";

const UserAvatar = ({ user }) => {
    return (
        <img
            src={`https://avatars.dicebear.com/api/avataaars/${user?.name}.svg`}
            className="rounded-circle shadow-1-strong me-3"
            alt="avatar"
            width="65"
            height="65"
        />
    );
};

UserAvatar.propTypes = {
    user: PropTypes.object
};

export default UserAvatar;
