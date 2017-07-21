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
    results: [],
    shelves: {}
  }

  searchAsync = async (query) => {
    try {
      const results = await BooksAPI.search(query, MAX_RESULTS)
      this.setState({ results: (results.sort && results.sort(sortBy('title'))) || results })
    } catch (error) {
      alert(error.message)
    }
  }

  componentWillMount() {
    this.delayedChange = debounce((event) => {
      const query = event.target.value.trim()
      if (query.length > 0) {
        this.searchAsync(query)
      }
    }, DEBOUNCE_DELAY)
    this.setState({shelves: this.props.shelves})
  }

  handleChange = (event) => {
    event.persist()
    this.delayedChange(event)
  }

  render() {
    const {results} = this.state
    const {onChangeShelf} = this.props
    let searchResult

    if (results.error) {
      searchResult = <div className="SearchScreen-no-results">{`Server says: "${results.error}"`}</div>
    } else {
      for (const book of this.state.results) {
        const bookId = book.id
        for (const currentShelfName of Object.keys(this.state.shelves)) {
          const currentShelf = this.state.shelves[currentShelfName]
          const bookById = book => book.id === bookId
          const isBookInShelf = currentShelf.find(bookById)
          if (isBookInShelf) {
            book.shelf = currentShelfName
          }
        }
      }

      searchResult = this.state.results.map(book => (<Book key={book.id} data={book} onChangeShelf={onChangeShelf}/>))
    }

    return (
      <div className="SearchScreen">
        <div className="SearchScreen-search-bar">
          <Link to="/" className="SearchScreen-back-button">Go Back</Link>
          <input className="SearchScreen-query-input"
            placeholder="Search by title or author..."
            onChange={this.handleChange}
            type="search" />
        </div>
        <div className="SearchScreen-results">{searchResult}</div>
      </div>
    )
  }
}

export default SearchScreen;