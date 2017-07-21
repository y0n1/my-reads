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

  fetchBooksAndSortAsync = async _ => {
    const byShelf = shelfName => book => book.shelf === shelfName;
    try {
      const books = await BooksAPI.getAll()
      const shelves = Object.keys(this.state)
      shelves.forEach(shelfName => this.setState({ [shelfName]: books.filter(byShelf(shelfName)) }))
    } catch (error) {
      alert(error)
    }
  }

  /**
   * if book exists on currentShelfName
   *   remove book from currentShelfName
   *   add book to newShelf
   * else (we need to add a new book to some shelf),
   *   request the book details from the server, let newBook be the reference to the returned data
   *   add newBook to newShelf
   */
  handleChangeShelfAsync = async (bookId, currentShelfName, newShelfName) => {
    let book
    let currentShelf = this.state[currentShelfName]
    let newShelf = this.state[newShelfName]

    // Specific Helpers
    const bookById = book => book.id === bookId
    const booksWithDifferentId = book => book.id !== bookId
    const isDefined = something => something !== undefined
    const removeFromCurrentShelf = _ => (book.shelf = newShelfName) && this.setState({ [currentShelfName]: currentShelf.filter(booksWithDifferentId) })
    const addToNewShelf = _ => (book.shelf = newShelfName) && this.setState({ [newShelfName]: newShelf.concat(book) })
    const switchingShelves = isDefined(currentShelf) && isDefined(newShelf)
    const addingToShelf = !isDefined(currentShelf) && isDefined(newShelf)
    const removingFromShelf = isDefined(currentShelf) && !isDefined(newShelf)

    if (switchingShelves) {
      book = currentShelf.find(bookById)
      removeFromCurrentShelf()
      addToNewShelf()
    } else if (addingToShelf) {
      book = await BooksAPI.get(bookId)
      addToNewShelf()
    } else if (removingFromShelf) {
      book = currentShelf.find(bookById)
      removeFromCurrentShelf()
    }

    try {
      const response = await BooksAPI.update(book, newShelfName)
      console.log(`%c [BooksAPI::Update]: ${JSON.stringify(response, null, 2)}`, 'color: green')
    } catch (error) {
      alert(error)
    }
  }

  componentWillMount() {
    this.fetchBooksAndSortAsync()
  }

  render() {
    const {
      currentlyReading,
      wantToRead,
      read
    } = this.state

    const _Bookcase_ = _ => (
      <Bookcase onChangeShelf={this.handleChangeShelfAsync}
        currentlyReading={currentlyReading}
        wantToRead={wantToRead}
        read={read} />
    )
    const _SearchScreen_ = _ => (<SearchScreen onChangeShelf={this.handleChangeShelfAsync} shelves={this.state}/>)

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
