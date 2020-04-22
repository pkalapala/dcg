import React, {Fragment} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './App.css';

// Components
import InputCustomer from "./components/customers/InputCustomer";
import ListCustomers from "./components/customers/ListCustomers";
import FindCustomer from "./components/customers/FindCustomer/FindCustomer";
import Home from "./components/Home/Home";
import Toolbar from "./components/Toolbar/Toolbar";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  return (
    <Router>
      <Fragment>
        <div style={{height: '100%'}}>
          <Toolbar/>         
          <Sidebar/>                 
        </div>
        
        <div className="container App-margin">
          <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/customers/add" exact component={InputCustomer} />
              <Route path="/customers/list" exact component={ListCustomers} />
              <Route path="/customers/search" exact component={FindCustomer} />
          </Switch>
        </div>
        
      </Fragment>
    </Router>
  );
}

export default App;
