const { celebrate, Joi, errors, Segments } = require('celebrate');

const register = () => {
    return celebrate({
        [Segments.BODY]: Joi.object({
            username: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required().regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/),
            confirmPassword: Joi.ref('password'),
        })
    })
}

const login = () => {
    return celebrate({
        [Segments.BODY]: Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required()
        })
    })
}

const forgotPassword = () => {
    return celebrate({
        [Segments.BODY]: Joi.object({
            email: Joi.string().email().required()
        })
    })
}

module.exports = {
    register,
    login,
    forgotPassword
}