import React, {Component} from 'react';
import './App.css';
import * as Api from './api.js';
import { Graph } from 'react-d3-graph';

export default class App extends Component{

  constructor(props) {
    super(props);
    this.state = {request: {
                    param: null
                  },
                  matrixTextArea: "",
                  listTextArea: "",
                  myConfig: {
                    nodeHighlightBehavior: true,
                    node: {
                        fontColor: 'white',
                        color: 'lightblue',
                        size: 120,
                        highlightStrokeColor: 'gray'
                    },
                    link: {
                        color: "lightgreen",
                        type: "STRAIGHT",
                        highlightColor: 'red'
                    }
                  },
                  graphProps: {
                    nodes: [
                      {id: '1'},
                      {id: '2'},
                      {id: '3'}
                    ],
                    links: [
                        {source: '2', target: '1'},
                        {source: '2', target: '3'},
                    ]
                  }
    };

    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(event) {
    this.setState({request: {param: event.target.value}});
  }

  setGraphParamsForMatrix(response){
    var graphParams = {};
    var nodes = [];
    var links = [];
    for(var i=0; i<response.length; i++){
      nodes.push({id: (i+1).toString(), x: Math.floor(Math.random() * 500), y: Math.floor(Math.random() * 500)})
      for(var j=0; j<response.length; j++){
        if(response[i][j]==1){
          links.push({source: (i+1).toString(), target: (j+1).toString()});
        }
      }
    }
    graphParams.nodes = nodes;
    graphParams.links = links;
    this.setState({graphProps: graphParams});
  }

  setGraphParamsForList(response){
    var graphParams = {};
    var nodes = [];
    var links = [];
    for(var i=0; i<response.length; i++){
      nodes.push({id: (i+1).toString(), x: Math.floor(Math.random() * 500), y: Math.floor(Math.random() * 500)})
      for(var j=0; j<response[i].length; j++){
        links.push({source: (i+1).toString(), target: response[i][j].toString()});
      }
    }
    graphParams.nodes = nodes;
    graphParams.links = links;
    this.setState({graphProps: graphParams});
  }

  getAdjacencyMatrix(){
    var req = this.state.request;
    req.param = Number(req.param);
    Api.getAdjacencyMatrix(req)
      .then( (response) => {
        this.setGraphParamsForMatrix(response);
        var stringMatrix = ""
        for(var i=0; i<response.length; i++){
          for(var j=0; j<response.length; j++){
            stringMatrix += response[i][j].toString() + " ";
          }
          stringMatrix += "\n";
        }
        this.setState({matrixTextArea:stringMatrix})
      })
  }

  getAdjacencyList(){
    var req = this.state.request;
    req.param = Number(req.param);
    Api.getAdjacencyList(req)
      .then( (response) => {
        this.setGraphParamsForList(response);
        var stringMatrix = ""
        for(var i=0; i<response.length; i++){
          for(var j=0; j<response[i].length; j++){
            stringMatrix += response[i][j].toString() + " ";
          }
          stringMatrix += "\n";
        }
        this.setState({listTextArea:stringMatrix})
      })
  }

  render(){
    return (
        <div className="App">
          <header className="App-header">
            <label>
              Input:
              <textarea value={this.state.request.param} onChange={this.handleChange} />
            </label>
            <div style={{float: 'left',
                            width: '100%',
                            padding: '10px'}}>
              <div style={{float: 'left',
                            width: '50%',
                            padding: '10px'}}>
                <textarea value={this.state.matrixTextArea}/>
                <button onClick={() => {this.getAdjacencyMatrix()}}>Matrix</button>
              </div>
              <div style={{float: 'left',
                            width: '50%',
                            padding: '10px'}}>
                <textarea value={this.state.listTextArea}/>
                <button onClick={() => {this.getAdjacencyList()}}>List</button>
              </div>
            </div>
            <Graph
              ref="graph"
              id='graph-id' 
              data={this.state.graphProps}
              config={this.state.myConfig}>
            </Graph>
          </header>
        </div>
    )}
  
}

