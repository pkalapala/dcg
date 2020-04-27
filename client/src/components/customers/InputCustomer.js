import React, {Fragment, useState} from "react";

const InputCustomer = () => {

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [homephone, setHomephone] = useState("");
    const [email, setEmail] = useState("");

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = { firstname, lastname, homephone, email, address1, address2, city, state, country,  zipcode };
            const response = await fetch("http://localhost:5000/api/customers",{
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            
            window.location="/";
        }
        catch(err){
            console.error(err.message);
        }
    }

    return (
    <Fragment>
        <h2 className="text-center mt-5">Add New Customer Information</h2>
        <form onSubmit={onSubmitForm}>
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
                    <label for="homephone">Home Phone</label>
                    <input type="tel" className="form-control" id="homephone" aria-describedby="homephoneHelp" placeholder="Home Phone #" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" value={homephone} onChange={e => setHomephone(e.target.value)}/>
                    <small id="homephoneHelp" className="form-text text-muted">Format: 555-55-5555</small>
                </div>
            </div>
            <div class="form-group row">
                <div class="col-sm-6">
                    <label for="email">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)}/>
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
            </div>
            
            <button className="btn btn-success">Add</button>
        </form>
    </Fragment>
    );
};

export default InputCustomer;