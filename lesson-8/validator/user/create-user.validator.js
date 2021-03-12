const Joi = require('joi');

const { regexEnum } = require('../../constant');

module.exports = Joi.object({
    name: Joi.string().alphanum().min(2).max(20),
    email: Joi.string().regex(regexEnum.EMAIL_REGEXP),
    password: Joi.string().regex(regexEnum.PASSWORD_REGEXP)
});
