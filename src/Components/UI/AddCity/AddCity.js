import React from 'react';
import classes from './AddCity.module.css';
import SearchLocation from '../../../Container/SearchLocation/SearchLocation';
const AddCity = (props) => {
    return(
        <div className = {classes.AddCity}>
           <div className = {classes.Form}>
                <SearchLocation  clickCancelButton = {props.clickCancelButton} clickAddCityButton = {props.clickAddCityButton}/>
           </div>
        </div>
    )
}

export default AddCity;