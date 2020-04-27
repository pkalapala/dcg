const { body, query, validationResult } = require('express-validator');

exports.customerValidationRules = (method) => {
  switch (method) {
    case 'create_customer': {
     return [ 
        body('firstname', "firstname is required").exists().notEmpty(),
        body('homephone', "Home phone is required").exists().notEmpty(),        
        body('email', "Invalid email").optional().isEmail()
       ];   
    }
    break;
    case 'get_findcustomer': {
      return [
        query('homephone', "phone is required").notEmpty(),
        query('firstname', "firstname is required").notEmpty(),
        query('email', 'Invalid email').optional().isEmail()
      ];
    }
    break;
    default :{
      return [];
    }
  }
}

exports.validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));
  
    return res.status(422).json({
      errors: extractedErrors,
    });
  }
  
