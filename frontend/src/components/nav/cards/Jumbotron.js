import React from 'react';
import './Jumbotron.css';
import backgroundImage from '../../../assessts/employe management.jpg';

const Jumbotron = () => {
    return (
        <div className="jumbotron-container" style={{backgroundImage: `url(${backgroundImage})`}}>
            <div className="overlay"></div>
            <div className="content">
                <h1>Employee Management</h1>
            </div>
        </div>
    );
}

export default Jumbotron;
