import React from 'react';
import MindFusion from 'mindfusion-common';
import mf from 'diagram-library';
import DiagramView from 'diagram-library-react';

class Organo extends React.Component {

 constructor(props){
        super(props);
        this.state = {
        StaffInfo: [],
        index : "yes"//holds the information zain you needed for the organogram(console.log kr ka dekh laen)
        };
    };

/*fetchData = () => {

}*/

SettingStaffInfo = (event) =>{

fetch("http://127.0.0.1:8000/entity/get_staff/")
    .then(res => res.json())
    .then((data) => {
        this.setState({
            StaffInfo : data,
        })

this.Testing(this);

    });

 //=========================================================================//



}

Testing = (event) => {


var Diagram = MindFusion.Diagramming.Diagram;
var CompositeNode = MindFusion.Diagramming.CompositeNode;
var Behavior = MindFusion.Diagramming.Behavior;
var Events = MindFusion.Diagramming.Events;
var Theme = MindFusion.Diagramming.Theme;
var Style = MindFusion.Diagramming.Style;

var Alignment = MindFusion.Drawing.Alignment;
var Rect = MindFusion.Drawing.Rect;
var Point = MindFusion.Drawing.Point;

var TreeLayout = MindFusion.Graphs.TreeLayout;

var diagram = null;
var names;
var coloredNode;


//The DeanNode is a class that inherits from CompositeNode and
//uses the available layout panels (grid, stack, simple etc.) and components (text, image, table etc.)
//to construct the desired node type
var DeanNode = CompositeNode.classFromTemplate("DeanNode", {
  component: "SimplePanel",
  name: "root",
  children: [
    {
      component: "Rect",
      name: "Background",
      brush: "white",
      pen: "#cecece",
    },
    {
      component: "GridPanel",
      rowDefinitions: ["*", "2"],
      columnDefinitions: ["*"],
      children: [
        {
          component: "StackPanel",
          orientation: "Vertical",
          margin: "1",
          verticalAlignment: "Near",
          gridRow: 0,
          children: [
            {
              component: "Text",
              name: "Faculty",
              autoProperty: true,
              text: "title",
              font: "serif bold",
            },
            {
              component: "Text",
              name: "Dean",
              autoProperty: true,
              text: "Name of dean",
              pen: "#808080",
              padding: "1,0,1,0",
            },
            {
              component: "Text",
              name: "Details",
              autoProperty: true,
              text: "details",
              font: "serif 3.5 italic",
            },
          ],
        },

        {
          component: "Rect",
          name: "Underline",
          pen: "cyan",
          brush: "cyan",
          gridRow: 1,
          autoProperty: false,
        },
      ],
    },
  ],
});

diagram = Diagram.create(document.getElementById("diagramCanvas"));

  var theme = new Theme();
  var linkStyle = new Style();
  linkStyle.setStroke("#CECECE");
  theme.styles["std:DiagramLink"] = linkStyle;
  diagram.setTheme(theme);
  diagram.setShadowsStyle(MindFusion.Diagramming.ShadowsStyle.None);


  for (var i = 0; i < this.state.StaffInfo.length; i++)
  {
   var node = new DeanNode(diagram);
  node.setBounds(new Rect(80, 225, 60, 25));
  node.setFaculty(this.state.StaffInfo[i]["entity_name"]);
  node.setDean(this.state.StaffInfo[i]["entity_type"]);
  node.setDetails(this.state.StaffInfo[i]["entity_desc_type"])
  node.setId(this.state.StaffInfo[i]["entity_name"]);
  node.getComponent("Underline").brush = "#9edee8";
  node.getComponent("Underline").pen = "#04316a";
  diagram.addItem(node);

    //alert(this.state.StaffInfo[i]["entity_name"] + " => " + this.state.StaffInfo[i]["entity_attributes"].parent);

     /*if(this.state.StaffInfo[i]["entity_name"] != this.state.StaffInfo[i]["entity_attributes"].parent)
     {

        var parent = getParentNode(this.state.StaffInfo[i]["entity_attributes"].parent);
		diagram.getFactory().createDiagramLink(parent, node);
     }*/
}

var nodes = diagram.getNodes();
for (var i = 0; i < this.state.StaffInfo.length; i++)
  {
    if(this.state.StaffInfo[i]["entity_name"] != this.state.StaffInfo[i]["entity_attributes"].parent)
     {
        var parent = getParentNode(this.state.StaffInfo[i]["entity_attributes"].parent);
		diagram.getFactory().createDiagramLink(parent, nodes[i]);
     }
  }


  var links = diagram.getLinks();

  // ---------------------Required- Do not change------------------------//
  //set all links to light gray and with pointers at the bottom,
  //rather than the head in order to appear inverted
  for (var i = 0; i < links.length; i++) {
    var link = links[i];

    link.setBaseShape("Triangle");
    link.setHeadShape(null);
    link.setBaseShapeSize(3.0);
    link.setBaseBrush({ type: "SolidBrush", color: "#CECECE" });
    link.setZIndex(0);
  }

  //create an instance of the Tree Layout and apply it
  var layout = new TreeLayout();
  layout.direction = MindFusion.Graphs.LayoutDirection.TopToBottom;
  layout.linkType = MindFusion.Graphs.TreeLayoutLinkType.Cascading;
  //enabling assistants tells the layout to order the nodes with Assistant traits in a special way
  layout.enableAssistants = true;
  diagram.arrange(layout);

  diagram.resizeToFitItems(5);

  // create an ZoomControl component that wraps the "zoomer" canvas
  var zoomer = MindFusion.Controls.ZoomControl.create(
    document.getElementById("zoomer")
  );
  zoomer.setTarget(diagram);
  zoomer.setZoomFactor(70);



function getParentNode(parent)
{

    if(parent != "null")
    {
    var nodes = diagram.getNodes();
    for (var i = 0; i < nodes.length; i++)
    {
      if (nodes[i].getId() == parent)
      {
        return nodes[i];
      }
    }
  }
  else
    return "null";
}

/*------------------Mouse Event---------------------*/
var file = document.getElementById("diagramCanvas");
file.addEventListener("mousemove", function (e) {
  //get the position of the mouse
  var cursor = MindFusion.Diagramming.Utils.getCursorPos(
    e,
    document.getElementById("diagramCanvas")
  );
  //convert the mouse position to diagram units
  var point = diagram.clientToDoc(cursor);

  //see if there is a diagram node at this location
  var deanNode = diagram.getNodeAt(point);
  if (deanNode) {
    //if there is a node but also another node is colored, we must reset ALL nodes
    if (coloredNode) resetAllItems();

    coloredNode = deanNode;

    //set the background of the node to the color of its bottom line
    var brush = deanNode.getComponent("Underline").brush;
    deanNode.getComponent("Background").brush = brush;

    //set all incoming and outgoing links to be red
    var links = deanNode.getOutgoingLinks();
    for (var i = 0; i < links.length; i++) {
      var link = links[i];
      link.setStroke("red");
      link.setZIndex(1);
    }

    links = deanNode.getIncomingLinks();
    for (var i = 0; i < links.length; i++) {
      var link = links[i];
      link.setStroke("red");
      link.setZIndex(1);
    }

    //invalidate the node to repaint it
    deanNode.invalidate();
  } else if (coloredNode) {
    //if we have a colored node and the mouse is not under another node
    //we ust reset the colors of the colored node and its links
    coloredNode.getComponent("Background").brush = "white";

    var links = coloredNode.getOutgoingLinks();

    for (var i = 0; i < links.length; i++) {
      var link = links[i];
      link.setStroke("#CECECE");
      link.setZIndex(0);
    }

    links = coloredNode.getIncomingLinks();

    for (var i = 0; i < links.length; i++) {
      var link = links[i];
      link.setStroke("#CECECE");
      link.setZIndex(0);
    }

    coloredNode.invalidate();
    coloredNode = null;
  }
});

function resetAllItems() {
  var nodes = diagram.getNodes();

  for (var i = 0; i < nodes.length; i++)
    nodes[i].getComponent("Background").brush = "white";

  var links = diagram.getLinks();

  for (var i = 0; i < links.length; i++) {
    links[i].setStroke("#CECECE");
    links[i].setZIndex(0);
  }
}


}


  componentDidMount() {

  this.SettingStaffInfo();
 // this.Testing();
}

render(){
return(


	<div className = "form" >

		<div style={{height:"500px",marginRight:"0px"}}>
			<canvas id="diagramCanvas" >
				This page requires a browser that supports HTML 5 Canvas element.
			</canvas>
		</div>

		<div style={{width:"450px"}}>
			<canvas id="zoomer" width="50" height="200">
	    </canvas>
	</div>

</div>


)
}
}

export default Organo