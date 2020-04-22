CREATE TABLE public.customer
(
    customerid bigserial NOT NULL,
    firstname VARCHAR,
    lastname VARCHAR, 
    phone VARCHAR,    
    email VARCHAR,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (customerid)
);
CREATE TABLE public.address
(
    addressid bigserial NOT NULL,
    customerid BIGINT REFERENCES customer(customerid),
    address1 VARCHAR,
    address2 VARCHAR,
    city VARCHAR,
    state VARCHAR,
    zip VARCHAR,
    country VARCHAR,
    primaryaddress BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (addressid)
);