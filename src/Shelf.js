import React from 'react';
import './Shelf.css'
import ShelfSelector from './ShelfSelector'

function Shelf(props) {
  return (
    <li className="Shelf">
      <h2 className="Shelf-name">{props.name}<hr/></h2>
      <div className="Shelf-flex-container">
        {props.books.map(book => (
          <figure className="Shelf-figure" key={book.id}>
            <div className="Shelf-container-thumbnail-and-selector">
              <img className="Shelf-thumbnail" src={book.imageLinks.thumbnail} alt={`${book.title} - ${book.subtitile}`} />
              <ShelfSelector />
            </div>
            <figcaption>
              <h4>{book.title}</h4>
              <h5>{book.authors.join(', ')}</h5>
            </figcaption>
          </figure>
        ))}
      </div>
    </li>
  )
}

export default Shelf
