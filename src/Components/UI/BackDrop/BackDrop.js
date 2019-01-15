import React from 'react';
import classes from './BackDrop.module.css';


const BackDrop = (props) =>{
   return(
        props.showSidebar ? <div className ={classes.BackDrop}></div> : null
    )
}
export default BackDrop;