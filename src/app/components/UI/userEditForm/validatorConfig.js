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
