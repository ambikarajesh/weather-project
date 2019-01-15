import React from 'react';
import weatherLogo from '../../../Assets/Images/Weather-Logo.png';
import classes from './Logo.module.css';
const Logo = () => {
    return(
        <div className = {classes.Logo}>
           <img src = {weatherLogo} alt = 'Weather-Logo'/>
        </div>
    )
}

export default Logo;