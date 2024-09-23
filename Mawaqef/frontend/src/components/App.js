import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { useState } from "react";
import { render } from "react-dom";
import HomePage from "./Homepage"; // Ensure this imports the correct component
import Login from "./Login"; // Import your Login component
import '../../static/css/index.css';

const App = () => {
    const [loggedIn, setLoggedIn] = useState(false); // Track login state
    const [email, setEmail] = useState('') // track email state

    return (
        
            <div className="App"><BrowserRouter>
                <Routes>
                <Route
            path="/"
            element={<HomePage email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
          />
          
          <Route path="/Login" element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
                </Routes>
            </BrowserRouter></div>
        
    );
}
//export default App

const appdiv = document.getElementById("app");
render(<App />, appdiv);





/*import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { Component } from "react";
import { render } from "react-dom";
import HomePage from "./Homepage"; // Ensure this imports the correct component
import Login from "./Login"; // Import your Login component
import '../../static/css/index.css'
import { useState } from 'react'

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </div>
            </BrowserRouter>
        );
    }
}

const appdiv = document.getElementById("app");
render(<App />, appdiv);
*/












/*import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './Homepage'
import Login from './Login'
import '../../static/css/index.css'
import { useState } from 'react'

function App() {
  const [loggedIn, setLoggedIn] = useState(false) // track login state
  const [email, setEmail] = useState('') // track email state

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          
          <Route
            path="/"
            element={<HomePage email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
          />
          
          <Route path="/Login" element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

*/




/*import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from "./Homepage";
import Login from './Login'
import '../../static/css/index.css'
import { useEffect, useState } from 'react'

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [email, setEmail] = useState('')

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<HomePage email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
          />
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
*/


/*


import { BrowserRouter, Route, Routes } from 'react-router-dom'
import React, { Component } from "react";
import { render } from "react-dom";
import HomePage from "./Homepage";


export default class App extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return (
    <div className="App">
      <HomePage />
        
    </div>
  )
    }



}

const appdiv = document.getElementById("app");
render(<App />, appdiv)

*/