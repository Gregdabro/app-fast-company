export const validatorConfig = {
    userId: {
        isRequired: {
            message: "Выбирите пользователя от чьего имени хотите отправить сообщение"
        }
    },
    content: {
        isRequired: {
            message: "Cообщение не должно быть пустым"
        }
    }
};
