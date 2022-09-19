import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import api from "../../api";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import { useHistory, useParams } from "react-router-dom";
const UserEditForm = () => {
    const history = useHistory();
    const params = useParams();
    const { userId } = params;
    const [professions, setProfession] = useState(null);
    const [data, setData] = useState({
        name: "",
        email: "",
        profession: "",
        sex: "mail",
        qualities: []
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

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Email is required!"
            },
            isEmail: {
                message: "Email is not valid!"
            }
        },
        name: {
            isRequired: {
                message: "Name is required!"
            },
            isCapitalSymbol: {
                message: "Name must contain a minimum of 1 upper case letter!"
            },
            min: {
                message: "Passwords must be at least 3 characters!",
                value: 3
            }
        },
        profession: {
            isRequired: {
                message: "Profession is required"
            }
        },
        license: {
            isRequired: {
                message: "Вы не можете использовать наш сервис без подтверждения лицензионного соглашения"
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValidate = validate();
        if (!isValidate) return;
        const { profession, qualities } = data;
        api.users.update(userId, {
            ...data,
            profession: getProfessionById(profession),
            qualities: getQualities(qualities)
        });
        history.replace(`/users/${userId}`);
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
