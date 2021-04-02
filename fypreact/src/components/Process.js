import React from 'react';
import MindFusion from 'mindfusion-common';
import mf from 'diagram-library';
import DiagramView from 'diagram-library-react';


import $ from 'jquery';

var AbstractionLayer = MindFusion.AbstractionLayer;

var Diagram = MindFusion.Diagramming.Diagram;
var DiagramNode = MindFusion.Diagramming.DiagramNode;
var DiagramLink = MindFusion.Diagramming.DiagramLink;
var ContainerNode = MindFusion.Diagramming.ContainerNode;
var AnchorPattern = MindFusion.Diagramming.AnchorPattern;
var ShapeNode = MindFusion.Diagramming.ShapeNode;
var Shape = MindFusion.Diagramming.Shape;
var DashStyle = MindFusion.Drawing.DashStyle;
var NodeListView = MindFusion.Diagramming.NodeListView;
var Font = MindFusion.Drawing.Font;
var FontStyle = MindFusion.Drawing.FontStyle;
var Alignment = MindFusion.Diagramming.Alignment;
var HandlesStyle = MindFusion.Diagramming.HandlesStyle;
var Events = MindFusion.Diagramming.Events;
var Theme = MindFusion.Diagramming.Theme;
var Style = MindFusion.Diagramming.Style;
var Rect = MindFusion.Drawing.Rect;
var Point = MindFusion.Drawing.Point;

var diagram,nodeList;

class Process extends React.Component {

constructor(props){
        super(props);
        this.state = {
        processInfo: [],//holds all the data for this page
        processUniqueNames:[],
        getProcess:[],
        };
    }


bpnmElements = (event) =>{

$(document).ready(function ()
{
    //creates the diagram components that wraps the canvas
    diagram = AbstractionLayer.createControl(Diagram,null,null,null,$("#diagramCanvas")[0]);
    diagram.setAllowInplaceEdit(true);
    diagram.setRouteLinks(true);
    diagram.setShowGrid(true);
    diagram.setRoundedLinks(true);
    diagram.setBounds(new Rect(0,0,2000,2000));

    //similarly create a bmnp elements
    nodeList = AbstractionLayer.createControl(NodeListView,null,null,null,$("#nodeList")[0]);

    var node = new ShapeNode();
    node.setTransparent(true);
    node.setText("Text");
    nodeList.addNode(node,"Text");

    node = new ShapeNode();
    node.setShape("Decision");
    nodeList.addNode(node,"Decision");

    node = new ShapeNode();
    node.setShape("RoundRect");
    nodeList.addNode(node,"Round Rect");

    node = new ShapeNode();
    node.setShape("Circle");
    nodeList.addNode(node,"Circle");

//    node = new ContainerNode();
//    node.setCaptionBackBrush({type:'solidBrush',color:'#f2ebcf'});
//    node.setRotationAngle(-90);
//    nodeList.addNode(node,"Container");

    for(var shapeId in Shape.shapes)
    {
        var shape = Shape.shapes[shapeId];
            if(shapeId.startsWith("Bpmn"))
            {
                var node = new MindFusion.Diagramming.ShapeNode(diagram);
                node.setShape(shapeId);
                nodeList.addNode(node,shapeId.substring(4));
            }
    }


diagram.addEventListener("nodeClicked", function(diagram,eventArgs)
{
    //alert("Node Clicked!");
    console.log("node is",eventArgs)
    console.log("node shape is ",eventArgs.node.shape.id)

    console.log("parent is ",eventArgs.node.incomingLinks[0].origin.shape.id)

    //console.log("befor text is ",eventArgs.node.text)
});

});
}


