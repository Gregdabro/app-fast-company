import React from "react";
import PropTypes from "prop-types";

const UserAvatar = ({ userName, size }) => {
    return (
        <img
            src={`https://avatars.dicebear.com/api/avataaars/${userName}.svg`}
            className="img-responsive rounded-circle"
            alt="avatar"
            width={size}
            height={size}
        />
    );
};

UserAvatar.propTypes = {
    userName: PropTypes.string,
    size: PropTypes.string
};

export default UserAvatar;
