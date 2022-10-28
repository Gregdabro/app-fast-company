import React, { useContext, useEffect, useState } from "react";
import qualityService from "../services/quality.service";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { errorCatcher } from "../utils/errorCatcher";

const QualitiesContext = React.createContext();

export const useQualities = () => {
    return useContext(QualitiesContext);
};

const QualitiesProvider = ({ children }) => {
    const [qualities, setQualities] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getQualities = async() => {
            try {
                const { content } = await qualityService.fetchAll();
                setQualities(content);
                setIsLoading(false);
            } catch (error) {
                errorCatcher(error, setError);
            }
        };
        getQualities();
    }, []);

    const getQuality = (id) => {
        return qualities.find((q) => q._id === id);
    };

    function getQualitiesListByIds(qualitiesIds) {
        const qualitiesArray = [];
        for (const qualityId of qualitiesIds) {
            for (const quality of qualities) {
                if (quality._id === qualityId) {
                    qualitiesArray.push(quality);
                    break;
                }
            }
        }
        return qualitiesArray;
    }

    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);

    return (
        <QualitiesContext.Provider
            value={{
                isLoading,
                qualities,
                getQuality,
                getQualitiesListByIds
            }}
        >
            {children}
        </QualitiesContext.Provider>
    );
};

QualitiesProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export default QualitiesProvider;
