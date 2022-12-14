import React, { useEffect, useState } from "react";
import { validator } from "../../../utils/validator";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import CheckBoxField from "../../common/form/checkBoxField";
import { validatorConfig } from "./validatorConfig";
import { useQualities } from "../../../hooks/useQualities";
import { useProfessions } from "../../../hooks/useProfession";
import { useAuth } from "../../../hooks/useAuth";
import { useHistory } from "react-router-dom";
import { transformArrayData } from "../../../utils/transformArray";

const RegisterForm = () => {
    const history = useHistory();
    const { professions } = useProfessions();
    const professionsList = transformArrayData(professions);
    const { qualities } = useQualities();
    const qualitiesList = transformArrayData(qualities);
    const { signUp } = useAuth();
    const [errors, setErrors] = useState({});
    const [data, setData] = useState({
        email: "",
        password: "",
        profession: "",
        sex: "mail",
        name: "",
        qualities: [],
        license: false
    });
    useEffect(() => {
        validate();
    }, [data]);

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

    const handleSubmit = async(e) => {
        e.preventDefault();
        const isValidate = validate();
        if (!isValidate) return;
        const newData = {
            ...data,
            qualities: data.qualities.map(q => q.value)
        };
        try {
            await signUp(newData);
            history.replace("/");
        } catch (error) {
            setErrors(error);
        }
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
                label="??????"
                name="name"
                value={data.name}
                onChange={handleChange}
                error={errors.name}
            />
            <TextField
                name="password"
                onChange={handleChange}
                value={data.password}
                type="password"
                label="password"
                error={errors.password}
            />
            <SelectField
                value={data.profession}
                label="???????????????? ???????? ??????????????????"
                defaultOption="Choose..."
                name="profession"
                onChange={handleChange}
                options={professionsList}
                error={errors.profession}
            />
            <RadioField
                options={[
                    { name: "Mail", value: "mail" },
                    { name: "Female", value: "female" },
                    { name: "Other", value: "other" }
                ]}
                value={data.sex}
                name="sex"
                onChange={handleChange}

                label="???????????????? ?????? ??????"
            />
            <MultiSelectField
                options={qualitiesList}
                onChange={handleChange}
                name="qualities"
                label="???????????????? ???????? ????????????????"
                defaultValue={data.qualities}
            />
            <CheckBoxField
                value={data.license}
                onChange={handleChange}
                name="license"
                error={errors.license}
            >
                ?????????????????????? <a>???????????????????????? ????????????????????</a>
            </CheckBoxField>
            <button
                className="btn btn-primary w-100 mx-auto"
                type="submit"
                disabled={!isValid}
            >
                Submit
            </button>
        </form>
    );
};

export default RegisterForm;
