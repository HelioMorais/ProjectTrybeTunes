import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  state = {
    buttonEnable: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
    this.enableButton(value);
  };

  enableButton = (value) => {
    const minValue = 2;
    if (value.length >= minValue) {
      this.setState({
        buttonEnable: false,
      });
    } else {
      this.setState({
        buttonEnable: true,
      });
    }
  };

  render() {
    const { buttonEnable } = this.state;
    return (
      <div>
        <Header />
        <div data-testid="page-search">Search</div>
        <label htmlFor="name">
          <input
            data-testid="search-artist-input"
            type="text"
            name="name"
            onChange={ this.handleChange }
          />
          <button
            data-testid="search-artist-button"
            type="submit"
            disabled={ buttonEnable }
          >
            Pesquisar
          </button>
        </label>
      </div>
    );
  }
}

export default Search;
