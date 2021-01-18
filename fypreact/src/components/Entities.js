import React from 'react'
import {
    Route,
    NavLink,
    HashRouter,
    Switch
} from "react-router-dom";
import AddDepartmentEntity from './AddDepartmentEntity';
import AddThingEntity from './AddThingEntity';
import AddUserEntity from './AddUserEntity'
import AddInputFields from './AddInputFields'

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
        NavLink to = "/Entities/AddUserEntity"
        style = {
            { textDecoration: "none", color: "white" } } > < button className = "btn btn-dark col-md-3 col-sm-10" > User < /button></NavLink >
        <
        NavLink to = "/Entities/AddThingEntity"
        style = {
            { textDecoration: "none", color: "white" } } > < button className = "btn btn-dark col-md-3 col-sm-10" > Thing < /button></NavLink >
        <
        NavLink to = "/Entities/AddDepartmentEntity"
        style = {
            { textDecoration: "none", color: "white" } } > < button className = "btn btn-dark col-md-3 col-sm-10" > Depatrment < /button></NavLink >
        <
        NavLink to = "/Entities/AddInputFields"
        style = {
            { textDecoration: "none", color: "white" } } > < button className = "btn btn-dark col-md-3 col-sm-10" > Add Input Fields < /button></NavLink >
        <
        /div> <
        /div> <
        div >
        <
        Route path = "Entities/AddUserEntity"
        component = { AddUserEntity }
        /> <
        Route path = "/AddThingEntity"
         component = { AddThingEntity }
        /> <
        Route path = "/AddDepartmentEntity"
         component = { AddDepartmentEntity }
        />
        <
        Route path = "/AddInputFields"
        component = { AddInputFields }
        />
         <
        /div> <
        /div> <
        /HashRouter>
    )
}


export default Entities