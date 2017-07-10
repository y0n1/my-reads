import React, { Component } from 'react'

class Shelves extends Component {
  state = {
    currentlyReading: [],
    wantToRead: [],
    read: []
  }

  componentWillReceiveProps(receivedProps) {
    const onShelf = (shelfName) => (book) => book.shelf === shelfName;
    const {books} = receivedProps
    this.setState({ currentlyReading: books.filter(onShelf('currentlyReading')) })
    this.setState({ wantToRead: books.filter(onShelf('wantToRead')) })
    this.setState({ read: books.filter(onShelf('read')) })
  }

  render() {
    return (
      <div className="Shelves">
        <ul>
          <li>Currently Reading<hr/>
            {this.state.currentlyReading.map(book => (
              <figure key={book.id}>
                <img src={book.imageLinks.thumbnail} alt=""/>
                <figcaption>
                  <h5>{book.title}</h5>
                  <h6>{book.authors.join(', ')}</h6>
                </figcaption>
              </figure>
            ))}
          </li>
          <li>Want to Read<hr/>
            {this.state.wantToRead.map(book => (
                <figure key={book.id}>
                  <img src={book.imageLinks.thumbnail} alt=""/>
                  <figcaption>
                    <h5>{book.title}</h5>
                    <h6>{book.authors.join(', ')}</h6>
                  </figcaption>
                </figure>
              ))}
          </li>
          <li>Read<hr/>
            {this.state.read.map(book => (
                <figure key={book.id}>
                  <img src={book.imageLinks.thumbnail} alt=""/>
                  <figcaption>
                    <h5>{book.title}</h5>
                    <h6>{book.authors.join(', ')}</h6>
                  </figcaption>
                </figure>
              ))}
          </li>
        </ul>
      </div>
    )
  }
}

export default Shelves;
