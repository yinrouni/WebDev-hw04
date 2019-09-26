import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

export default function game_init(root) {
  ReactDOM.render(<Board />, root);
}

function Square(props) {


   var c;
 if (props.hidden){
   c = null;
 }
  else {
    c = props.letter;
  } 
    return (
      
      <td key= {props.value}
        className="square"
        onClick={() => props.onClick()}
      >
        {c}
      </td>
    );
  }


class Board extends React.Component{
  constructor(props) {
    super(props);
    var lettersList = this.swap(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
	    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']);
    this.state = {
	    first:  null,
	    letters: lettersList,
	    present: [null, null, null, null, null, null, null, null, null, null, 
		    null, null, null, null, null, null], 
	    clicks: 0, 
	    clickDisaled: false

    };
  }

  handleClick(i){
	  if (!this.state.clickDisabled){
	  var presentD = this.state.present.slice();
	  var clicksD = this.state.clicks;
	// click the forst tile.
	  if (this.state.first == null){
	 	 presentD[i]=this.state.letters[i];
	  	this.setState({present: presentD, clicks: clicksD+1, first: i});
	  }
	// the two tiles match, the values won't be hidden(marked completed). The onclick event will be disabled.
	  else if (this.state.letters[i]==this.state.letters[this.state.first]){
	  	presentD[i] = this.state.letters[i];
		  this.setState({present: presentD, clicks: clicksD+1, first: null});
	  }
	// the two don't match, they will be hidden in 1 second. During the time interval, ignore all the clicks.
	  else {
		  presentD[i]=this.state.letters[i];
		  this.setState({present: presentD, clickDisabled: true});
		  setTimeout(()=>{
		  
		  presentD[this.state.first]=null;
		  presentD[i]=null;
		  this.setState({present:presentD, clicks: clicksD+1, first: null, clickDisabled: false});
		  }, 1000);

	  	
	  }
  }
  }

// Generated a random letter list for the game.
swap(ls){
 var ret = [];
	while(ls.length> 0){
	  var i = Math.floor(Math.random() * ls.length );

		ret.push(ls[i]);
		ls.splice(i, 1);
	}
	return ret;
	}
  reset(){
	  var lettersNew = this.state.letters.slice();

	  var ln = this.swap(lettersNew);
//	  console.log(ln);
	  var presentNew = this.state.present.map(()=>{return null;});
	  this.setState({first: null, clicks: 0, clickDisabled: false, letters: ln, present: presentNew});

  return ;
  }
  renderSquare(i) {
	  if (this.state.present[i]==null){
    		return <Square value={i} key={32+i} letter={this.state.letters[i]} hidden={true} onClick={()=>this.handleClick(i)}/>;}
	  // present[i]== null means the tile is completed.
	  else {
	  	return <Square value={i} key={32+i} letter={this.state.letters[i]} hidden={false} onClick={()=>{return;}}/>;
		 
	  }
  }
initRow(s, a){
	var tds= [];
	for (var j = 0; j < a; j ++){
		tds.push(this.renderSquare(s+j));

	}
	return tds;
}
  initSquare(){
	var rows = [];
  	for (var i = 0; i < 16; i +=4){
		rows.push(<tr key={i+16} className="broad-row">{this.initRow(i, 4)}</tr>);
		
	}
	return (<tbody key={"bd"}>{rows}</tbody>);
  
  
  }
	render(){
	let numClicks = this.state.clicks;
		return (
	<div>
	<p>total clicks: {numClicks}</p>
	<table>
			{this.initSquare()}		
      </table>
	<button onClick = {()=>this.reset()}>Reset</button>
</div>
    );
	}


}


