import React, { Component } from 'react';
import Modal from 'react-modal';
import './App.css';
import axios from 'axios';

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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
      modalIsOpen: false,
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.getItems = this.getItems.bind(this);
  }

  componentDidMount() {
    this.getItems();
  }

  getItems() {
    axios.get('http://127.0.0.1:8000/api/v1/users/')
    .then(response => {
      this.setState({
        isLoaded: true,
        items: response.data,
      })
    });
  }

  openModal(item) {
    this.setState({
      modalIsOpen: true,
      updateItemName: item.name
    });
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {
    var { isLoaded, items } = this.state;
    
    console.log(isLoaded);
    console.log(items);

    if( !isLoaded ){
      return <div>Loading...</div>
    }
    else { 
      return (
        <div className="App"> 
          <ul className="list-group list-group-flush">
            {items.map(item => (
              <li className="list-group-item" key={item.id}>
                <label className="label">Email:</label> {item.email} | 
                <label className="label">Username:</label> {item.username} | 
                <label className="label">First Name:</label> {item.first_name} |
                <label className="label">Last Name:</label> {item.last_name} |
              </li>
            ))}
          </ul>

        </div>
      );
    }
  }
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
