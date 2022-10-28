import React, { useEffect, useState } from "react";
import { validator } from "../../../utils/validator";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import { useHistory } from "react-router-dom";
import { useProfessions } from "../../../hooks/useProfession";
import { useQualities } from "../../../hooks/useQualities";
import { transformArrayData } from "../../../utils/transformArray";
import { useAuth } from "../../../hooks/useAuth";
import BackButton from "../../common/backButton";
import { validatorConfig } from "./utils/validatorConfig";
import Loader from "../../UI/Loader/Loader";
const UserEditPage = () => {
    const history = useHistory();

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(null);
    const [errors, setErrors] = useState({});
    const { currentUser, updateUserData } = useAuth();
    const { professions, isLoading: professionLoading } = useProfessions();
    const professionsList = transformArrayData(professions);
    const { qualities, isLoading: qualitiesLoading, getQualitiesListByIds } = useQualities();
    const qualitiesList = transformArrayData(qualities);

    useEffect(() => {
        if (!professionLoading && !qualitiesLoading && currentUser && !data) {
            setData({
                ...currentUser,
                qualities: transformArrayData(getQualitiesListByIds(currentUser.qualities))
            });
        }
    }, [professionLoading, qualitiesLoading, currentUser, data]);
    useEffect(() => {
        if (data && isLoading) {
            setIsLoading(false);
        }
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
            await updateUserData(newData);
            history.replace(`/users/${currentUser._id}`);
        } catch (error) {
            setErrors(error);
        }
    };

    return (
        <div className="container mt-5">
            <BackButton/>
            <div className="row">
                <div className="col-md-6 offset-md-3 p-4 shadow">
                    <h3 className="mb-4">Edit User</h3>
                    {!isLoading && Object.keys(professions).length > 0
                        ? <form onSubmit={handleSubmit}>
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
                        : <Loader/>
                    }
                </div>
            </div>
        </div>
    );
};

export default UserEditPage;
