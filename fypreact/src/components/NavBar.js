import React, { useState } from 'react';
import './NavBar.css';
import { faBars, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Route,
    NavLink,
    HashRouter
} from "react-router-dom";
import SignUpModal from "./SignUpModal";
import SignIn from "./SignIn";

function NavBar() {
    const [open, setOpen] = useState(false);

    return ( <
        HashRouter >
        <
        div >
        <
        div className = "container-lg container-fluid-md" >
        <
        div className = "nav-top " >
        <
        div className = "logo" >

        <
        /div> <
        ul className = "nav-top-links" >
        <
        FontAwesomeIcon icon = { faHome }
        /> <
        FontAwesomeIcon icon = { faHome }
        />

        <
        /ul> <
        /div> <
        nav >
        <
        div className = "logo" >
        React <
        /div> <
        ul className = "nav-links"
        style = {
            { transform: open ? "translateX(0px)" : "" } } >

        <
        li > < NavLink to = "/"
        style = {
            { textDecoration: "none", color: "white" } } > Sign In < /NavLink></li >
        <
        li > < NavLink to = "/SignUpModal"
        style = {
            { textDecoration: "none", color: "white" } } > Sign Up < /NavLink></li >

        <
        /ul> <
        FontAwesomeIcon icon = { faBars }
        className = "home-bar"
        onClick = {
            () => setOpen(!open) }
        /> <
        /nav> <
        /div> <
        div className = "content" >
        <
        Route exact path = "/"
        component = { SignIn }
        /> <
        Route path = "/SignUpModal"
        component = { SignUpModal }
        />

        <
        /div>

        <
        /div> <
        /HashRouter>
    )
}

export default NavBar