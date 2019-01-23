import React from 'react';
import NavItem from './NavItem/NavItem';
import classes from './NavItems.module.css';
const NavItems = (props) => {
    return(
        <ul className = {classes.NavItems}>
            <NavItem link = '/' exact >Home</NavItem>
            {!props.isAuthenticated 
            ? <NavItem link = '/signin'>SignUp/SignIn</NavItem>
            : <NavItem link = '/logout'>Logout</NavItem>}
        </ul>
       
    )
}

export default NavItems;