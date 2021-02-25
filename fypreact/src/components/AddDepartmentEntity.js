import React from 'react'

class AddDepartmentEntity extends React.Component {

    constructor(props){
        super(props);
        this.state = {
        entityInfo: [],//holds all the data for this page

        registerDepartment:[],
        departmentCheck:[],

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


fetchRegisterDepartment = () => {
    fetch("http://127.0.0.1:8000/entity/get_department/")//go to the views of entities app
    .then(res => res.json())
        .then((data) => {
            this.setState({
               registerDepartment  : data
            })

            var i;
            for (i = 0; i < this.state.registerDepartment.length; i++) {
                var newElement = this.state.departmentCheck.concat(this.state.registerDepartment[i]["entity_name"]);
                this.setState({
                    departmentCheck : newElement//array used for unique user
                });
            }
        });
}


fetchPrototype = () => {
    fetch("http://127.0.0.1:8000/entity/get_conf_department/")
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
    this.fetchRegisterDepartment();
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

    const name = event.target.elements.name.value.toLowerCase();
    const entityDescType = event.target.elements.entity_desc_type.value;

  if(this.state.departmentCheck.includes(name)===false)
  {
    var mytype="Department";
    var myjson = {};


     var i;
        for (i = 0; i < Object.keys(this.state.selectedAttributesString).length; i++) {
           var newKey = Object.keys(this.state.selectedAttributesString)[i];
           var newVal = document.getElementsByName(i)[0].value;
           myjson[newKey] = newVal;
        }

            event.preventDefault();
            const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ entity_type: mytype, entity_attributes: myjson, entity_name:name, entity_desc_type:entityDescType})
        };
        fetch('http://127.0.0.1:8000/entity/addentity/', requestOptions)
        .then(response => response.json())
        alert("Department Added to Company Records");
        window.location.replace("/");
    }
    else
    {
        alert("This Department already exists in Company's Records")
    }

}



render(){

    return ( <
        div >

        <
        form action = "" onSubmit={this.handleFormSubmit}>

        <
        h1 >
        Add Department <
        /h1>
        <div >
        <
        input className = "input1"
        type = "text" name="name" required
        placeholder = "Name" / >


        <label>Type</label>
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
            { color: "blue" } } > terms of service and privac policy < /a> <
        button type = "submit"
        className = "signup-btn btn btn-dark" > Register Department < /button> <
        /div> <
        /form>
        <
        /div>
    )
    }
}

export default AddDepartmentEntity