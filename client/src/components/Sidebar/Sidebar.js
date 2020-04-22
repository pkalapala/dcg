import React from 'react';
import './Sidebar.css';
import {Link} from "react-router-dom";

const Sidebar = props => (
    <nav className="side-bar">
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/customers/add">Add New Customer</Link></li>
            <li><Link to="/customers/list">List All Customers</Link></li>
            <li><Link to="/customers/search">Find Customer</Link></li>
        </ul>            
    </nav>
);

export default Sidebar;