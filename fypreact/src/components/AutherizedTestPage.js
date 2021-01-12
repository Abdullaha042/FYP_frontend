import React from 'react'
import Admin from './Admin'

import './SignIn.css';
import axiosInstance from '../axios.js'


class AutherizedTestPage extends React.Component {

    componentDidMount()
    {
        this.settingToken();
    }

settingToken = (event) => {
    if(localStorage.getItem('access_token') === null || localStorage.getItem('refresh_token') === null)
    {
        this.props.history.push('/');
        alert("Session Expired")
    }
}

    //logout function on button click
    logoutFunction = (event)=>{

    const response = axiosInstance.post('user/logout/blacklist/', {
		refresh_token: localStorage.getItem('refresh_token'),
	});
	    console.log(response);
	    localStorage.removeItem('access_token');
	    localStorage.removeItem('refresh_token');
	    axiosInstance.defaults.headers['Authorization'] = null;

	    this.props.history.push('/');
	    alert("Logged Out");
}

render(){

    return (
    <div>
            <div className = "container" >
            <div className = "row-fluid main-pg" >
                <div className = "col-lg-6 offset-lg-0 offset-md-2 offset-sm-1 col-sm-10 col-md-8 main-pg-heading" >
                <h1>Logged in Page</h1>
                <Admin/>

                <button className="btn btn-danger" onClick={this.logoutFunction}>Logout</button>
                </div>
            </div>
            </div>
    </div>
    )

    }
}

export default AutherizedTestPage


        //alert(this.props.location.state.mysentAccessToken);
        //alert(this.props.location.state.mysentAccessToken);