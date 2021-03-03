const Joi = require('joi');

module.exports = Joi.object({
    model: Joi.string().alphanum().min(2).max(50),
    price: Joi.number().positive().min(1500).max(15000000)
});
