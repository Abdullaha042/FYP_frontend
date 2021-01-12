import React from 'react'

class Organogram extends React.Component {

 constructor(props){
        super(props);
        this.state = {
        StaffInfo: []//holds the information zain you needed for the organogram(console.log kr ka dekh laen)
        };
    }

fetchData = () => {
    fetch("http://127.0.0.1:8000/entity/get_staff/")
    .then(res => res.json())
    .then((data) => {
        this.setState({
            StaffInfo : data
        })
        console.log("Testing")
        console.log(data)
    });
}

   componentDidMount() {
    this.fetchData();
  }

render()
 {
    return (
        <div>
            ORGANOGRAM PAGE
        </div>
    )
 }
}
export default Organogram