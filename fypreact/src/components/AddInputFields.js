import React from 'react'
import axiosInstance from '../axios.js'
class AddUserEntity extends React.Component {


handleFormSubmit = (event) => {

    const Name = event.target.elements.name.value.toLowerCase();
    const Placeholder = event.target.elements.placeholder.value;
    const inputType = event.target.elements.input_type.value;


    const entityType = event.target.elements.entity_type.value;

        var myjson = '{"Name": "'+Name+'","Placeholder": "'+Placeholder+'","Type": "'+inputType+'"}';
        //var strObj = JSON.parse(myjson);//used to convert json into string

            event.preventDefault();

            const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ entity_type: entityType, field_info: myjson})
        };

        fetch('http://127.0.0.1:8000/entity/attributes/', requestOptions)
        .then(response => response.json())
        //.then(data => this.setState({ postId: data.id }));
        alert("Attribute Added");

}


    render(){
    return ( <
        div >
        <
        form action = "" onSubmit={this.handleFormSubmit} >

        <
        h1 >
        Register Attributes of Entities <
        /h1><
        div className = "input_div" >
        <
        input className = "input1"
        type = "text" name="name" required
        placeholder = "Name of Attribute" / >
        <
        input className = "inout2"
        type = "text" name="placeholder"
        placeholder = "Enter Placeholder" / >
        <
        /div>

        <div className = "input_div" >
        <
        select type = "text"
        name="input_type" >
        <option defaultValue >text< /option>
        <option>number</option>
        <option>email</option>
        <option>password</option>
        <option>date</option>
         <
        /select> <
        select type = "text"
        name="entity_type">
        <
        option defaultValue >Staff< /option>
        <
        option >Thing< /option>
        <option >Department< /option>

        </select> <
        /div>
         <
        div className = "login-btns input_div" >
        By signing up I agree to the <
        a style = {
            { color: "blue" } } > terms of service and privac policy < /a> <
        button type = "submit"
        className = "signup-btn btn btn-dark" > Add Attribute < /button> <
        /div> <
        /form>

        </div>
    )
   }
}

export default AddUserEntity