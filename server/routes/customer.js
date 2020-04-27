var express=require("express");
var router=express.Router();

let customer=require("../controllers/customer");
const { customerValidationRules, validate } = require('../middlewares/validator.js');
const errorHandler = require('../middlewares/errorHandler.js');

router.post("/", customerValidationRules('create_customer'), validate, customer.create_customer);
router.get("/", customer.get_allCustomers);
router.get("/find/*", customerValidationRules('get_findcustomer'), validate, customer.get_findcustomer);
router.get("/:id", customer.get_customer);
router.put("/:id", customer.update_customer);
router.delete("/:id", customer.delete_customer);

router.use(errorHandler.logErrors);
router.use(errorHandler.errorHandler);

module.exports=router;