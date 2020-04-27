import React from 'react';
import './Home.css';
import Lazboyhq from './DesignCenter.jpg';

const Home = () => (    
    <div className="container home">
        <p>Welcome to La-Z-Boy Digital Comfort Guide(DCG)!</p>          
        <div>
            <img src={Lazboyhq} alt="Logo" style={{width: 1000, height: 800}}/>
        </div> 
    </div> 
);

export default Home;
