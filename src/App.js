import React, { useState } from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import "./login.css";
import "./signup.css";
import './App.css';
import axios from 'axios';

export default function BasicExample() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Login</Link>
          </li>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
        </ul>

        <hr />
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  function loginSubmit(event) {
    event.preventDefault();

    axios({
      method: 'post',
      url: 'http://127.0.0.1:8000/api/v1/rest-auth/login/',
      data: {
          username: username,
          password: password,
      }
    }).then(obj => {
        console.log(obj.data);
    })
  }

  return (
    <div>
      <h2>Login</h2>
      <div className="Login">
        <form onSubmit={loginSubmit}>
          <FormGroup controlId="username" bsSize="large">
            <label>Username</label>
            <FormControl
              autoFocus
              type="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <label>Password</label>
            <FormControl
              value={password}
              onChange={e => setPassword(e.target.value)}
              type="password"
            />
          </FormGroup>
          <Button block bsSize="large" disabled={!validateForm()} type="submit">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  function validateForm() {
    var items = username.length > 0 && 
            password1.length > 0 && 
            password2.length > 0 && 
            email.length > 0;
    var passwords = password1 == password2;

    if(!items){

    }else if(!passwords){

    }else{
      return true;
    }
  }

  function signupSubmit(event) {
    event.preventDefault();

    axios({
      method: 'post',
      url: 'http://127.0.0.1:8000/api/v1/rest-auth/registration/',
      data: {
          username: username,
          email: email,
          password1: password1,
          password2: password2,
      }
    }).then(obj => {
        console.log(obj.data);
    })
  }

  return (
    <div>
    <h2>Signup</h2>

    <div className="Signup">
      <form onSubmit={signupSubmit}>
        <FormGroup controlId="username" bsSize="large">
          <label>Username</label>
          <FormControl
            autoFocus
            type="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="email" bsSize="large">
          <label>Email</label>
          <FormControl
            autoFocus
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <label>Password</label>
          <FormControl
            value={password1}
            onChange={e => setPassword1(e.target.value)}
            type="password"
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <label>Confirm Password</label>
          <FormControl
            value={password2}
            onChange={e => setPassword2(e.target.value)}
            type="password"
          />
        </FormGroup>
        <Button block bsSize="large" disabled={!validateForm()} type="submit">
          Login
        </Button>
      </form>
    </div>
  </div>
  );
}

