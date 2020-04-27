var logger=require("winston");
var pool= require("../db");

exports.create_customer=async function(req, res, next){
    const client = await pool.connect();
    try{
        await client.query('BEGIN');
        logger.info(req.body);
        const { firstname, lastname, homephone, workphone, cellphone, email, createdby, address1, address2, city, state, country, zipcode } = req.body;        
        const newCustomer = await client.query(" INSERT INTO customer (firstname, lastname, homephone, workphone, cellphone, email, createdby) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING customerid", 
            [firstname, lastname, homephone, workphone, cellphone, email, createdby]);
        
        const newAddress = await client.query(" INSERT INTO address (customerid, address1, address2, city, state, country, zip, primaryaddress) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
            [newCustomer.rows[0].customerid, address1, address2, city, state, country, zipcode, true]);

        await client.query('COMMIT');
        res.json(newCustomer.rows[0]);
    }
    catch(err){
        await client.query('ROLLBACK');
        next(err);
    }
    finally {
       client.release()
    }
};

exports.get_allCustomers= async function(req, res, next){
    try{
        const allCustomers= await pool.query("SELECT customer.*, address.addressid, address.address1, address.address2, address.city, address.state, address.country, address.zip FROM customer JOIN address ON customer.customerid=address.customerid WHERE address.primaryaddress IS TRUE ORDER BY customerid");
        res.json(allCustomers.rows);
    }catch(err) {
        next(err);
    }
}

exports.get_customer= async function(req, res, next){
    try{
        logger.info(req.params);
        const { id } = req.params;
        const customer= await pool.query("SELECT customer.*, address.addressid, address.address1, address.address2, address.city, address.state, address.country, address.zip FROM customer JOIN address ON customer.customerid=address.customerid WHERE address.primaryaddress IS TRUE AND customer.customerid=$1",
            [id]);
        res.json(customer.rows);
    }catch(err){
        next(err);
    }
}

exports.get_findcustomer= async function(req, res, next){
    try{
        for (const key in req.query) {
            logger.info("Key: "+key+", Value: "+req.query[key]);
          }
        const { homephone, firstname, email } = req.query;
        var query="SELECT customer.*, address.addressid, address.address1, address.address2, address.city, address.state, address.country, address.zip FROM customer JOIN address ON customer.customerid=address.customerid WHERE address.primaryaddress IS TRUE AND customer.phone=$1 AND customer.firstname=$2";
        var selectCustomerValues = [homephone, firstname];        

        if(email !== undefined && email !== '')
        {
            query+=" AND customer.email=$3";
            selectCustomerValues.push(email);
        }
        const customer= await pool.query(query,
            selectCustomerValues);
        res.json(customer.rows);
    }catch(err){
        next(err);
    }
}

exports.update_customer= async function(req, res,next){
    const client = await pool.connect();
    try{
        logger.info(req.params);
        await client.query('BEGIN');
        
        const { id } = req.params;
        const { firstname, lastname, homephone, workphone, cellphone, email, address1, address2, city, state, country, zipcode }=req.body;
        const customer= await client.query("UPDATE customer SET firstname=$1, lastname=$2, homephone=$3, email=$4, updated=$5 WHERE customerid=$6",
            [firstname, lastname, homephone, workphone, cellphone, email, new Date(), id]);
        const address= await client.query("UPDATE address SET address1=$1, address2=$2, city=$3, state=$4, country=$5, zip=$6 WHERE customerid=$7",
            [address1, address2, city, state, country, zipcode, id]);

        await client.query('COMMIT');
        res.json({"msg":"Customer with id: "+id+" was updated"});
    }catch(err){
        await client.query('ROLLBACK');
        next(err);
    }
    finally {
       client.release();
    }
}

exports.delete_customer= async function(req, res, next){
    const client = await pool.connect();
    try{
        logger.info(req.params);
        await client.query('BEGIN');
        const { id } = req.params;
        const address= await pool.query("DELETE FROM address WHERE customerid=$1",
            [id]);
        const customer= await pool.query("DELETE FROM customer WHERE customerid=$1",
            [id]);
        await client.query('COMMIT');        
        res.json({"msg":"Customer with id: "+id+" was deleted"});
    }catch(err){
        await client.query('ROLLBACK');
        next(err);
    }
    finally {
        client.release();
     }
}
