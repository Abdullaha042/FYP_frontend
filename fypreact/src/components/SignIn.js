import React from 'react'
import './SignIn.css';
import axiosInstance from '../axios.js'

class SignIn extends React.Component {

constructor(props){
        super(props);
        this.state = { mytokenaccess: '', mytokenrefresh:'' };
    }


handleFormSubmit = (event) =>{
    var mail = event.target.elements.email.value;
    var pass = event.target.elements.password.value;

        event.preventDefault();

		axiosInstance
			.post('token/', {
				email: mail,
				password: pass,
			})
			.then((res) => {
				localStorage.setItem('access_token', res.data.access);
				localStorage.setItem('refresh_token', res.data.refresh);
				axiosInstance.defaults.headers['Authorization'] =
					'JWT ' + localStorage.getItem('access_token');


				this.setState({mytokenaccess: res.data.access});
				this.setState({mytokenrefresh: res.data.refresh});
				this.props.history.push('/AutherizedTestPage');
				alert("Access Granted");
				console.log(res);
				console.log(res.data);

			})
			 .catch(function (error) {
      console.log(error.response.data.message);
      alert("Wrong Credentials");
    });



}

render(){

    return ( <div>
        <div>
            <div className = "row-fluid main-pg" >
                <div className = "col-lg-6 offset-lg-0 offset-md-2 offset-sm-1 col-sm-10 col-md-8 main-pg-heading" >
                <h1>Sign In Page </h1>
                </div>

                <div className = "col-lg-6 offset-lg-0 offset-md-1 offset-sm-1 col-sm-10 col-md-10 main-login-pg row" >

                <div className = "col-md-7 col-sm-12 main-login-sub-pg-2" >

                <form action = "" method="" onSubmit={this.handleFormSubmit}>

                <h5 >Enter Registered Email </h5>
                <input type = "text" name="email" placeholder = "Email"  required/ >
                <h5 >Enter your Password </h5>
                <input type = "password" name="password"placeholder = "Password" required / >
                <div className = "login-btns" >
                <button type = "submit" className = "login-btnS btn" > LOGIN < /button>
                <button type = "" className = "signup-btn btn" > SIGNUP < /button>
                </div>
                </form>
                <a href="http://localhost:8000/reset_password/" >Forget Password</a>
                </div>

                </div>
                </div>
            </div>


        </div>
    )

    }
}

export default SignIn



//({pathname: '/AutherizedTestPage' ,
//				        state :{
 //                               mysentAccessToken : this.state.mytokenaccess,
 //                               mysentRefreshToken : this.state.mytokenrefresh,
 //                               }
//				        });