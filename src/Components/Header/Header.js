import React from 'react';
import classes from './Header.module.css';

const Header = (props) => {

    const Description = props.HeaderData.Description.join(', ');
    return(
        <div className = {classes.Header}>
            <p className = {classes.City}>{props.HeaderData.City}</p>
            <p className = {classes.Description}>{Description}</p>
            <p className = {classes.Temp }>{props.HeaderData.Temp}&deg;</p>
        </div>
    )
}

export default Header;