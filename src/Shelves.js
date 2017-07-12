import React, { Component } from 'react'
import './Shelves.css'
import Shelf from './Shelf'

class Shelves extends Component {
  state = {
    currentlyReading: [],
    wantToRead: [],
    read: []
  }

  componentWillReceiveProps(receivedProps) {
    const onShelf = (shelfName) => (book) => book.shelf === shelfName;
    const { books } = receivedProps
    Object.keys(this.state).forEach((shelfName) => this.setState({ [shelfName]: books.filter(onShelf(shelfName)) }))
  }

  render() {
    return (
      <ul className="Shelves">
        <Shelf name="Currently Reading" books={this.state.currentlyReading}/>
        <Shelf name="Want to Read" books={this.state.wantToRead} />
        <Shelf name="Read" books={this.state.read} />
      </ul>
    )
  }
}

export default Shelves;
