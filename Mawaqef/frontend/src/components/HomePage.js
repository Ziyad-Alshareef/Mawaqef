/*import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../../static/css/index.css'

const HomePage = (props) => {
  // get props, including setLoggedIn
  const navigate = useNavigate();

  const onButtonClick = () => {
    navigate('/login');
  }

  return (
    <div className="mainContainer">
      <div className={'titleContainer'}>
        <div>Welcome!</div>
      </div>
      <div>This is the home page.</div>
      <div className={'buttonContainer'}>
        <input
          className={'inputButton'}
          type="button"
          onClick={onButtonClick}
          value="button"
        />
        
      </div>
    </div>
  )
}

export default HomePage
*/


import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../../static/css/index.css'

const HomePage = (props) => {
  const { loggedIn, email, setLoggedIn } = props // get props, including setLoggedIn
  const navigate = useNavigate()

  const onButtonClick = () => {
    if (loggedIn) {
      setLoggedIn(false) // log out the user
    } else {
      navigate('/Login') // redirect to the login page if not logged in
    }
  }

  return (
    <div className="mainContainer">
      <div className={'titleContainer'}>
        <div>Welcome!</div>
      </div>
      <div>This is the home page.</div>
      <div className={'buttonContainer'}>
        <input
          className={'inputButton'}
          type="button"
          onClick={onButtonClick}
          value={loggedIn ? 'Log out' : 'Log in'} // Button text changes based on login state
        />
        {loggedIn ? <div>Your email address is {email}</div> : null} 
      </div>
    </div>
  )
}

export default HomePage


/*
import React from 'react'
import { useNavigate } from 'react-router-dom'

const HomePage = (props) => {
  const { loggedIn, email } = props
  const navigate = useNavigate()

  const onButtonClick = () => {
    // You'll update this function later
  }

  return (
    <div className="mainContainer">
      <div className={'titleContainer'}>
        <div>Welcome!</div>
      </div>
      <div>This is the home page.</div>
      <div className={'buttonContainer'}>
        <input
          className={'inputButton'}
          type="button"
          onClick={onButtonClick}
          value={loggedIn ? 'Log out' : 'Log in'}
        />
        {loggedIn ? <div>Your email address is {email}</div> : <div />}
      </div>
    </div>
  )
}

export default HomePage


*/








/*


import React, { Component } from "react";
import Login from "./Login";
import { BrowserRouter as Router, Routes, Route, Link, Redirect,} from "react-router-dom";
import Logintwo from "./Logintwo";

export default class HomePage extends Component{

    constructor(props){
        super(props);
    }

    render() {
        return (
            <Router>
                <Routes>
                    
                    <Route exact path="/">
                        <div>
                            <h1>Home</h1>
                            
                            <Link to="/Logintwo" className="btn btn-primary mx-2">Login</Link>
                        </div>
                    </Route>
                    
                    <Route exact path="/login">
                        <div>
                            <Login />
                            <p>gg</p>
                        </div>
                    </Route>
    
                    <Route exact path="/Logintwo">
                        <Logintwo />
                    </Route>
                </Routes>
            </Router>
        );
    }



}



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
                
                <Route path="/" element={<div>    <h1>home</h1> <a href="login" class="btn btn-primary mx-2">Login</a></div>}> </Route> 
                <Route path="/login" element={<div><Login />     <p>gg</p></div>}> </Route> 
            </Routes>
        </Router>
    );
    }



}


*/ 