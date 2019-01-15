import React from 'react';
import classes from './Footer.module.css';

const Footer = (props) => {
        const FooterList = Object.keys(props.FooterData).map(item =>{
            return <li key ={item}><span className = {classes.Item}>{item}</span> : <span className ={classes.Value}>{props.FooterData[item]}</span></li>
        })
    return(
        <ul className = {classes.Footer}>
            {FooterList}
        </ul>
    )
}

export default Footer;