import React from "react";
import PropTypes from "prop-types";

const UserAvatar = ({ path, size }) => {
    return (
        <img
            src={path}
            className="img-responsive rounded-circle"
            alt="avatar"
            width={size || "40"}
            height={size || "40"}
        />
    );
};

UserAvatar.propTypes = {
    path: PropTypes.string,
    size: PropTypes.string
};

export default UserAvatar;
