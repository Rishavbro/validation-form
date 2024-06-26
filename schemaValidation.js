const joi = require("joi");

module.exports.schemaValidation = joi.object({
    listing: joi.object({
        firstName:joi.string().required(),
        lastName:joi.string().required(),
        email:joi.string().email().required(),
        contact:joi.number().max(10).required(),
        password:joi.string().min(8).required()
    })

})