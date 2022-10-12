import React from "react";
import PropTypes from "prop-types";

const UserAvatar = ({ path, size }) => {
    return (
        <img
            src={path}
            className="img-responsive rounded-circle"
            alt="avatar"
            width={size}
            height={size}
        />
    );
};

UserAvatar.propTypes = {
    path: PropTypes.string,
    size: PropTypes.string
};

export default UserAvatar;
