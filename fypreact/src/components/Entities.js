import React from 'react'
import {
    Route,
    NavLink,
    HashRouter,
    Switch
} from "react-router-dom";
import AddDepartmentEntity from './AddDepartmentEntity';
import AddThingEntity from './AddThingEntity';
import AddUserEntity from './AddUserEntity';
import AddInputFields from './AddInputFields';

function Entities() {
    return ( <
        HashRouter >
        <
        div >
        <
        div className = "form" >
        <
        h1 >
        Entities <
        /h1> <
        div className = " input_div col-12"
        role = "group" >
        <
        NavLink to = "/"
        style = {
            { textDecoration: "none", color: "white" } } > < button className = "btn btn-dark col-md-3 col-sm-10" > User/Staff < /button></NavLink >
        <
        NavLink to = "/AddThingEntity"
        style = {
            { textDecoration: "none", color: "white" } } > < button className = "btn btn-dark col-md-3 col-sm-10" > Thing < /button></NavLink >
        <
        NavLink to = "/AddDepartmentEntity"
        style = {
            { textDecoration: "none", color: "white" } } > < button className = "btn btn-dark col-md-3 col-sm-10" > Depatrment < /button></NavLink >
        <
        NavLink to = "/AddInputFields"
        style = {
            { textDecoration: "none", color: "white" } } > < button className = "btn btn-dark col-md-3 col-sm-10" > Add Fields < /button></NavLink >
        <
        /div> <
        /div> <
        div >
        <
        Route path = "/"
        exact component = { AddUserEntity }
        /> <
        Route path = "/AddThingEntity"
        exact component = { AddThingEntity }
        /> <
        Route path = "/AddDepartmentEntity"
        exact component = { AddDepartmentEntity }
        />
         <
        Route path = "/AddInputFields"
        exact component = { AddInputFields }
        />
         <
        /div> <
        /div> <
        /HashRouter>
    )
}


export default Entities