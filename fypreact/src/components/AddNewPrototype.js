import React from 'react'
import { withRouter } from 'react-router';
class AddNewPrototype  extends React.Component {

//-1=add
//-2=register

    constructor(props){
        super(props);
        this.state = {
            button:-1,
            attributes:[],
            entityInfo: [],//holds all the data for this page
            entityCheck:[]
        };
    }

  componentDidMount() {
    this.fetchData();
  }

fetchData = () => {
    fetch("http://127.0.0.1:8000/entity/configuration/")
    .then(res => res.json())
    .then((data) => {
        this.setState({
            entityInfo : data
        })


            var i;
            for (i = 0; i < this.state.entityInfo.length; i++) {
                var newElement = this.state.entityCheck.concat(this.state.entityInfo[i]["name"]);
                this.setState({
                    entityCheck : newElement//array used for unique user
                });
            }
            console.log(this.state.entityCheck)
    });
}


    handleFormSubmit = (event) =>{
    event.preventDefault();
    if (this.state.button === -1) {

        const attNm = event.target.elements.attribute_name.value;
        const attTp = event.target.elements.attribute_type.value;

        if(attNm !== '')
        {
            var attributeObj = {name : attNm, type : attTp};
            var joined = this.state.attributes.concat(attributeObj);
            this.setState({
                attributes : joined
            })
            alert("attribute added")
        }
        else
        {
            alert("must write a name for the attribute")
        }
    }

    //Remove index if condition
    if(this.state.button >= 0)
    {
        var index = this.state.button;
        this.state.attributes.splice(index, 1);
        alert("remove index : " + this.state.button);
        console.log("new array : ");
        console.log(this.state.attributes);
    }

    if (this.state.button === -2) {
      const protoTypeName = event.target.elements.name.value.toLowerCase();

      console.log("testing");
      if(this.state.entityCheck.includes(protoTypeName)===false)
      {


      if(protoTypeName!='')
      {
        const nameED = event.target.elements.name.value.toLowerCase();
        const typeED = event.target.elements.proto_type.value;
        var myjson = {};
        var i;
        for (i = 0; i < this.state.attributes.length; i++) {
            var newKey = this.state.attributes[i]["name"];
            var newVal = this.state.attributes[i]["type"]
            myjson[newKey] = newVal;
        }

            const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({name:nameED, type: typeED, attributes: myjson})
        };
        fetch('http://127.0.0.1:8000/entity/configuration/', requestOptions)
        .then(response => response.json())

        alert("Prototype of Entity Registered");
        window.location.replace("/");
      }
      else
      {
        alert("must have to add Prototype Name")
      }

      }
      else
      {
        alert("already present entity");
      }
    }
}

render(){

    return ( <
        div >
        <
        form action = "" onSubmit={this.handleFormSubmit}>
        <
        h1 >
        New Prototype <
        /h1>

        <div >
        <
        input className = "input1"
        type = "text" name="name"
        placeholder = "Prototype Name" / >

        <select type = "text"
        name="proto_type" >
        <option defaultValue >User< /option>
        <option>Department</option>
        <option>Thing</option>
        </select>
        <button disabled>+</button>
        </div>


        <b>Additional Fields</b>
        <div >
        <input className = "input1"
        type = "text" name="attribute_name"
        placeholder = "Attribute Name" / >

        <select type = "text"
        name="attribute_type" >
        <option defaultValue >text< /option>
        <option>number</option>
        <option>email</option>
        <option>password</option>
        <option>date</option>
        </select>
        <button type="submit" name="regButton" value="addbtn" onClick={() => (this.state.button = -1)}> + </button>
        </div>
        {this.state.attributes.map((item, index) => (
            <div>
            <button name = {index} onClick={() => (this.state.button = index)}> Remove {item.name}</button>
            </div>
        ))};


        <div className = "login-btns input_div" >
        By signing up I agree to the <
        a style = {
            { color: "blue" } } > terms of service and privac policy < /a> <
        button type = "submit"
        className = "signup-btn btn btn-dark" name="regButton" value="regbtn" onClick={() => (this.state.button = -2)} > Register Prototype < /button> <
        /div> <
        /form>

        <
        /div>
    )
    }
}

export default withRouter(AddNewPrototype )