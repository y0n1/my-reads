import React, { Component } from 'react'
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
        alert(error)
      }
    }
    return getAllAsync.bind(this)()
  }

  render() {
    const _Shelves_ = () => (<Shelves books={this.state.books}/>)
    return (
      <div className="App">
        <h1>MyReads</h1>
        <Switch>
          <Route path="/" exact render={_Shelves_}></Route>
        </Switch>
      </div>
    )
  }
}

export default App;
