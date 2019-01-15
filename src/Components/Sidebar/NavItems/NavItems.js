import React from 'react';
import classes from './NavItems.module.css';
import NavItem from './NavItem/NavItem';
const NavItems = (props) => {
   const cityList = props.cities.map((city,i) =>{
       return <NavItem key = {i} city = {city} clickDeleteButton = { () => props.clickDeleteButton({id: city.id})}  clickCity = {() => props.clickCity({latitude:city.latitude, longitude: city.longitude})} show = {props.show} custom = {props.custom}/>
    })
    return(        
        <ul className = {classes.NavItems} style = {{color:'#fff'}}>
           {cityList}                    
        </ul>
       
    )
}

export default NavItems;