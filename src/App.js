import React, { Component } from 'react'
import './App.css'
import {
  Switch,
  Route
} from 'react-router-dom'
import Bookcase from './Bookcase'
import * as BooksAPI from './utils/BooksAPI'
import SearchScreen from './SearchScreen'

class App extends Component {
  state = {
    currentlyReading: [],
    wantToRead: [],
    read: []
  }

  handleChangeShelf = (bookID, currentShelf, newShelf) => {
    const booksWithSameIDs = book => book.id === bookID
    const booksWithDifferentIDs = book => book.id !== bookID
    let book = this.state[currentShelf].find(booksWithSameIDs)
    this.setState({ [currentShelf]: this.state[currentShelf].filter(booksWithDifferentIDs) })
    if (newShelf !== 'none') {
      this.setState({ [newShelf]: this.state[newShelf].concat(book) })
      book.shelf = newShelf
    }
    (async function updateShelf() {
      await BooksAPI.update(book, newShelf)
    })()
  }

  componentWillMount() {
    async function getAllAsync() {
      const byShelf = (shelfName) => (book) => book.shelf === shelfName;
      try {
        const books = await BooksAPI.getAll()
        Object.keys(this.state).forEach((shelfName) => this.setState({ [shelfName]: books.filter(byShelf(shelfName)) }))
      } catch (error) {
        alert(error)
      }
    }

    getAllAsync.bind(this)()
  }

  render() {
    const {
      currentlyReading,
      wantToRead,
      read
    } = this.state

    const _Bookcase_ = () => (
      <Bookcase onChangeShelf={this.handleChangeShelf}
        currentlyReading={currentlyReading}
        wantToRead={wantToRead}
        read={read} />
    )
    const _SearchScreen_ = () => (<SearchScreen onChangeShelf={this.handleChangeShelf} />)
    return (
      <div className="App">
        <h1 className="App-header">My Reads</h1>
        <Switch>
          <Route path="/" exact render={_Bookcase_} />
          <Route path="/search" render={_SearchScreen_} />
        </Switch>
      </div>
    )
  }
}

export default App;
