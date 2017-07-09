import React from 'react';
import './Shelves.css';
import SearchButton from '../SearchButton/SearchButton';
import 

function Shelves(props) {
  return (
    <div className="Shelves">
      <ul>
        <li>Currently Reading<hr /></li>
        <li>Want to Read<hr /></li>
        <li>Read<hr /></li>
      </ul>
      <SearchButton />
    </div>
  );
}

export default Shelves;
