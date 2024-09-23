import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const navigate = useNavigate()

  const onButtonClick = () => {
    // You'll update this function later...
  }

  return (
    <div className={'mainContainer'}>
      <div className={'titleContainer'}>
        <div>Login</div>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={email}
          placeholder="Enter your email here"
          onChange={(ev) => setEmail(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{emailError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={password}
          placeholder="Enter your password here"
          onChange={(ev) => setPassword(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input className={'inputButton'} type="button" onClick={onButtonClick} value={'Log in'} />
      </div>
    </div>
  )
}

export default Login


/*import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = ({ setLoggedIn, setEmail }) => {
  const [userEmail, setUserEmail] = useState('')
  const navigate = useNavigate()

  const handleLogin = () => {
    setEmail(userEmail) // Set the email in App.js
    setLoggedIn(true) // Mark user as logged in
    navigate('/') // Redirect back to homepage
  }

  return (
    <div>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Enter email"
        value={userEmail}
        onChange={(e) => setUserEmail(e.target.value)} // Update the local email state
      />
      <button onClick={handleLogin}>Log In</button>
    </div>
  )
}

export default Login




import React, { Component } from "react";

export default class Login extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return <h3>testingfhfh login</h3>;
    }



}
*/