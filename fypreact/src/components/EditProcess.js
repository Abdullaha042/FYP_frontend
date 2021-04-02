import React from 'react';
import MindFusion from 'mindfusion-common';
import mf from 'diagram-library';
import DiagramView from 'diagram-library-react';

class EditProcess extends React.Component {

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

export default EditProcess