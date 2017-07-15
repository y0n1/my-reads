import React, { Component } from 'react'
import './App.css'
import {
  Switch,
  Route
} from 'react-router-dom'
import Shelves from './Shelves'
import * as BooksAPI from './utils/BooksAPI'

class App extends Component {
  state = {
    books: []
  }

  componentWillMount() {
    async function getAllAsync() {
      try {
        const books = await BooksAPI.getAll()
        this.setState({books})
      } catch (error) {
        console.warn(error)
      }
    }
    
    return getAllAsync.bind(this)()
  }

  render() {
    const _Shelves_ = () => (<Shelves books={this.state.books}/>)
    return (
      <div className="App">
        <h1 className="App-header">MyReads</h1>
        <Switch>
          <Route path="/" exact render={_Shelves_}></Route>
        </Switch>
      </div>
    )
  }
}

export default App;
