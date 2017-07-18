import React from 'react'
import './Book.css'
import ShelfSelector from './ShelfSelector'

function Book(props) {
  const book = props.data

  return (
    <figure className="Book">
      <div className="Book-thumbnail-and-selector-container">
        <img className="Book-thumbnail" src={book.imageLinks.thumbnail} alt={`${book.title} - ${book.subtitile}`} />
        <ShelfSelector bookID={book.id} selectedShelf={book.shelf} onChangeShelf={props.onChangeShelf} />
      </div>
      <figcaption>
        <h4>{book.title}</h4>
        <h5>{book.authors.join(', ')}</h5>
      </figcaption>
    </figure>
  )
}

export default Book
