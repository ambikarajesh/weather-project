import React from 'react';
import classes from './HourlyWeather.module.css';
const HourlyWeather = (props) => {
        
        const lists = props.hourlyWeather.map((list,i) =>{
            const src = "http://openweathermap.org/img/w/"+list.icon+".png";   
                         
            if(i<8){
                return <li key ={i}> 
                        <p className = {classes.Time}>{list.time}</p>
                        <p className = {classes.Image}><img src ={src}  alt = {list.icon}/></p>
                        <p className = {classes.Temp}>{list.temp}&deg;</p> </li>
            }else{
                return false;
            }
            
        })
    
    return(
        <ul className = {classes.HourlyWeather}>
            {lists}
        </ul>
    )
}

export default HourlyWeather;