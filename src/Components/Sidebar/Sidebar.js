import React from 'react';
import classes from './Sidebar.module.css';
import BackDrop from '../UI/BackDrop/BackDrop';
import CurrentCity from '../../Container/CurrentCity/CurrentCity';
import MoreCities from '../../Container/MoreCities/MoreCities';
import Button from '../Button/Button';
import AddCity from '../UI/AddCity/AddCity';
import {Link} from 'react-router-dom'
const Sidebar = (props) => {
    const addCityDisplay = props.showAddCity ? <AddCity clickCancelButton = {props.clickCancelButton} clickAddCityButton = {props.clickAddCityButton}/> : null;
    const assignClasses = props.showSidebar ? [classes.Sidebar, classes.Show] : [classes.Sidebar, classes.Hide]   
   
   return(
            <React.Fragment>
                <BackDrop showSidebar = {props.showSidebar}/>
                <div className = {assignClasses.join(' ')}>
                    <CurrentCity currentCity = {props.currentCity} clickCity = {props.clickCity}/>
                    <MoreCities cityList = {props.cityList} clickDeleteButton = {props.clickDeleteButton}  clickCity = {props.clickCity}/>
                    <Link to= {props.isAuthenticated ? '/' : '/signin'}>
                        <Button name = {props.isAuthenticated ? '+' : 'SIGNIN'} clicked = {props.clickAddButton} disable = {false} show custom = {false}/>  
                    </Link>                
                </div>
                {addCityDisplay}
            </React.Fragment>       
    )
}

export default Sidebar;