import React from 'react';
import './Footer.css';
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Footer() {
    return ( <
        div >
        <
        div className = "container-lg" >

        <
        footer className = "row-fluid" >
        <
        div className = "main-footer col-md-5 col-sm-12" >
        <
        div >
        <
        h3 > Services < /h3> <
        p >
        In VS Code, open the Color Theme picker with File Preferences Color Theme....You can also use the keyboard shortcut Ctrl + K Ctrl + T to display the picker.Use the cursor keys to preview the colors of the theme.Select the theme you want and press Ente

        <
        /p>     <
        /div> <
        /div> <
        div className = "main-footer border-footer col-md-5 col-sm-12" >
        <
        div className = "sub-footer" >
        <
        h3 > Categories < /h3> <
        p > In VS Code, open the Color Theme picker with File Preferences Color Theme....You can also use the keyboard sh <
        /p> <
        /div> <
        div className = "sub-footer" >
        <
        h3 > Team < /h3> <
        p > Shortcut Ctrl + K Ctrl + T to display the picker.Use the cursor keys to preview the colors of the theme.Select the theme you want and press Ente <
        /p> <
        /div> <
        /div> <
        div className = "main-footer  col-md-2" >
        <
        ul >
        <
        li > < FontAwesomeIcon icon = { faHome }
        style = {
            { backgroundColor: "transparent" } }
        /></li >
        <
        button className = "main-footer-btn btn btn-dark" > Button < /button> <
        /ul>                     <
        /div> <
        /footer> <
        /div> <
        /div>
    )
}

export default Footer