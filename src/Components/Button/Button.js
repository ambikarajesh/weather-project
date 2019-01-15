import React from 'react';
import classes from './Button.module.css';
const Button = (props) => {
    const style = props.show ? props.custom ? {display:'block', width:'30px', borderRadius:'5px 5px', float:'right'} :{display:'block'} : {display:'none'};
    return(
        <div  className = {classes.Button}>
           <button onClick = {props.clicked} style = {style} disabled = {props.disable}>{props.name}</button>
        </div>
    )
}

export default Button;