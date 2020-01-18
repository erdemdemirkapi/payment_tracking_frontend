import React, { useState } from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import "./login.css";
import "./signup.css";
import "./App.css";
import axios from "axios";

export default function App() {
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
          <Route path="/dashboard">
            <Dashboard />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  function loginSubmit(event) {
    event.preventDefault();
    axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/v1/rest-auth/login/",
      data: {
        username: username,
        password: password
      }
    }).then(obj => {
      if (obj.status === 200) {
        console.log("succesful");
        setIsLoggedIn(true);
      } else {
        console.log("error");
      }
    });
  }

  return (
    <React.Fragment>
      {isLoggedIn && <Redirect to="/dashboard" />}
      <div>
        <h2>Login</h2>
        <div className="Login">
          <form onSubmit={loginSubmit}>
            <FormGroup controlId="username">
              <label>Username</label>
              <FormControl
                autoFocus
                type="username"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </FormGroup>
            <FormGroup controlId="password">
              <label>Password</label>
              <FormControl
                value={password}
                onChange={e => setPassword(e.target.value)}
                type="password"
              />
            </FormGroup>
            <Button block disabled={!validateForm()} type="submit">
              Login
            </Button>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  function validateForm() {
    var items =
      username.length > 0 &&
      password1.length > 0 &&
      password2.length > 0 &&
      email.length > 0;
    var passwords = password1 === password2;

    if (!items) {
    } else if (!passwords) {
    } else {
      return true;
    }
  }

  function signupSubmit(event) {
    event.preventDefault();

    axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/v1/rest-auth/registration/",
      data: {
        username: username,
        email: email,
        password1: password1,
        password2: password2
      }
    }).then(obj => {
      console.log(obj.data);
    });
  }

  return (
    <div>
      <h2>Signup</h2>
      <div className="Signup">
        <form onSubmit={signupSubmit}>
          <FormGroup controlId="username">
            <label>Username</label>
            <FormControl
              autoFocus
              type="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </FormGroup>
          <FormGroup controlId="email">
            <label>Email</label>
            <FormControl
              autoFocus
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </FormGroup>
          <FormGroup controlId="password1">
            <label>Password</label>
            <FormControl
              value={password1}
              onChange={e => setPassword1(e.target.value)}
              type="password"
            />
          </FormGroup>
          <FormGroup controlId="password2">
            <label>Confirm Password</label>
            <FormControl
              value={password2}
              onChange={e => setPassword2(e.target.value)}
              type="password"
            />
          </FormGroup>
          <Button block disabled={!validateForm()} type="submit">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}

function Dashboard() {
  const [data, setData] = useState(null);

  function getItems() {
    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/v1/transactions/",
      params: {}
    }).then(obj => {
      console.log(obj.data);
      setData(obj.data);
    });
  }

  return (
    <div>
      <h2>Dashboard</h2>
      {!data && <Button block type="submit" onClick={getItems}>
        Get Items
      </Button>}
      {data && <div>
        <ul className="list-group list-group-flush">
          {data.map(item => (
            <li className="list-group-item" key={item.id}>
              <label className="label">Id:</label> {item.id} |
              <label className="label">User:</label> {item.user.username} |
              <label className="label">Amount Cents:</label> {item.amount_cents}
            </li>
          ))}
        </ul>
      </div>}
    </div>
  );
}
