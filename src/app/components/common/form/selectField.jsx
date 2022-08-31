import React from "react";
import PropTypes from "prop-types";

const SelectField = ({ label, value, onChange, defaultOption, options, error }) => {
    const getInputClasses = () => {
        return "form-select" + (error ? " is-invalid" : "");
    };
    const optionsArray = options && !Array.isArray(options) && typeof (options) === "object"
        ? Object.keys(options).map(optionsName =>
            ({
                name: options[optionsName].name,
                value: options[optionsName]._id
            }))
        : options;
    return (
        <div className="mb-4">
            <label
                htmlFor="validationCustom04"
                className="form-label"
            >
                {label}
            </label>
            <select
                className={getInputClasses()}
                id="validationCustom04"
                name="profession"
                value={value}
                onChange={onChange}
            >
                <option
                    selected={options && options.profession === ""}
                    disabled
                    value=""
                >
                    {defaultOption}
                </option>
                {
                    optionsArray && optionsArray.map(option =>
                        <option
                            key={option.value}
                            value={option.value}
                        >
                            {option.name}
                        </option>
                    )
                }
            </select>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

SelectField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    defaultOption: PropTypes.string,
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    error: PropTypes.string
};

export default SelectField;