var logger=require("winston");
var pool= require("../db");
const { validationResult } = require('express-validator');

exports.create_customer=async function(req, res){
    const client = await pool.connect();
    try{
        await client.query('BEGIN');
        logger.info(req.body);
        const { firstname, lastname, phone, email, address1, address2, city, state, country, zipcode } = req.body;        
        const newCustomer = await client.query(" INSERT INTO customer (firstname, lastname, phone, email) VALUES($1, $2, $3, $4) RETURNING customerid", 
            [firstname, lastname, phone, email]);
        
        const newAddress = await client.query(" INSERT INTO address (customerid, address1, address2, city, state, country, zipc, primaryaddress) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
            [newCustomer.rows[0].customerid, address1, address2, city, state, country, zipcode, true]);

        await client.query('COMMIT');
        res.json(newCustomer.rows[0]);
    }
    catch(err){
        await client.query('ROLLBACK');
        logger.error(err.message);
        res.json(err);
    }
    finally {
       client.release()
    }
};

exports.get_allCustomers= async function(req, res){
    try{
        const allCustomers= await pool.query("SELECT customer.*, address.addressid, address.address1, address.address2, address.city, address.state, address.country, address.zip FROM customer JOIN address ON customer.customerid=address.customerid WHERE address.primaryaddress IS TRUE ORDER BY customerid");
        res.json(allCustomers.rows);
    }catch(err) {
        logger.error(err.message);
        res.json(err);
    }
}

exports.get_customer= async function(req, res){
    try{
        logger.info(req.params);
        const { id } = req.params;
        const customer= await pool.query("SELECT customer.*, address.addressid, address.address1, address.address2, address.city, address.state, address.country, address.zip FROM customer JOIN address ON customer.customerid=address.customerid WHERE address.primaryaddress IS TRUE AND customer.customerid=$1",
            [id]);
        res.json(customer.rows);
    }catch(err){
        logger.error(err.message);
        res.json(err);
    }
}

exports.get_findcustomer= async function(req, res){
    try{
        for (const key in req.query) {
            logger.info("Key: "+key+", Value: "+req.query[key]);
          }
        const { phone, lastname } = req.query;
        var query="SELECT customer.*, address.addressid, address.address1, address.address2, address.city, address.state, address.country, address.zip FROM customer JOIN address ON customer.customerid=address.customerid WHERE address.primaryaddress IS TRUE AND customer.phone=$1";
        var selectCustomerValues = [phone];        

        if(lastname !== undefined && lastname !== '')
        {
            query+=" AND customer.lastname=$2";
            selectCustomerValues.push(lastname);
        }
        const customer= await pool.query(query,
            selectCustomerValues);
        res.json(customer.rows);
    }catch(err){
        logger.error(err.message);
        res.json(err);
    }
}

exports.update_customer= async function(req, res){
    const client = await pool.connect();
    try{
        logger.info(req.params);
        await client.query('BEGIN');
        
        const { id } = req.params;
        const { firstname, lastname, phone, email, address1, address2, city, state, country, zipcode }=req.body;
        const customer= await client.query("UPDATE customer SET firstname=$1, lastname=$2, phone=$3, email=$4, updated=$5 WHERE customerid=$6",
            [firstname, lastname, phone, email, new Date(), id]);
        const address= await client.query("UPDATE address SET address1=$1, address2=$2, city=$3, state=$4, country=$5, zip=$6 WHERE customerid=$7",
            [address1, address2, city, state, country, zipcode, id]);

        await client.query('COMMIT');
        res.json("Customer with id: "+id+" was updated");
    }catch(err){
        await client.query('ROLLBACK');
        logger.error(err.message);
        res.json(err);
    }
    finally {
       client.release()
    }
}

exports.delete_customer= async function(req, res){
    try{
        logger.info(req.params);
        const { id } = req.params;
        const customer= await pool.query("DELETE FROM customer WHERE customerid=$1",
            [id]);
            res.json("Customer with id: "+id+" was deleted");
    }catch(err){
        logger.error(err.message);
        res.json(err);
    }
}
