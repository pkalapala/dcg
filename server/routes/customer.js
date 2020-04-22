var express=require("express");
var router=express.Router();

let customer=require("../controllers/customer");

router.post("/", customer.create_customer);
router.get("/", customer.get_allCustomers);
router.get("/:id", customer.get_customer);
router.put("/:id", customer.update_customer);
router.delete("/:id", customer.delete_customer);

module.exports=router;