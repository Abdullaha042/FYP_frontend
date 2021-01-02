import React from 'react'

function Roles() {
    return ( <
        div >
        <
        form action = "" >
        <
        h1 >
        Roles <
        /h1> <
        div className = " input_div col-12"
        role = "group" >
        <
        button className = "btn btn-dark col-md-3 col-sm-10" > User < /button> <
        button className = "btn btn-dark col-md-3 col-sm-10" > Thing < /button> <
        button className = "btn btn-dark col-md-3 col-sm-10" > Depatrment < /button>
         <
        /div><br / >
        <
        h1 >
        Add User <
        /h1> <
        div className = "input_div" >
        <
        input className = "input1"
        type = "text"
        placeholder = "First Name" / >
        <
        input className = "inout2"
        type = "password"
        placeholder = "Last Name" / >
        <
        /div> <
        div className = "input_div" >
        <
        input type = "text"
        placeholder = "Department" / >
        <
        input type = "password"
        placeholder = "Company" / >
        <
        /div> <
        div className = "input_div" >
        <
        input type = "text"
        placeholder = "City" / >
        <
        input type = "password"
        placeholder = "Postal" / >
        <
        /div> <
        div className = "input_div" >
        <
        input type = "text"
        placeholder = "Email" / >
        <
        input type = "password"
        placeholder = "Phone Number" / >
        <
        /div> <
        div className = "login-btns input_div" >
        By signing up I agree to the <
        a style = {
            { color: "blue" } } > terms of service and privac policy < /a> <
        button type = ""
        className = "signup-btn btn btn-dark" > Register User < /button> <
        /div> <
        /form> <
        /div>
    )
}


export default Roles