import React from 'react';
import './Toolbar.css';
import Logo from './lzblogo.png';
import DrawerToggleButton from '../Sidebar/DrawerToggleButton';

const Toolbar = props => (
    <header className="toolbar">
        <nav className="toolbar_navigation">
            <div>
                <DrawerToggleButton />
            </div>
            <div className="toolbar_title"><a href="/">DCG - Digital Comfort Guide</a></div>  
            <div className="spacer"/>
            <div><img src={Logo} alt="Logo" style={{width: 250, height: 100}}/></div>          
        </nav>
    </header>
);

export default Toolbar;