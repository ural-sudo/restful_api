const { body, validationResult} = require('express-validator');
const ValidationString = require('../constants/string-constants');

exports.emailValidator = (value) => {
    const checkValue = body(value)
    .isEmail().withMessage(ValidationString.notEmial)
    .notEmpty().withMessage(ValidationString.emptyEmail)
    .contains('@').withMessage(ValidationString.notEmial)
    .isLength({max:100,min:1})
    .trim().withMessage("Boşluk koyamazsın")
    return checkValue;
};




