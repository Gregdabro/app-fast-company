import React from "react";
import Quality from "./quality";
import PropTypes from "prop-types";
import { useQualities } from "../../../hooks/useQualities";

const QualitiesList = ({ qualities }) => {
    const { isLoading } = useQualities();
    if (isLoading) return "Loading...";
    return (
        <>
            {qualities.map((qual) => (
                <Quality id={qual} key={qual} />
            ))}
        </>
    );
};

QualitiesList.propTypes = {
    qualities: PropTypes.array.isRequired
};

export default QualitiesList;
