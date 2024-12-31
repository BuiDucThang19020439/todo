const Joi = require('joi');

const registerValidator = (data) => {
    const rule = Joi.object({
        userId: Joi.string().min(5).max(255).required(),
        userName: Joi.string().min(5).max(255).required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,20}$')).min(5).max(255).required(),
        phone: Joi.string(),
        email: Joi.string().email(),
    });
    return rule.validate(data);
}

module.exports.registerValidator = registerValidator;