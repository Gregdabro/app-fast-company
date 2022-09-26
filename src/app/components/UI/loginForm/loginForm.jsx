import React, { useEffect, useState } from "react";
import { validator } from "../../../utils/validator";
import TextField from "../../common/form/textField";
import CheckBoxField from "../../common/form/checkBoxField";
import { validatorConfig } from "./validatorConfig";

const LoginForm = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        stayOn: false
    });
    const [errors, setErrors] = useState({});
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    useEffect(() => {
        validate();
    }, [data]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValidate = validate();
        if (!isValidate) return;
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                name="email"
                onChange={handleChange}
                value={data.email}
                label="Email"
                error={errors.email}
            />
            <TextField
                name="password"
                onChange={handleChange}
                value={data.password}
                type="password"
                label="password"
                error={errors.password}
            />
            <CheckBoxField
                value={data.stayOn}
                onChange={handleChange}
                name="stayOn"
            >
                Оставаться в системе
            </CheckBoxField>
            <button className="btn btn-primary w-100 mx-auto" type="submit" disabled={!isValid}>Submit</button>
        </form>
    );
};

export default LoginForm;
