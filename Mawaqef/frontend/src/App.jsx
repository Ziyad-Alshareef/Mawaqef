import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import './index.css';
import Body1 from './Body1';
import Signin from './Signin';
import Signup from './Signup';
import Admin from './Admin';
import Organizations from './Organizations';
import Footer from './Footer';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="logo">
          <Link to="/">
            <img src="./public/logo.png" alt="Mawaqef Logo" className="logo-image" />
          </Link>
        </span>
      </div>
      <div className="navbar-right">
        <Link to="/Organizations">Organizations</Link>
        <Link to="/signin">Sign In</Link>
        <Link to="/signup">Sign Up</Link>
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Body1 />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/organizations" element={<Organizations />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
