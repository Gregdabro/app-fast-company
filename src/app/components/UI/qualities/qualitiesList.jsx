import React from "react";
import Quality from "./quality";
import PropTypes from "prop-types";

const QualitiesList = ({ qualities }) => {
    return (
        <>
            {qualities.map((qual, index) => (
                <Quality id={qual} key={qual + index} />
            ))}
        </>
    );
};

QualitiesList.propTypes = {
    qualities: PropTypes.array.isRequired
};

export default QualitiesList;
