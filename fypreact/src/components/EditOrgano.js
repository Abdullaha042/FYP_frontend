import React from 'react'

class EditOrgano extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            registerUsers:[],//holds all the registered users for parent
            usersCheck:[],
        };
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



  componentDidMount() {
    this.fetchRegisterUsers();
  }

 editFunction = (event) => {
    var editableUser,changedParent;
    editableUser = document.getElementById("select_user").value;
    changedParent = document.getElementById("change_parent").value;

    if(editableUser != '' && changedParent != '')
    {
        let found = this.state.registerUsers.find(e => e.entity_name === editableUser);
        var myjson = found.entity_attributes;//here myjson holds previous data of entity
        //now we have to update the parent in myjson to update the database(changing parent of database)
        myjson.parent = changedParent;

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ entity_type: "User", entity_attributes:myjson , entity_name: editableUser , entity_desc_type: found.entity_desc_type})
        };
        fetch('http://127.0.0.1:8000/entity/addentity/' +found.id+ '/', requestOptions)
        .then(response => response.json())
        alert("Successfully Edited")
    }
    else
    {
        alert("Select User and Parent to Edit")
    }


 }

render(){

    return (
        <div className = "form">


            <div className = "input_div">
            <h3>Select User</h3>
                <select className = "input1"
                type = "email" id="select_user">
                <option></option>
                    {this.state.registerUsers.map((item, index) => (
                <option>{item.entity_name}</option>
                ))};
                </select>

            <h3>Change Parent</h3>
                <select className = "input1"
                type = "email" id="change_parent">
                <option></option>
                    {this.state.registerUsers.map((item, index) => (
                <option>{item.entity_name}</option>
                ))};
                </select>

            </div>
        <b>Editable Information</b>
            <div>
                <button onClick={this.editFunction}>CONFIRM & GO BACK</button>
            </div>
        </div>
    )
    }
}

export default EditOrgano