import React from 'react';
import classes from './Toolbar.module.css';
import ToggleButton from './ToggleButton/ToggleButton';
import Logo from './Logo/Logo';
const Toolbar = (props) => {
    return(
        <div className = {classes.Toolbar}>
            <ToggleButton clickToggleButton = {props.clickToggleButton}/>
            <Logo/>
        </div>
    )
}

export default Toolbar;