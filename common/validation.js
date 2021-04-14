const Joi = require('@hapi/joi');


const registerValidator = (i) => {
    const validationSchema = Joi.object({
    username : Joi.string()
        .min(6)
        .required(),
    password : Joi.string()
        .min(8)
        .required(),
    email : Joi.string()
        .min(6)
        .email()
});
    return validationSchema.validate(i);
}
const loginValidator = (i) => {
    const validationSchema = Joi.object({
    username : Joi.string()
        .min(6)
        .required(),
    password : Joi.string()
        .min(8)
        .required()
    });
    return validationSchema.validate(i);
}

function articleValidator(i) {
    const validationSchema = Joi.object({
        title: Joi.string()
            .min(10)
            .max(100)
            .required(),
        body: Joi.string()
            .min(125)
            .required(),
    })
    return validationSchema.validate(i)
}
module.exports = {
    registerValidator: registerValidator,
    loginValidator: loginValidator,
    articleValidator: articleValidator
}