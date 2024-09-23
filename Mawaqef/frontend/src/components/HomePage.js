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
                <Route path="/" element={<div>    <h1>home</h1> <a href="login" class="btn btn-primary mx-2">Login</a></div>}> </Route> 
                <Route path="/login" element={<div><Login />     <p>gg</p></div>}> </Route> 
            </Routes>
        </Router>
    );
    }



}