 componentDidMount() {
 this.bpnmElements();
 }

save = (event) => {
var processN = document.getElementById("diagramName").value.toLowerCase();

fetch("http://127.0.0.1:8000/process/addprocess/")
    .then(res => res.json())
    .then((data) => {
        this.setState({
            processInfo : data
        })

        var i;
        for (i = 0; i < this.state.processInfo.length; i++) {
            var newElement = this.state.processUniqueNames.concat(this.state.processInfo[i]["process_name"]);
            this.setState({
                processUniqueNames : newElement//array used for unique user
            });
        }

        if(processN != '')
        {
            if(this.state.processUniqueNames.includes(processN)===false)
            {
                var jsonDiagram = JSON.parse(diagram.toJson());
                console.log("name of process",processN);
                console.log("json diagram",jsonDiagram);
                    const requestOptions = {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({ process_name: processN, process_diagram: jsonDiagram})
                    };
                fetch('http://127.0.0.1:8000/process/addprocess/', requestOptions)
                .then(response => response.json())
                alert("Process saved")
            }
            else
            {
                alert(processN + " Process already exists");
            }
        }
        else
        {
            alert("Process must have a name")
        }

    });
}



getDiagram=()=>{
var processN = document.getElementById("diagramName").value.toLowerCase();

fetch("http://127.0.0.1:8000/process/addprocess/")
    .then(res => res.json())
    .then((data) => {
        this.setState({
            getProcess : data
        })

        var i;
        for (i = 0; i < this.state.getProcess.length; i++) {
            var newElement = this.state.processUniqueNames.concat(this.state.getProcess[i]["process_name"]);
            this.setState({
                processUniqueNames : newElement//array used for unique user
            });
        }
        if(processN==='')
        {
            alert("Enter Process Name to get its Diagram on Canvas")
        }
        else if(this.state.processUniqueNames.includes(processN)===true)
        {
            let found = this.state.getProcess.find(e => e.process_name === processN);
            var viewDiagram;
            viewDiagram=JSON.stringify(found.process_diagram);//make it dynamic
            diagram.fromJson(viewDiagram);
        }
        else
        {
            alert(processN + " Process is not registered");
        }
    });
    console.log("diagram",diagram)
}

saveChanges = () =>{
var processN = document.getElementById("diagramName").value.toLowerCase();

fetch("http://127.0.0.1:8000/process/addprocess/")
    .then(res => res.json())
    .then((data) => {
        this.setState({
            getProcess : data
        })

        var i;
        for (i = 0; i < this.state.getProcess.length; i++) {
            var newElement = this.state.processUniqueNames.concat(this.state.getProcess[i]["process_name"]);
            this.setState({
                processUniqueNames : newElement//array used for unique user
            });
        }

        if(processN==='')
        {
            alert("Enter Process Name to get its Diagram on Canvas")
        }
        else if(this.state.processUniqueNames.includes(processN)===true)
        {
            let found = this.state.getProcess.find(e => e.process_name === processN);

            var jsonDiagram = JSON.parse(diagram.toJson());

                    const requestOptions = {
                        method: 'PUT',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({ process_name: processN, process_diagram: jsonDiagram})
                    };
                fetch('http://127.0.0.1:8000/process/addprocess/' +found.id+ '/', requestOptions)
                .then(response => response.json())
                alert("Changes saved")

        }
        else
        {
            alert(processN + " Process is not registered");
        }
    });

}


clearItems = () =>{
diagram.clearAll();
}

testFunc=()=>{
console.log("nodes",diagram.nodes);
}

render(){
return(
	<div style={{top:"5px",bottom:"24px"}} >
    	<div style={{position: "absolute", left: "0px", top: "0px", bottom: "0px", width: "200px",border_right: "1px solid #e2e4e7",overflow: "hidden", vertical_align: "top"}}>
		    <div style={{width:"200px",height:"100%",overflow:"auto",
		    position:"absolute",top:"5px",left:"0px",right:"0px",bottom:"0px"}} >
		        <canvas id="nodeList" width="200">
                </canvas>
	        </div>
	    </div>


            <div style={{position:"absolute",top:"5px",left:"200px",right:"0px",bottom:"0px",overflow:"auto"}}>

                <div style={{height: "40px", width: "100%", margin: "3px 0px 0px 10px", padding: "0px"}}>

                   <input type="text" name="diagramName" id="diagramName" style={{color:"white"}}></input>
				   <button type="button" title="Save process to database" onClick={this.save} style={{padding: "3px 20px", vertical_align: "top", border: "1px solid #cecece"}} className="btn btn-primary">Submit Process</button>
				   <button type="button" title="get diagram from database" onClick={this.getDiagram} style={{padding: "3px 20px", vertical_align: "top", border: "1px solid #cecece"}} className="btn btn-dark">Get Process</button>
				   <button type="button" title="change diagram in database" onClick={this.saveChanges} style={{padding: "3px 20px", vertical_align: "top", border: "1px solid #cecece"}} className="btn btn-success">Save Changes</button>
				   <button type="button" title="Clear all items from diagram canvas" onClick={this.clearItems} style={{padding: "3px 20px", vertical_align: "top", border: "1px solid #cecece"}} className="btn btn-danger">Clear Canvas</button>

				   <button type="button" title="get diagram from local storage" onClick={this.testFunc} style={{padding: "3px 20px", vertical_align: "top", border: "1px solid #cecece"}} className="btn btn-light">TEST</button>

			    </div>

		        <div style={{overflow:"hidden",height:"100%",margin:"1px",padding:"0px", overflow:"auto"}}>
			        <canvas id="diagramCanvas" >
				        This page requires a browser that supports HTML 5 Canvas element.
			        </canvas>
		        </div>
		    </div>
</div>

)
}
}

export default Process;