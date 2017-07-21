import React from 'react'
import './Book.css'
import ShelfSelector from './ShelfSelector'

function Book(props) {
  const book = props.data
  const {onChangeShelf} = props

  return (
    <figure className="Book">
      <div className="Book-thumbnail-and-selector-container">
        <img className="Book-thumbnail" src={book.imageLinks && book.imageLinks.thumbnail} alt={`${book.title} - ${book.subtitle && book.subtitle}`} />
        <ShelfSelector bookID={book.id} selectedShelf={book.shelf} onChangeShelf={onChangeShelf} />
      </div>
      <figcaption>
        <h4>{book.title}</h4>
        <h5>{book.authors && book.authors.join(', ')}</h5>
      </figcaption>
    </figure>
  )
}

export default Book
