import React, { Component } from "react";
import { render } from "react-dom";

export default class App extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return <h1>testing testing ...</h1>;
    }



}

const appdiv = document.getElementById("app");
render(<App />, appdiv)