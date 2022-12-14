export const validatorConfig = {
    email: {
        isRequired: {
            message: "Email is required!"
        },
        isEmail: {
            message: "Email is not valid!"
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
    }
};
