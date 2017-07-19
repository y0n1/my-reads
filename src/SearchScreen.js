import React, { Component } from 'react'
import './SearchScreen.css'
import { Link } from 'react-router-dom'
import * as BooksAPI from './utils/BooksAPI'
import sortBy from 'sort-by'
import Book from './Book'
import { debounce } from 'lodash'

const DEBOUNCE_DELAY = 1000
const MAX_RESULTS = 10

class SearchScreen extends Component {
  state = {
    results: []
  }

  searchAsync = async (query) => {
    console.log(query)
    try {
      const results = await BooksAPI.search(query, MAX_RESULTS)
      console.log(results)
      this.setState({ results: results.sort(sortBy('title')) })
    } catch (error) {
      console.warn(error.message)
    }
  }

  componentDidMount() {
    this.delayedChange = debounce((event) => {
      const query = event.target.value.trim()
      this.searchAsync(query)
    }, DEBOUNCE_DELAY)
  }

  handleChange = (event) => {
    event.persist()
    this.delayedChange(event)
  }

  render() {
    return (
      <div className="SearchScreen">
        <div className="SearchScreen-search-bar">
          <Link to="/" className="SearchScreen-back-button">Go Back</Link>
          <input className="SearchScreen-query-input"
            placeholder="Search by title or author..."
            onChange={this.handleChange}
            type="search" />
        </div>
        <div className="SearchScreen-results">{
          this.state.results.map(book => (<Book key={book.id} data={book} />))
        }</div>
      </div>
    )
  }
}

export default SearchScreen;