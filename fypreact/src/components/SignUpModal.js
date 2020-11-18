import React from 'react'
import './SignIn.css';
import { faBars, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GoogleLogin from 'react-google-login'

class SignUpModal extends React.Component{

    constructor(props){
        super(props);
        this.state={postId: 0};
        this.state={google:"notExists"}
        this.state={selectAccount:"False"}

        this.state = {mail: ''};
        this.state = {firstName: ''};
        this.state = {lastName: ''};
        this.state = {googleid: ''};
        this.state = {imageurl: ''};
        this.state = {myname: ''};

        this.state = {
            mydata: []
        };
    }

    componentDidMount(){
        this.fetchData();
    }

    fetchData = (event) => {
        fetch("http://127.0.0.1:8000/adduser/")
        .then(res => res.json())
        .then((data) => {
            this.setState({
                mydata : data
            })
        });
    }

    //google login logic function
    responseGoogle = (response)=>{

        console.log(response.profileObj);

        this.setState({ mail: response.profileObj.email });
        this.setState({ firstName: response.profileObj.givenName });
        this.setState({ lastName: response.profileObj.familyName });
        this.setState({ googleid: response.profileObj.googleId });
        this.setState({ imageurl: response.profileObj.imageUrl });
        this.setState({ myname: response.profileObj.name });

        this.setState({ selectAccount: "True" });


        for (var i = 0; i < this.state.mydata.length; i++)
        {
            if (this.state.mydata[i].email === this.state.mail)//if email already exists
            {
                alert("email already exists! Signup with another email")
                this.setState({ google: "Exists" });
                break;
            }
            else
            {
                this.setState({ google: "notExists" });
            }
        }
    }

responseGoogleFail = () =>{
    alert("Google Authentication Error");
}

//Submition of Form
    handleFormSubmit = (event) => {

    if(this.state.selectAccount === "True")//means choose verified google account first
    {
        if(this.state.google === "notExists")//email doesnot exists, so continue to make your account
        {
            //getting values from input fields
            const pass = event.target.elements.password.value;
            const confirmPass = event.target.elements.confirmpassword.value;

            var obj = { email: this.state.mail, givenName: this.state.firstName, familyName: this.state.lastName, googleId : this.state.googleid, imageUrl:"post image url here" ,name : "post user name here", password:pass };

            if(pass === confirmPass)
            {
                const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(obj),
                };

                fetch('http://127.0.0.1:8000/adduser/', requestOptions)
                .then(response => response.json())
                .then(data => this.setState({ postId: data.id }));

                alert("Account Created. Login to access the Site");
            }
            else
            {
                alert("Password and Confirm Password must be same");
            }

        }
        else//email exists
        {
            alert("Email Already Exists")
        }
    }
    else
    {
        alert("Choose Verified Google Account First")
    }


}


    render()
    {

    return ( <div>
                <div className = "container" >
                <div className = "row-fluid main-pg" >
                <div className = "col-lg-6 offset-lg-0 offset-md-2 offset-sm-1 col-sm-10 col-md-8 main-pg-heading" >
                <h1> Sign Up Page </h1>
                </div>

                <div className = "col-lg-6 offset-lg-0 offset-md-1 offset-sm-1 col-sm-10 col-md-10 main-login-pg row" >

            <div className = "col-md-7 col-sm-12 main-login-sub-pg-2" >

            <button class="btn">
                <GoogleLogin clientId="916651666356-16h5upcresdk1uugh5m6r6t85q3kmhbb.apps.googleusercontent.com"
                buttonText="Use your Gmail Account"
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogleFail}
                cookiePolicy={'single_host_origin'}/>
            </button>


                <form action = "" method="" onSubmit={this.handleFormSubmit} >
                <h5 >Enter Password </h5>
                <input type = "password" name="password" placeholder = "Password" onChange={this.myChangeHandelerPassword} required / >
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

    }//render
}

export default SignUpModal