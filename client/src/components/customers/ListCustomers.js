import React, {Fragment, useEffect, useState} from "react";
import EditCustomer from "./EditCustomer";

const ListCustomers = () => {

    const [customers, setCustomers] = useState([]);

    // delete Customer Record
    const deleteCustomer = async id => {
        try {
            console.log(id);
            const deleteCustomer=await fetch('http://localhost:5000/customers/'+id, {
                method:"DELETE"
            });

            console.log(deleteCustomer);

            setCustomers(customers.filter(customer => customer.customerid!==id ));
        }catch(err){
            console.error(err.message);
        }
    }

    // Get All Customer Records
    const getCustomers = async () => {
        try{
            const response= await fetch("http://localhost:5000/customers");
            const jsonData= await response.json();

            setCustomers(jsonData);
        } catch(err) {
            console.log(err.message);
        }
    }
    
    useEffect(() => {
        getCustomers();
    }, []);
    
    console.log(customers);

    return (
    <Fragment>
        {" "}
        <h2 className="mt-5">List of Customers</h2>
        <p style={{marginTop: '30px'}}>DCG has the following customers</p>            
        <table class="table table-striped table-bordered text-center" cellspacing="0" width="100%">
            <thead>
                <tr>
                    <th>Firstname</th>
                    <th>Lastname</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {customers.map(customer => (
                    <tr key={customer.customerid}>
                        <td>{customer.firstname}</td>
                        <td>{customer.lastname}</td>
                        <td>{customer.phone}</td>
                        <td>{customer.email}</td>
                        <td><EditCustomer customer={customer}/></td>
                        <td><button className="btn btn-danger" onClick={() => deleteCustomer(customer.customerid)}>Delete</button></td>
                    </tr>   
                ))}          
            </tbody>
        </table>
    </Fragment>
    );
}

export default ListCustomers;