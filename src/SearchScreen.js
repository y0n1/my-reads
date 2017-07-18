import React, {Component} from 'react'
import './SearchScreen.css'
import {Link} from 'react-router-dom'

class SearchScreen extends Component {
  state = {
    query: ''
  }

  handleUpdateQuery = (event) => {
    const query = event.target.value.trim()
    this.setState({ query })
  }

  render() {
    return (
      <div className="SearchScreen">
        <div className="SearchScreen-search-bar">
          <Link to="/" className="SearchScreen-back-button">Go Back</Link>
          <input className="SearchScreen-query-input" type="text" value={this.state.query} placeholder="Search by title or author" onChange={this.handleUpdateQuery} />
        </div>
        <div className="SearchScreen-results">{this.state.query}</div>
      </div>
    )
  }
}

export default SearchScreen;