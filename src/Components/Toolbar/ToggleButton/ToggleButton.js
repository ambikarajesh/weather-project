import React from 'react';
import classes from './ToggleButton.module.css';
const ToggleButton = (props) => {
    return(
        <div className = {classes.ToggleButton} onClick ={props.clickToggleButton}> 
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

export default ToggleButton;