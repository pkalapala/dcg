import React from 'react';
import './Toolbar.css';
import Logo from './lazboylogo.gif';
import DrawerToggleButton from '../Sidebar/DrawerToggleButton';

const Toolbar = props => (
    <header className="toolbar">
        <nav className="toolbar_navigation">
            <div>
                <DrawerToggleButton />
            </div>
            <div className="toolbar_title"><a href="/">CMS - Customer Management System</a></div>  
            <div className="spacer"/>
            <div><img src={Logo} alt="Logo" style={{width: 250, height: 50}}/></div>          
        </nav>
    </header>
);

export default Toolbar;