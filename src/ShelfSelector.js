import React, { Component } from 'react'
import './ShelfSelector.css'

class ShelfSelector extends Component {

  state = {
    selectedShelf: this.props.selectedShelf
  }

  handleChange = (event) => {
    const newShelf = event.target.value
    const { selectedShelf, onChangeShelf } = this.props
    this.setState({ selectedShelf: newShelf })
    onChangeShelf(this.props.bookID, selectedShelf, newShelf)
  }

  render() {
    return (
      <select className="ShelfSelector" value={this.state.selectedShelf} onChange={this.handleChange}>
        <optgroup label="Move to:">
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </optgroup>
      </select>
    )
  }
}

export default ShelfSelector
