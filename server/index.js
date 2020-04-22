var express = require("express");
var cors = require("cors");
var logger=require("winston");

var app = express();

// middleware 
app.use(cors());
// to get the params from the req.body object
app.use(express.json());

// Routes //
var customerRouter=require("./routes/customer");
app.use('/customers',customerRouter);
// Create a Customer

// Get all Customers

// Get Selected Customer

// Update a customer

// Delete a customer


app.listen(5000, () => {
    console.log("Server has started on port 5000");
})