import React, {Component} from 'react';
//import { Button , View, Text} from 'react-bootstrap';
import logo from './logo.svg';
import './App.css';
import * as Api from './api.js';
import {ReactCytoscape} from 'react-cytoscape';
import cytoscape from 'cytoscape';
import { Graph } from 'react-d3-graph';


export default class App extends Component{

  constructor(props) {
    super(props);
    this.state = {data: {
                    param: null
                  },
                  data1: null,
                  data2: "",
                  nodess: [],
                  edgess: [],
                  data3: null,
                  data4: "",
                  myConfig: {
                    nodeHighlightBehavior: true,
                    node: {
                        color: 'lightgreen',
                        size: 120,
                        highlightStrokeColor: 'blue'
                    },
                    link: {
                        type: "STRAIGHT",
                        highlightColor: 'lightblue'
                    }
                },
                data99: {
                  nodes: [
                    {id: 'Harry'},
                    {id: 'Sally'},
                    {id: 'Alicee'}
                  ],
                  links: [
                      {source: 'Harry', target: 'Sally'},
                      {source: 'Harry', target: 'Alicee'},
                      {source: 'Sally', target: 'Alicee'}
                  ]
                }

    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount(){
    //this.getAdjacencyMatrix();
  }
  
  handleChange(event) {
    console.log(event)
    this.setState({data: {param: event.target.value}});
  }

  resetNodesPositions = () => this.refs.graph.resetNodesPositions();
  restartGraphSimulation = () => this.refs.graph.restartSimulation();

  decorateGraphNodesWithInitialPositioning = nodes => {
    return nodes.map(n =>
        Object.assign({}, n, {
            x: n.x || Math.floor(Math.random() * 500),
            y: n.y || Math.floor(Math.random() * 500),
        })
    );
};

  getAdjacencyMatrix(){
    console.log(this.state.data)
    var denem = this.state.data;

    denem.param = Number(denem.param);
    console.log(denem)
    Api.getAdjacencyMatrix(denem)
      .then( (response) => {
        var graphParams = {};
        var nodes = [];
        var links = [];

        for(var i=0; i<response.length; i++){
          nodes.push({id: (i+1).toString(), x: Math.floor(Math.random() * 500), y: Math.floor(Math.random() * 500)})
          for(var j=0; j<response.length; j++){
            if(response[i][j]==1){
              var flag = true;
              for(var t=0; t<links.length; t++){
                if(links[t].source == (j+1).toString() && links[t].target == (i+1).toString()){
                  flag = false;
                }
              }
              if(flag){
                links.push({source: (i+1).toString(), target: (j+1).toString()})
              }
            }
          }
        }
        graphParams.nodes = nodes;
        graphParams.links = links;
        console.log(graphParams)
        //this.decorateGraphNodesWithInitialPositioning(graphParams.nodes);
        console.log(graphParams)
        this.setState({data99: graphParams});
        console.log(this.refs)
        //this.resetNodesPositions();
        
        var stringMatrix = ""
        for(i=0; i<response.length; i++){
          for(j=0; j<response.length; j++){
            stringMatrix += response[i][j].toString();
          }
          stringMatrix += " / ";
        }

        this.setState({data2:stringMatrix})
      })
    

  }

  getAdjacencyList(){
    console.log(this.state.data)
    var denem = this.state.data;

    denem.param = Number(denem.param);
    console.log(denem)
    Api.getAdjacencyList(denem)
      .then( (response) => {

        var stringMatrix = ""
        for(var i=0; i<response.length; i++){
          for(var j=0; j<response[i].length; j++){
            stringMatrix += response[i][j].toString() + " ";
          }
          stringMatrix += "  /  ";
        }

        this.setState({data4:stringMatrix})
      })
    

  }

  render(){
    return (
        <div className="App">
            <header className="App-header">
            
            <label>
              Input:
              <textarea value={this.state.data.param} onChange={this.handleChange} />
            </label>
            <button onClick={() => {this.getAdjacencyMatrix()}}>Button</button>
            <textarea value={this.state.data2}  />
            <button onClick={() => {this.getAdjacencyList()}}>ButtonList</button>
             <textarea value={this.state.data4}/>

          <Graph
            ref="graph"
            id='graph-id' 
            data={this.state.data99}
            config={this.state.myConfig}>
          </Graph>

          </header>
          
        </div>
    )}
  
}

