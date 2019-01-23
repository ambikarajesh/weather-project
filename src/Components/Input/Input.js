import React from 'react';
import classes from './Input.module.css';


const Input  = (props) => {
    let inputElement = null;
    switch(props.elementType){
        case 'input':
            inputElement = <div>
                                <input className = {classes.InputBox} {...props.elementConfig} value = {props.value} onChange ={props.changed}/>
                                {!props.valid ? <p style ={{fontSize:'10px', color:'red'}}>{props.error}</p>:null}
                            </div>
                            
            break;
        default:
            return false;
    }
    return inputElement;
}

export default Input;