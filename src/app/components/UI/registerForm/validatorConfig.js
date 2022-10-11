export const validatorConfig = {
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
            message: "Имя обязательно для заполнения"
        },
        min: {
            message: "Имя должно состоять минимум из 3 символов",
            value: 3
        }
    },
    password: {
        isRequired: {
            message: "Password is required!"
        },
        isCapitalSymbol: {
            message: "Password must contain a minimum of 1 upper case letter!"
        },
        isContainDigit: {
            message: "Password must contain a minimum of 1 digit!"
        },
        min: {
            message: "Passwords must be at least 8 characters!",
            value: 8
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
