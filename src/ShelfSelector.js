import React, { Component } from 'react'
import './ShelfSelector.css'

class ShelfSelector extends Component {

  render() {
    return (
      <select className="ShelfSelector">
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead" selected>Want to Read</option>
        <option value="read">Read</option>
        <option value="none">none</option>
      </select>
    )
  }
}
