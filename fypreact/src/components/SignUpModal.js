import React from 'react'
import './SignIn.css';
import axiosInstance from '../axios.js'

class SignUpModal extends React.Component{

//Submition of Form
    handleFormSubmit = (event) => {

    const mail = event.target.elements.email.value;
    const usrnm = event.target.elements.username.value;

    const pass = event.target.elements.password.value;
    const confirmPass = event.target.elements.confirmpassword.value;

    if(pass===confirmPass)
    {
        event.preventDefault();
		    axiosInstance
			    .post('user/register/', {
				    email: mail,
				    user_name: usrnm,
				    password: pass
			    })
			    .then((res) => {
				    this.props.history.push('/');
				    console.log(res);
				    console.log(res.data);
			    })
			    .catch(function (error) {
                console.log(error.response.data.message);
                alert("Account cannot be created: 1) Maybe the account already Exists. 2) Must have an 8 character Password");
            });
    }
    else
    {
        alert("Password and Confirm Password are Mismatching");
    }
}

    render()
    {
    //testing github
    return ( <div>
                <div >
                <div className = "row-fluid main-pg" >
                <div className = "col-lg-6 offset-lg-0 offset-md-2 offset-sm-1 col-sm-10 col-md-8 main-pg-heading" >
                <h1> Sign Up Page </h1>
                </div>

      <div className = "col-lg-6 offset-lg-0 offset-md-1 offset-sm-1 col-sm-10 col-md-10 main-login-pg row" >

            <div className = "col-md-7 col-sm-12 main-login-sub-pg-2" >

            <form action = "" method="" onSubmit={this.handleFormSubmit} >

                <h5 >Enter Name </h5>
                <input type = "email" name="email" placeholder = "Email" required/ >

                <h5 >Enter User Name </h5>
                <input type = "text" name="username" placeholder = "User Name" required/ >

                <h5 >Set Password </h5>
                <input type = "password" name="password" placeholder = "Password(must have 8 characters)" required/ >
                <h5 >Confirm Password </h5>
                <input type = "password" name="confirmpassword" placeholder = "Confirm Password" required/ >

                <div className = "login-btns" >
                <button type = "submit" className = "login-btn btn" > Sign Up < /button>
                <button type = "" className = "signup-btn btn" > Cancel < /button> </div>

            </form>
            </div>

            </div>
            </div>
            </div>

        </div>

    )

    }
}

export default SignUpModal