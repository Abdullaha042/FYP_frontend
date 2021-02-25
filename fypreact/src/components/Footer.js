import React from 'react';
import './Footer.css';
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Footer() {
    return ( <
        div >
        <
        div className = "" >

        <
        footer className = "row-fluid" >
        <
        div className = "main-footer col-md-5 col-sm-12" >
        <
        div >
        <
        h3 > Services < /h3>
        <p>

        Development Authorities have no of departments which shares information among themselves. A Web based application in which Land, Town, Civil and Marketing departments of a society collaborate with each other for the construction and development. The land department purchases land and handover to the town department which decides plots on the purchased land. The planned document delivers to the Civil department to execute the work and Marketing department for marketing.

        </p>
        </div> <
        /div> <
        div className = "main-footer border-footer col-md-5 col-sm-12" > <
        div className = "sub-footer" >
        <
        h3 > Team < /h3>
        <p>
        <li>Abdullah Nawaz <a>bsef17a042@pucit.edu.pk</a></li>
        <li>Zain Ahmad <a>bsef17a020@pucit.edu.pk</a></li>
        <li>Muhammad Umar <a>bsef17a014@pucit.edu.pk</a></li>
        <li>Sheraz Ahmad <a>bsef17a030@pucit.edu.pk</a></li>
        </p>
        </div> <
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