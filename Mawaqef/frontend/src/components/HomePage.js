import React, { Component } from "react";
import Login from "./Login";
import { BrowserRouter as Router, Routes, Route, Link, Redirect,} from "react-router-dom";


export default class HomePage extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return  (//<Login />
            <Router>
            <Routes>
                {/* This matches the root path '/' */}
                <Route path="/" element={<p>hh</p>} /> 
            </Routes>
        </Router>
    );
    }



}
