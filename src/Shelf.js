import React from 'react';
import './Shelf.css'
import Book from './Book'

function Shelf(props) {
  const {onChangeShelf} = props

  return (
    <li className="Shelf">
      <h2 className="Shelf-name">{props.name}<hr/></h2>
      <div className="Shelf-flex-container">
        {props.books.map(book => <Book key={book.id} data={book} onChangeShelf={onChangeShelf}/>)}
      </div>
    </li>
  )
}

export default Shelf
