import React, {Component} from 'react';
//import { Button , View, Text} from 'react-bootstrap';
import logo from './logo.svg';
import './App.css';
import * as Api from './api.js';
import {ReactCytoscape} from 'react-cytoscape';
import cytoscape from 'cytoscape';


export default class App extends Component{

  constructor(props) {
    super(props);
    this.state = {data: {
                    param: null
                  },
                  data1: null,
                  data2: "",
                  nodess: [],
                  edgess: []

    };

    this.handleChange = this.handleChange.bind(this);
  }


  renderCytoscapeElement(){

    console.log('* Cytoscape.js is rendering the graph..');

    this.cy = cytoscape(
    {
        container: document.getElementById('cy'),

        boxSelectionEnabled: false,
        autounselectify: true,

        style: cytoscape.stylesheet()
            .selector('node')
            .css({
                'height': 80,
                'width': 80,
                'background-fit': 'cover',
                'border-color': '#000',
                'border-width': 3,
                'border-opacity': 0.5,
                'content': 'data(name)',
                'text-valign': 'center',
            })
            .selector('edge')
            .css({
                'width': 6,
                'target-arrow-shape': 'triangle',
                'line-color': '#ffaaaa',
                'target-arrow-color': '#ffaaaa',
                'curve-style': 'bezier'
            })
            ,
        elements: {
            nodes: this.state.nodess,
            edges: this.state.edgess
        },

        layout: {
          name: 'grid',
          rows: 1
        }
        }); 
}

componentDidMount(){
    //this.renderCytoscapeElement();
}


  handleChange(event) {
    console.log(event)
    this.setState({data: {param: event.target.value}});
  }

  getAdjacencyMatrix(){
    console.log(this.state.data)
    var denem = this.state.data;

    denem.param = Number(denem.param);
    console.log(denem)
    Api.getAdjacencyMatrix(denem)
      .then( (response) => {
        console.log(response)
        var nodes = [];
        var edges = [];

        for(var i=0; i<response.length; i++){
          nodes.push({data: {id: i.toString()}})
          for(var j=0; j<response.length; j++){
            if(response[i][j] == 1){
              edges.push({data: {source: i.toString(), target: j.toString()}})
            }
          }
        }

        this.setState({edgess: edges});
        this.setState({nodess: nodes});

        this.renderCytoscapeElement();

        this.setState({data1:response})
        var stringMatrix = ""
        for(var i=0; i<response.length; i++){
          for(var j=0; j<response.length; j++){
            stringMatrix += response[i][j].toString();
          }
          stringMatrix += " / ";
        }
        console.log(stringMatrix)
        this.setState({data2:stringMatrix})
      })
    

  }

  render(){
    return (
        <div className="App">
          <header className="App-header">
            
            <label>
              Name:
              <textarea value={this.state.data.param} onChange={this.handleChange} />
            </label>
            <button onClick={() => {this.getAdjacencyMatrix()}}>Button</button>
            
            
            
            <textarea value={this.state.data2}  />


            
            
    
          </header>
          <div style={{justifyContent: 'center',
        alignItems: 'center', flex:1, height:'100%', width:'100%'}} className="node_selected">
                <div style={{height:'400px'}} id="cy"/>
            </div>
        </div>
    )}
  
}

