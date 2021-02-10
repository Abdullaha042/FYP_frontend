import React from 'react'
import './Admin.css';
import Footer from './Footer.js';
import pic from '../image/adminpic.jpg'
import { faBars, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Route,
    NavLink,
    BrowserRouter
} from "react-router-dom";
import Entities from './Entities.js';
import Organogram from './Organo';

function Admin() {

    return ( <
        BrowserRouter >
        <
        div className="div_col">
        <
        div className="container-lg">
        <
        div className = "row-fluid main-pg" >
        <
        div className = "col-lg-4 offset-lg-0 offset-md-0 offset-sm-0 col-sm-12 col-md-12 main-pg-heading" >
        <
        h1 >
        Administrator <
        /h1> <
        div className = "img-div" >
        <
        img src = { pic }
        alt = "admin logo"
        style = {
            { color: "black" } }
        /> <
        /div> <
        div className = 'admin_detail' >
        <
        p > All the necessary information of the Administrator < br / > < br / >
        <
        a href = "#" > Name < /a><br / >
        <
        a href = "#" > Id < /a><br / >
        <
        a href = "#" > Change Password < /a><br / >
        <
        a href = "#" > Reset Password... < /a><br / > < /p> <
        /div>

        <
        /div> <
        div className = "col-lg-8 offset-lg-0 offset-md-0 offset-sm-0 col-sm-12 col-md-12 main-login-pg row" >
        <
        div className = "col-md-12 col-sm-12 main-login-sub-pg-1" >


       <NavLink to = "/Entities"
            style = {
            { textDecoration: "none", color: "white" } } >
            < button className = "btn btn-danger col-md-3 col-sm-10" >ENTITY< /button>
       </NavLink >


        <NavLink to = "/Organogram"
            style = {
                { textDecoration: "none", color: "white" } } >
                < button className = "btn btn-danger col-md-4 col-sm-10" >ORGANO< /button>
        </NavLink >


        </div> <
        div className = "col-md-7 col-sm-7 col-xs-5 main-login-sub-pg-2 row" >

        <Route path = "/"
        exact component = { Entities }
        />

        <Route path = "/Entities"
        exact component = { Entities }
        />
        <
        Route path = "/Organogram"
        exact component = { Organogram }
        />

        </div>
        <
        /div> <
        /div> <
        /div>

        <
        /div>

        <Footer />

        <
        /BrowserRouter>
    )
}

export default Admin