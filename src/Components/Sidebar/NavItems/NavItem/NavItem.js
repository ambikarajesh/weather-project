import React from 'react';
import classes from './NavItem.module.css';
import Button from '../../../Button/Button';
import {Link} from 'react-router-dom'
const NavItem = (props) => {
    const display = (<div onClick = {props.clickCity}>
                        <p className = {classes.Time}> {props.city.time}</p>
                        <p className = {classes.City}> {props.city.name} <strong style = {{paddingLeft:'20px', float:'right'}}> {props.city.temp} &deg;</strong></p>
                    </div>)
    return(
        <li className = {classes.NavItem} >
                <Link to = '/'>{display}</Link>
                <Button name = 'x' clicked = {props.clickDeleteButton} show = {props.show} disable = {false} custom/>
         </li>
    )
}

export default NavItem;