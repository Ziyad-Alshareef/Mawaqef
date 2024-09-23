import React, { Component } from "react";
import { render } from "react-dom";
import HomePage from "./Homepage";


export default class App extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return <div><HomePage />
        </div>;
    }



}

const appdiv = document.getElementById("app");
render(<App />, appdiv)