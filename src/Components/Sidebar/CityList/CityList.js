import React from 'react';
import classes from './CityList.module.css';
import City from './City/City';
const CityList = (props) => {
   const cityList = props.cities.map((city,i) =>{
       return <City key = {i} city = {city} clickDeleteButton = { () => props.clickDeleteButton({id: city.id},props.token)}  clickCity = {() => props.clickCity({latitude:city.latitude, longitude: city.longitude})} show = {props.show} custom = {props.custom}/>
    })
    return(        
        <ul className = {classes.CityList} style = {{color:'#fff'}}>
           {cityList}                    
        </ul>
       
    )
}

export default CityList;