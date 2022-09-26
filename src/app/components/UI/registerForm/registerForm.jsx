import React, { useEffect, useState } from "react";
import { validator } from "../../../utils/validator";
import TextField from "../../common/form/textField";
import api from "../../../api";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import CheckBoxField from "../../common/form/checkBoxField";
import { validatorConfig } from "./validatorConfig";

const RegisterForm = () => {
    const [professions, setProfession] = useState(null);
    const [data, setData] = useState({
        email: "",
        password: "",
        profession: "",
        sex: "mail",
        qualities: [],
        license: false
    });
    const [errors, setErrors] = useState({});
    const [qualities, setQualities] = useState([]);

    useEffect(() => {
        api.professions.fetchAll().then((data) => {
            const professionsList =
                Object.keys(data).map((professionName) => ({
                    label: data[professionName].name,
                    value: data[professionName]._id
                }));
            setProfession(professionsList);
        });
        api.qualities.fetchAll().then((data) => {
            const qualitiesList =
                Object.keys(data).map((optionName) => ({
                    label: data[optionName].name,
                    value: data[optionName]._id,
                    color: data[optionName].color
                }));
            setQualities(qualitiesList);
        });
    }, []);

    useEffect(() => {
        validate();
    }, [data]);

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof.value === id) {
                return { _id: prof.value, name: prof.label };
            }
        }
    };

    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem.value === qualities[quality].value) {
                    qualitiesArray.push({
                        _id: qualities[quality].value,
                        name: qualities[quality].label,
                        color: qualities[quality].color
                    });
                }
            }
        }
        return qualitiesArray;
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValidate = validate();
        if (!isValidate) return;
        const { profession, qualities } = data;
        console.log({
            ...data,
            profession: getProfessionById(profession),
            qualities: getQualities(qualities)
        });
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
            <SelectField
                value={data.profession}
                label="Выбирите вашу профессию"
                defaultOption="Choose..."
                name="profession"
                onChange={handleChange}
                options={professions}
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
                options={qualities}
                onChange={handleChange}
                name="qualities"
                label="Выбирите ваши качества"
                defaultValue={data.qualities}
            />
            <CheckBoxField
                value={data.license}
                onChange={handleChange}
                name="license"
                error={errors.license}
            >
                Подтвердить <a>лицензионное соглашение</a>
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
