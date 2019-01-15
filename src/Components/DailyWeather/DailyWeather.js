import React from 'react';
import classes from './DailyWeather.module.css';
const DailyWeather = (props) =>{
   const  days = props.dailyWeather.map((list,i) =>{
        return list.day
    })
    const day = days.filter((d,i)=>{
        return days.indexOf(d) >=i
    })
    const data = day.map((d,i)=>{
        const day = d
        const temp = [];
        const icon = [];
        props.dailyWeather.forEach(weather =>{
            if(d === weather.day){
                icon.push(weather.icon);
                temp.push(weather.temp);
            }
        })
        return {d:day,
                min:Math.min(...temp),
                max:Math.max(...temp),
                i:icon[temp.indexOf(String(Math.max(...temp)))]
                }
    })
    
    const lists = data.map((item, c) =>{
         const src = "http://openweathermap.org/img/w/"+item.i+".png";
            return <li key ={item+c}>
                <span>{item.d} </span>
                <span><img src ={src}  alt = {item.i}/> </span>
                <span>{item.min}&deg; </span>
                <span>{item.max}&deg; </span>
            </li>
    })
    
    return(
        <ul className = {classes.DailyWeather}>
            {lists}
        </ul>
    )
}


export default DailyWeather;
