import React from 'react'
import './SignIn.css';

class SignIn extends React.Component {

    constructor(props){
        super(props);
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

handleFormSubmit = (event) =>{
    var user = event.target.elements.username.value;
    var pass = event.target.elements.password.value;
    var account=0;
    for (var i = 0; i < this.state.mydata.length; i++)
    {
        if (this.state.mydata[i].username === user && this.state.mydata[i].password === pass)
        {
            alert("Access Granted")
            account=1;
            break;
        }
        else if(this.state.mydata[i].username === user && this.state.mydata[i].password !== pass)
        {
            alert("Access Denied!!! incorrect password for " + user)
            account=1;
            break;
        }
    }
    if(account===0)
    {
        alert("Account not Found")
    }
}

render(){

    return ( <div>
        <div className = "container" >
            <div className = "row-fluid main-pg" >
                <div className = "col-lg-6 offset-lg-0 offset-md-2 offset-sm-1 col-sm-10 col-md-8 main-pg-heading" >
                <h1>Sign In Page </h1>
                </div>

                <div className = "col-lg-6 offset-lg-0 offset-md-1 offset-sm-1 col-sm-10 col-md-10 main-login-pg row" >

                <div className = "col-md-7 col-sm-12 main-login-sub-pg-2" >

                <form action = "" method="" onSubmit={this.handleFormSubmit}>

                <h5 >Enter your Email </h5>
                <input type = "text" name="username" placeholder = "Email"  required/ >
                <h5 >Enter your Password </h5>
                <input type = "password" name="password"placeholder = "Password" required / >
                <div className = "login-btns" >
                <button type = "submit" className = "login-btn btn" > LOGIN < /button>
                <button type = ""className = "signup-btn btn" > SIGNUP < /button>
                </div>
                </form> </div>

                </div>
                </div>
            </div>
        </div>
    )

    }
}

export default SignIn



