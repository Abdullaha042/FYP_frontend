import React from 'react'
import axiosInstance from '../axios.js'

class AddUserEntity extends React.Component {

    constructor(props){
        super(props);
        this.state = {
        entityInfo: [],//holds all the data for this page
        attributeInfo: [],//holds the info of how many input fields we needs

        inputJson: []
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

fetchInputFieldsData = () => {
    fetch("http://127.0.0.1:8000/entity/attributes_staff")//go to the views of entities app
    .then(res => res.json())
    .then((data) => {
        this.setState({
            attributeInfo : data
        })

            var i;
            for (i = 0; i < this.state.attributeInfo.length; i++) {
                var newElement = this.state.inputJson.concat(JSON.parse(this.state.attributeInfo[i]["field_info"])["Name"]);
                this.setState({
                    inputJson : newElement//inputJson holds the name for all the fields
                });
            }
        console.log(this.state.inputJson)
    });
}

  componentDidMount() {
    this.fetchData();
    this.fetchInputFieldsData();
  }


    handleFormSubmit = (event) =>{
    const name = event.target.elements.name.value.toLowerCase();

        var myjson = {};
        console.log(myjson);

        var i;
        for (i = 0; i < this.state.inputJson.length; i++) {
           var newKey = this.state.inputJson[i];
           var newVal = document.getElementsByName(i)[0].value;
           myjson[newKey] = newVal;
        }
    const cb = document.getElementById('interfaceCheckbox');

    //To Create The Entity
        var mytype="Staff";

            event.preventDefault();
            const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ entity_type: mytype, entity_attributes: myjson, entity_name:name})
        };
        fetch('http://127.0.0.1:8000/entity/addentity/', requestOptions)
        .then(response => response.json())

        localStorage.setItem("entityUniqueKeys", JSON.stringify(this.state.entityMustUniqueKey));
        alert("Staff Added");
        window.location.replace("/");

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

        <
        div >
        <
        input className = "input1"
        type = "text" name="name" required
        placeholder = "Name" / >
        </div>
        Customized Additional Fields

            {this.state.attributeInfo.map((item, index) => (
            <div>
                <input name= {index} type={JSON.parse(item.field_info)["Type"]} placeholder = {JSON.parse(item.field_info)["Placeholder"]}/>
            </div>
        ))};

        <div className = "login-btns input_div" >
        By signing up I agree to the <
        a style = {
            { color: "blue" } } > terms of service and privac policy < /a> <
        button type = "submit"
        className = "signup-btn btn btn-dark" > Register User < /button> <
        /div> <
        /form>

        </div>
    )
   }
}

export default AddUserEntity