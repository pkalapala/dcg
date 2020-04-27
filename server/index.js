var express = require("express");
var cors = require("cors");
var logger=require("winston");
var config = require('./environments');

var app = express();

// middleware 
app.use(cors());
// to get the params from the req.body object
app.use(express.json());

// Routes //
var customerRouter=require("./routes/customer");
app.use('/api/customers',customerRouter);


const port = config.server_port || 3000;
app.listen(port, () => {
    console.log(`Server has started on port ${port}`);
})