import React from 'react';
import classes from './Toolbar.module.css';
import ToggleButton from './ToggleButton/ToggleButton';
import Logo from './Logo/Logo';
import NavItems from './NavItems/NavItems';
const Toolbar = (props) => {
    return(
        <div className = {classes.Toolbar}>
            <ToggleButton clickToggleButton = {props.clickToggleButton}/>
            <Logo/>
            <NavItems isAuthenticated = {props.isAuthenticated}/>
        </div>
    )
}

export default Toolbar;