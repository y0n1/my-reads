import React from 'react'
import './Bookcase.css'
import Shelf from './Shelf'
import { Link } from 'react-router-dom'

function Bookcase(props) {
  const {
    onChangeShelf,
    currentlyReading,
    wantToRead,
    read
  } = props

  return (
    <div className="Bookcase">
      <ul className="Bookcase-list">
        <Shelf name="Currently Reading" books={currentlyReading} onChangeShelf={onChangeShelf} />
        <Shelf name="Want to Read" books={wantToRead} onChangeShelf={onChangeShelf} />
        <Shelf name="Read" books={read} onChangeShelf={onChangeShelf} />
      </ul>
      <Link to="/search" className="Bookcase-add-book">Add Book</Link>
    </div>
  )
}

export default Bookcase;
