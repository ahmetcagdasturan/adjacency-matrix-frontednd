import * as globals from './GlobalVariables.js';

export const getAdjacencyMatrix = function(data){
    try {
    return fetch(globals.URL_ADJANCENCYMATRIX, {
        method: "post",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson)
            console.log(responseJson.result.AdjancencyMatrix)
            return responseJson.result.AdjancencyMatrix
        })
        .catch((error) =>{
            console.log(error)
            return error;
        });
    }catch(e){
        console.log(e)
    }
}

export const getAdjacencyList = function(data){
  try {  
    return fetch(globals.URL_ADJANCENCYLIST, {
        method: "post",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson)
            return responseJson.AdjancencyList;
        })
        .catch((error) =>{
            return error;
        });
  }catch(e){
    console.log(e);
  }
}