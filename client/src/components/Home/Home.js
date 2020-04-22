import React from 'react';
import './Home.css';
import Lazboyhq from './lazboyhq.jpg';

const Home = () => (    
    <div className="container home">
        <p>Welcome to La-Z-Boy Customer Management System(CMS)!</p>          
        <div>
            <img src={Lazboyhq} alt="Logo" style={{width: 1000, height: 800}}/>
        </div> 
    </div> 
);

export default Home;
