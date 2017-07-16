import React, { Component } from 'react'
import './Shelves.css'
import Shelf from './Shelf'
import * as BooksAPI from './utils/BooksAPI'

class Shelves extends Component {
  state = {
    currentlyReading: [],
    wantToRead: [],
    read: []
  }

  handleChangeShelf = (bookID, currentShelf, newShelf) => {
    const booksWithSameIDs = book => book.id === bookID
    const booksWithDifferentIDs = book => book.id !== bookID
    let book = this.state[currentShelf].find(booksWithSameIDs)
    this.setState({[currentShelf]: this.state[currentShelf].filter(booksWithDifferentIDs)})
    if (newShelf !== 'none') {
      this.setState({[newShelf]: this.state[newShelf].concat(book)})
      book.shelf = newShelf
    }
    (async function() {
      const response = await BooksAPI.update(book, newShelf)
      console.log(`Response: ${JSON.stringify(response, null, 2)}`)
    })()
  }

  componentWillReceiveProps(receivedProps) {
    const byShelf = (shelfName) => (book) => book.shelf === shelfName;
    const { books } = receivedProps
    Object.keys(this.state).forEach((shelfName) => this.setState({ [shelfName]: books.filter(byShelf(shelfName)) }))
  }

  render() {
    return (
      <ul className="Shelves">
        <Shelf name="Currently Reading" books={this.state.currentlyReading} onChangeShelf={this.handleChangeShelf} />
        <Shelf name="Want to Read" books={this.state.wantToRead} onChangeShelf={this.handleChangeShelf} />
        <Shelf name="Read" books={this.state.read} onChangeShelf={this.handleChangeShelf} />
      </ul>
    )
  }
}

export default Shelves;
