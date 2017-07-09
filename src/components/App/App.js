import React, { Component } from 'react';
import './App.css';
import {
  Switch,
  Route
} from 'react-router-dom'; 
import Shelves from '../Shelves/Shelves';

class App extends Component {
  shelves = {
    "Currently Reading": [],
    "Want to Read": [],
    "Read": []
  }
  

  render() {
    return (
      <div className="App">
        <h1>MyReads</h1>
        <Switch>
          <Route path="/" exact component={Shelves}></Route>
        </Switch>
        
      </div>
    );
  }
}

export default App;
