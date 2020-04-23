const { body, validationResult } = require('express-validator');

exports.customerValidationRules = (method) => {
  switch (method) {
    case 'create_customer': {
     return [ 
        body('phone', "phone doesn't exists").exists().notEmpty(),
        body('email', 'Invalid email').optional().isEmail()
       ]   
    }
  }
}

exports.validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
  
    return res.status(422).json({
      errors: extractedErrors,
    })
  }
  
