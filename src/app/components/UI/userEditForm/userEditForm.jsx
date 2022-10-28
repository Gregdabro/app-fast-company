import React, { useEffect, useState } from "react";
import { validator } from "../../../utils/validator";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import { useParams, useHistory } from "react-router-dom";
import { validatorConfig } from "./validatorConfig";
import { useProfessions } from "../../../hooks/useProfession";
import { useQualities } from "../../../hooks/useQualities";
import { transformArrayData } from "../../../utils/transformArray";
import { useAuth } from "../../../hooks/useAuth";

const UserEditForm = () => {
    const history = useHistory();
    const params = useParams();
    const { userUpdate } = useAuth();
    const { userId } = params;
    const { professions } = useProfessions();
    const professionsList = transformArrayData(professions);
    const { qualities } = useQualities();
    const qualitiesList = transformArrayData(qualities);
    const [errors, setErrors] = useState({});
    const [data, setData] = useState({
        name: "",
        email: "",
        profession: "",
        sex: "mail",
        qualities: []
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
            await userUpdate(newData);
            history.replace(`/users/${userId}`);
        } catch (error) {
            setErrors(error);
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <TextField
                name="name"
                onChange={handleChange}
                value={data.name}
                label="Имя"
                error={errors.name}
            />
            <TextField
                name="email"
                onChange={handleChange}
                value={data.email}
                label="Email"
                error={errors.email}
            />
            <SelectField
                value={data.profession}
                label="Выбирите вашу профессию"
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

                label="Выбирите ваш пол"
            />
            <MultiSelectField
                options={qualitiesList}
                onChange={handleChange}
                name="qualities"
                label="Выбирите ваши качества"
                defaultValue={data.qualities}
            />
            <button
                className="btn btn-primary w-100 mx-auto"
                type="submit"
                disabled={!isValid}
            >
                Update
            </button>
        </form>
    );
};

export default UserEditForm;
