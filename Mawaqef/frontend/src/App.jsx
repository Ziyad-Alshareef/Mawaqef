import './index.css'
import './App.css'
import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Body1 from './Body1.jsx'   //Import the Body1 component
import Signin from './Signin.jsx' // Import the SignIn component
import Signup from './Signup.jsx' // Import the SignUp component
import Admin from './Admin.jsx'   // Import the Admin component



function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="logo">
          <a href="/">
            <img src="./public/logo.png" alt="Mawaqef Logo" className="logo-image" />
          </a>
        </span>
      </div>
      <div className="navbar-right">
        <a href="/Ogranizations">Organizations</a>
        <a href="/signin">Sign In</a>
        <a href="/signup">Sign Up</a>
      </div>
    </nav>
  )
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Body1 />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<Admin />} /> {/* Add route for Admin */}
      </Routes>
    </Router>
  )
}

export default App
