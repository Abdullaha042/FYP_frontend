import React from 'react'
import './SignIn.css';

class SignUpModal extends React.Component{

    constructor(props){
        super(props);
        this.state={postId: 0};
        this.state={userAccount: 'notExists'};

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

    testing =(event)=>{
    alert("test");
    this.setState({userAccount:"myname"});
    }

//Submition of Form
    handleFormSubmit = (event) => {

    const nm = event.target.elements.name.value;
    const usrnm = event.target.elements.username.value;
    const dept = event.target.elements.department.value;
    const pass = event.target.elements.password.value;
    const confirmPass = event.target.elements.confirmpassword.value;

    var access = 0;
    for (var i = 0; i < this.state.mydata.length; i++)
        {
            if (this.state.mydata[i].username === usrnm)//if username already exists
            {
                alert("This Username already exists")
                access = 1;
                break;
            }
        }

        if(access === 0)//username does not exists in database, so continue to make your account
        {
            var obj = { username: usrnm, name: nm, department: dept, password : pass};
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

}

    render()
    {
    //testing github
    return ( <div>
                <div className = "container" >
                <div className = "row-fluid main-pg" >
                <div className = "col-lg-6 offset-lg-0 offset-md-2 offset-sm-1 col-sm-10 col-md-8 main-pg-heading" >
                <h1> Sign Up Page </h1>
                </div>

      <div className = "col-lg-6 offset-lg-0 offset-md-1 offset-sm-1 col-sm-10 col-md-10 main-login-pg row" >

            <div className = "col-md-7 col-sm-12 main-login-sub-pg-2" >

            <form action = "" method="" onSubmit={this.handleFormSubmit} >

                <h5 >Enter Name </h5>
                <input type = "text" name="name" placeholder = "Name" required/ >

                <h5 >Enter User Name </h5>
                <input type = "text" name="username" placeholder = "User Name" required/ >

                <h5 >Set Password </h5>
                <input type = "password" name="password" placeholder = "Password" required/ >

                <input type = "password" name="confirmpassword" placeholder = "Confirm Password" required/ >

                Select Department
                <select name="department" id="department" style={{color:"white"}}>
                    <option value="land" style={{color:"white"}}>Land</option>
                    <option value="town" style={{color:"white"}}>Town</option>
                    <option value="civil" style={{color:"white"}} >Civil</option>
                    <option value="market" style={{color:"white"}}>Market</option>
                </select>

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