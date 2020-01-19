import React, { useState } from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import Modal from 'react-modal';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import "./dashboard.css";
import "./login.css";
import "./signup.css";
import "./App.css";
import axios from "axios";

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

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
                type="text"
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
  const [isSignedUp, setIsSignedUp] = useState(false);

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
      if (obj.status === 200 || obj.status === 201) {
        console.log("succesful");
        setIsSignedUp(true);
      } else {
        console.log("error");
      }
    });
  }

  return (
    <React.Fragment>
      {isSignedUp && <Redirect to="/dashboard" />}
      <div>
        <h2>Signup</h2>
        <div className="Signup">
          <form onSubmit={signupSubmit}>
            <FormGroup controlId="username">
              <label>Username</label>
              <FormControl
                autoFocus
                type="text"
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
    </React.Fragment>
  );
}

function Dashboard() {
  const [data, setData] = useState(null);

  const [note, setNote] = useState("");
  const [amountCents, setAmountCents] = useState(0);
  const [amountCurrency, setAmountCurrency] = useState("");
  const [userId, setUserId] = useState("");
  const [toWhomId, setToWhomUserId] = useState("");
  const [modalIsOpen, setIsOpen] = React.useState(false);

  //const [userId, setUserId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState(0);
  const [iban, setIban] = useState("");
  const [modalUpdateIsOpen, setUpdateModalIsOpen] = React.useState(false);

  const [usernameForEmail, setUsernameForEmail] = useState("");
  const [modalEmailIsOpen, setModalEmailIsOpen] = React.useState(false);

  const [userData, setUserData] = useState(null);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal(){
    setIsOpen(false);
  }

  function openModalUpdateUser() {
    setUpdateModalIsOpen(true);
  }

  function closeModalUpdateUser(){
    setUpdateModalIsOpen(false);
  }

  function openModalEmail() {
    setModalEmailIsOpen(true);
  }

  function closeModalEmail(){
    setModalEmailIsOpen(false);
  }

  function getTransactions() {
    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/v1/transactions/",
      params: {}
    }).then(obj => {
      console.log(obj.data);
      setData(obj.data);
    });
  }

  function addTransactions(event) {
    event.preventDefault();
    axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/v1/transactions/",
      data: {
        note: note,
        amount_cents: amountCents,
        amount_currency: amountCurrency,
        user: userId,
        to_whom: toWhomId,
      }
    }).then(obj => {
      if (obj.status === 200 || obj.status === 201) {
        console.log("succesful");
      } else {
        console.log("error");
      }
    });
  }

  function updateUser(event) {
    event.preventDefault();
    axios({
      method: "put",
      url: "http://127.0.0.1:8000/api/v1/users/" + userId,
      data: {
        first_name: firstName,
        last_name: lastName,
        iban: iban,
      }
    }).then(obj => {
      if (obj.status === 200) {
        console.log("succesful");
      } else {
        console.log("error");
      }
    });
  }

  function sendEmail(event) {
    event.preventDefault();
    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/v1/send-mail/",
      params: {
        username: usernameForEmail,
      }
    }).then(obj => {
      if (obj.status === 200) {
        console.log("succesful");
      } else {
        console.log("error");
      }
    });
  }

  function getAllUsers(event){
    event.preventDefault();
    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/v1/users/",
      params: {}
    }).then(obj => {
      console.log(obj.data);
      setUserData(obj.data);
    });

  }

  return (
    <div className='container align-items-center'>
      <h2>Dashboard</h2>
      {!data && <Button className='m-2' type="submit" onClick={getTransactions}>
        Get Transactions
      </Button>}
      {data && <div>
        <ul className="list-group list-group-flush">
          {data.map(item => (
            <li className="list-group-item" key={item.id}>
              <label className="label">User:</label> {item.username} |
              <label className="label">To Whom:</label> {item.to_whom_username} |
              <label className="label">Amount Cents:</label> {item.amount_cents} |
              <label className="label">Amount Currency:</label> {item.amount_currency} |
              <label className="label">Note:</label> {item.note} |
              <label className="label">State:</label> {item.state} |
              <label className="label">Date:</label> {item.created_date} |
            </li>
          ))}
        </ul>
      </div>}

      <div>
      <Button className='m-2' type="submit" onClick={openModal}>
        Add Transactions
      </Button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Add Transaction Modal"
        >
          <h2>Add Transaction</h2>
          <form onSubmit={addTransactions}>
            <FormGroup controlId="note">
              <label>Note</label>
              <FormControl
                autoFocus
                type="text"
                value={note}
                onChange={e => setNote(e.target.value)}
              />
            </FormGroup>
            <FormGroup controlId="amount_cents">
              <label>Amount Cents</label>
              <FormControl
                autoFocus
                type="text"
                value={amountCents}
                onChange={e => setAmountCents(e.target.value)}
              />
            </FormGroup>
            <FormGroup controlId="amount_currency">
              <label>Amount Currency</label>
              <FormControl
                value={amountCurrency}
                onChange={e => setAmountCurrency(e.target.value)}
                type="text"
              />
            </FormGroup>
            <FormGroup controlId="user_id">
              <label>Your User Id</label>
              <FormControl
                value={userId}
                onChange={e => setUserId(e.target.value)}
                type="text"
              />
            </FormGroup>
            <FormGroup controlId="to_whom_username">
              <label>To Whom User Id</label>
              <FormControl
                value={toWhomId}
                onChange={e => setToWhomUserId(e.target.value)}
                type="text"
              />
            </FormGroup>
            <Button block type="submit">
              Add
            </Button>
            <Button block type="submit" onClick={closeModal}>
              Close
            </Button>
          </form>
        </Modal>
      </div>

      <div>
      <Button className='m-2' type="submit" onClick={openModalUpdateUser}>
        Update User
      </Button>
        <Modal
          isOpen={modalUpdateIsOpen}
          onRequestClose={closeModalUpdateUser}
          style={customStyles}
          contentLabel="Update User Modal"
        >
          <h2>Update User</h2>
          <form onSubmit={updateUser}>
            <FormGroup controlId="user_id">
              <label>User Id</label>
              <FormControl
                autoFocus
                type="text"
                value={userId}
                onChange={e => setUserId(e.target.value)}
              />
            </FormGroup>
            <FormGroup controlId="first_name">
              <label>First Name</label>
              <FormControl
                autoFocus
                type="text"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
              />
            </FormGroup>
            <FormGroup controlId="last_name">
              <label>Last Name</label>
              <FormControl
                autoFocus
                type="text"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
              />
            </FormGroup>
            <FormGroup controlId="iban">
              <label>Iban</label>
              <FormControl
                value={iban}
                onChange={e => setIban(e.target.value)}
                type="text"
              />
            </FormGroup>
            <Button block type="submit">
              Update
            </Button>
            <Button block type="submit" onClick={closeModalUpdateUser}>
              Close
            </Button>
          </form>
        </Modal>
      </div>

      <div>
        <Button className='m-2' type="submit" onClick={openModalEmail}>
          Send Email
        </Button>

        <Modal
          isOpen={modalEmailIsOpen}
          onRequestClose={closeModalEmail}
          style={customStyles}
          contentLabel="Update User Modal"
        >
          <h2>Send Email</h2>
          <form onSubmit={sendEmail}>
            <FormGroup controlId="username">
              <label>Username</label>
              <FormControl
                value={usernameForEmail}
                onChange={e => setUsernameForEmail(e.target.value)}
                type="username"
              />
            </FormGroup>
            <Button block type="submit">
              Send
            </Button>
            <Button block type="submit" onClick={closeModalEmail}>
              Close
            </Button>
          </form>
        </Modal>
      </div>

      <div>
        {!userData && <Button className='m-2' type="submit" onClick={getAllUsers}>
        Get All User Info
        </Button>}
        {userData && <div>
          <ul className="list-group list-group-flush">
            {userData.map(item => (
              <li className="list-group-item" key={item.id}>
                <label className="label">Id:</label> {item.id} |
                <label className="label">Username:</label> {item.username} |
                <label className="label">Email:</label> {item.email} |
                <label className="label">First Name:</label> {item.first_name} |
                <label className="label">Last Name:</label> {item.last_name} |
                <label className="label">Iban:</label> {item.iban}
              </li>
            ))}
          </ul>
        </div>}
      </div>

    </div>
  );
}