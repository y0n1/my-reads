import React, { Component } from 'react'
import './SearchScreen.css'
import { Link } from 'react-router-dom'
import * as BooksAPI from './utils/BooksAPI'
import sortBy from 'sort-by'
import Book from './Book'

class SearchScreen extends Component {
  state = {
    query: '',
    searchResults: []
  }

  handleUpdateQuery = (event) => {
    const query = event.target.value.trim()
    async function sendQuery() {
      try {
        const resultsFromServer = await BooksAPI.search(query, 20)
        this.setState({ query, searchResults: resultsFromServer.sort(sortBy('title')) })
      } catch (error) {
        alert(error.message)
      }
    }

    sendQuery.bind(this)()
  }

  render() {
    return (
      <div className="SearchScreen">
        <div className="SearchScreen-search-bar">
          <Link to="/" className="SearchScreen-back-button">Go Back</Link>
          <input className="SearchScreen-query-input" type="text" value={this.state.query} placeholder="Search by title or author..." onChange={this.handleUpdateQuery} />
        </div>
        <div className="SearchScreen-results">{this.state.searchResults.map(book => (<Book key={book.id} data={book} />))}</div>
      </div>
    )
  }
}

export default SearchScreen;