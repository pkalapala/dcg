import React, {Fragment, useState} from "react";

const EditCustomer = ({customer}) => {
    const [firstname, setFirstname] = useState(customer.firstname);
    const [lastname, setLastname] = useState(customer.lastname);
    const [address1, setAddress1] = useState(customer.address1);
    const [address2, setAddress2] = useState(customer.address2);
    const [city, setCity] = useState(customer.city);
    const [state, setState] = useState(customer.state);
    const [country, setCountry] = useState(customer.country);
    const [zipcode, setZipcode] = useState(customer.zip);
    const [phone, setPhone] = useState(customer.phone);
    const [email, setEmail] = useState(customer.email);  

    // Update the Customer Record

    const updateCustomer= async e => {
        try {
            const body = { firstname, lastname, phone, email, address1, address2, city, state, country,  zipcode };
            const response = await fetch(`http://localhost:5000/customers/${customer.customerid}`,
                {
                    method: "PUT",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(body)
                });
        }catch(err){
            console.error(err.message);
        }
    }

    return (
        <Fragment>            
            <button type="button" class="btn btn-warning" data-toggle="modal" data-target={`#id${customer.customerid}`}>
                Edit
            </button>

            {/* 
                id= id10
            */}
            <div class="modal fade" id={`id${customer.customerid}`} tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
                aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header text-center">
                            <h4 class="modal-title w-100 font-weight-bold">Edit Customer Info</h4>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body mx-3 text-left">                            
                            <div class="form-group row">
                                <div class="col-sm-6">
                                    <label for="firstname">First Name</label>
                                    <input type="text" className="form-control" id="firstname" placeholder="First Name" value={firstname} onChange={e => setFirstname(e.target.value)}/>
                                </div>
                                <div class="col-sm-6">
                                    <label for="lastname">Last Name</label>
                                    <input type="text" className="form-control" id="lastname" placeholder="Last Name" value={lastname} onChange={e => setLastname(e.target.value)}/>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-6">
                                    <label for="address1">Address</label>
                                    <input type="text" class="form-control" id="address1" placeholder="Street Address" value={address1} onChange={e => setAddress1(e.target.value)}/>
                                </div>
                                <div class="col-sm-6">
                                    <label for="address2">Address (Line 2)</label>
                                    <input type="text" class="form-control" id="address2" placeholder="Line 2" value={address2} onChange={e => setAddress2(e.target.value)}/>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-6">
                                    <label for="city">City</label>
                                    <input type="text" class="form-control" id="city" placeholder="City" value={city} onChange={e => setCity(e.target.value)}/>
                                </div>
                                <div class="col-sm-3">
                                    <label for="state">State</label>
                                    <input type="text" class="form-control" id="state" placeholder="State" value={state} onChange={e => setState(e.target.value)}/>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-3">
                                    <label for="country">Country</label>
                                    <input type="text" class="form-control" id="country" placeholder="Country" value={country} onChange={e => setCountry(e.target.value)}/>
                                </div>
                                <div class="col-sm-3">
                                    <label for="zipcode">Zip Code</label>
                                    <input type="text" class="form-control" id="zipcode" placeholder="Zip Code" value={zipcode} onChange={e => setZipcode(e.target.value)}/>
                                </div>
                            </div>                        
                            <div class="form-group row">
                                <div class="col-sm-6">
                                    <label for="phone">Phone</label>
                                    <input type="tel" className="form-control" id="phone" aria-describedby="phoneHelp" placeholder="Phone #" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" value={phone} onChange={e => setPhone(e.target.value)}/>
                                    <small id="phoneHelp" className="form-text text-muted">Format: 555-55-5555</small>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-6">
                                    <label for="email">Email address</label>
                                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)}/>
                                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                                </div>
                            </div>
                        </div>

                        {/* Modal footer */}
                        <div class="modal-footer d-flex">
                            <button type="button" class="btn btn-warning" data-dismiss="modal" onClick = {e => updateCustomer(e)}>Edit</button>
                            <button type="button" class="btn btn-danger" data-dismiss="modal" 
                                onClick = {() => {
                                    setFirstname(customer.firstname);
                                    setLastname(customer.lastname);
                                    setPhone(customer.phone);
                                    setEmail(customer.email);
                                    setAddress1(customer.address1);
                                    setAddress2(customer.address2);
                                    setCity(customer.city);
                                    setState(customer.setState);
                                    setZipcode(customer.setZipcode);
                                }
                            }
                            >Close</button>
                        </div>

                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default EditCustomer;