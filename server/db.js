const Pool=require("pg").Pool;

var config = require('./environments');

const pool=new Pool({
    user: config.dcg_user,
    password: config.dcg_password,
    host: config.dcg_host,
    port: config.dcg_port,
    database: config.dcg_database
});

module.exports=pool;