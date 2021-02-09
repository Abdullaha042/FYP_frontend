import React from 'react'
import axiosInstance from '../axios.js'

class AddUserEntity extends React.Component {

    constructor(props){
        super(props);
        this.state = {
        entityInfo: [],//holds all the data for this page

        authUsers: [],//holds all the users present in auth table
        registerUsers:[],//holds all the registered users for parent
        usersCheck:[],



        //new prototype
        entityPrototype:[],
        posts:[],
        selectedAttributesString : [],


        };
    }

fetchData = () => {
    fetch("http://127.0.0.1:8000/entity/addentity/")
    .then(res => res.json())
    .then((data) => {
        this.setState({
            entityInfo : data
        })
    });
}


fetchAuthUsersData = () => {
    fetch("http://127.0.0.1:8000/api/user/getauthusers/")//go to the views of entities app
    .then(res => res.json())
        .then((data) => {
            this.setState({
               authUsers  : data
            })
        });
}

fetchRegisterUsers = () => {
    fetch("http://127.0.0.1:8000/entity/get_staff/")//go to the views of entities app
    .then(res => res.json())
        .then((data) => {
            this.setState({
               registerUsers  : data
            })

            var i;
            for (i = 0; i < this.state.registerUsers.length; i++) {
                var newElement = this.state.usersCheck.concat(this.state.registerUsers[i]["entity_name"]);
                this.setState({
                    usersCheck : newElement//array used for unique user
                });
            }

        });
}



fetchPrototype = () => {
    fetch("http://127.0.0.1:8000/entity/get_conf_staff/")
    .then(res => res.json())
    .then((data) => {
        this.setState({
            entityPrototype : data
        })

        var i;
        for (i = 0; i < this.state.entityPrototype.length; i++) {
            var newElement = this.state.posts.concat(this.state.entityPrototype[i]["name"]);
            this.setState({
                posts : newElement//array used for unique user
            });
        }
    });
}



  componentDidMount() {
    this.fetchData();
    this.fetchAuthUsersData();
    this.fetchRegisterUsers();

    //newprototype
    this.fetchPrototype();
  }


    changeFunction = (event)=>{

        var i;
        i = 0;
        var found=false
        while( i < this.state.entityPrototype.length && found==false )
        {
            if(event.target.value === this.state.entityPrototype[i]["name"])
            {
                var myJSON=this.state.entityPrototype[i]["attributes"]
                    this.setState({ selectedAttributesString: myJSON });
                found = true
            }
            i=i+1;
        }
    }

    handleFormSubmit = (event) =>{
    const email = event.target.elements.user_email.value.toLowerCase();
    const parentEmail = event.target.elements.parent_email.value.toLowerCase();
    const entityDescType = event.target.elements.entity_desc_type.value;

        var myjson = {};
        var i;
        for (i = 0; i < Object.keys(this.state.selectedAttributesString).length; i++) {
           var newKey = Object.keys(this.state.selectedAttributesString)[i];
           var newVal = document.getElementsByName(i)[0].value;
           myjson[newKey] = newVal;
        }
        myjson["parent"] = parentEmail;


    //To Create The Entity
    if(this.state.usersCheck.includes(email)===false)
    {
       var mytype="User";
            event.preventDefault();
            const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ entity_type: mytype, entity_attributes: myjson, entity_name:email,entity_desc_type:entityDescType})
        };
        fetch('http://127.0.0.1:8000/entity/addentity/', requestOptions)
        .then(response => response.json())

        localStorage.setItem("entityUniqueKeys", JSON.stringify(this.state.entityMustUniqueKey));
        alert("Staff Added");
        //Changing the Auth User Table(NewUser)
        window.location.replace("/");
  }
  else
  {
    alert("This User already exists in Company's Database");
  }
}


    render(){

    return ( <
        div >
        <
        form action = "" onSubmit={this.handleFormSubmit} >
        <
        h1 >
        Add Staff <
        /h1>

        <div className = "input_div">
        <label>User</label>
        <select className = "input1"
         type = "email" name="user_email" required>
         <option></option>
        {this.state.authUsers.map((item, index) => (
                <option>{item.email}</option>
        ))};
        </select>

        <label>Parent</label>
        <select className = "input1"
        type = "email" name="parent_email" required>
        <option></option>
        {this.state.registerUsers.map((item, index) => (
                <option>{item.entity_name}</option>
        ))};
        </select>
        </div>


        <div className = "input_div">
        <label>Post</label>
        <select className = "input1" onChange={this.changeFunction}
         type = "text" name="entity_desc_type" required>
         <option></option>
        {this.state.posts.map((item, index) => (
                <option value={item}>{item}</option>
        ))};
        </select>
        </div>

        <h3>Customized Additional Fields</h3>
                {Object.keys(this.state.selectedAttributesString).map((item,index)=>(
                    <div>
                        <input name={index} type={this.state.selectedAttributesString[item]} placeholder = {item} />
                    </div>
                ))}

        <div className = "login-btns input_div" >
        By signing up I agree to the <
        a style = {
            { color: "blue" } } > terms of service and privacy policy < /a> <
        button type = "submit"
        className = "signup-btn btn btn-dark" > Register User < /button> <
        /div> <
        /form>

        </div>
    )
   }
}

export default AddUserEntity