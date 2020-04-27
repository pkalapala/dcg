CREATE TABLE public.customer
(
    customerid bigserial NOT NULL,
    firstname VARCHAR NOT NULL,
    lastname VARCHAR, 
    homephone VARCHAR NOT NULL,    
    workphone VARCHAR,
    cellphone VARCHAR,
    email VARCHAR,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    createdby BIGINT,
    updated TIMESTAMP,
    updatedby BIGINT,
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