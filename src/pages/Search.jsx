import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from './Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  state = {
    buttonEnable: true,
    name: '',
    albums: [],
    label: false,
  };

  getAlbums = () => {
    const { name } = this.state;
    const artist = name;
    this.setState({
      saveName: name,
      name: '',
      label: true,
    }, () => searchAlbumsAPI(artist)
      .then((result) => this.setState({
        albums: result,
        label: false,
      })));
  };

  messageAlbum = () => {
    const { saveName } = this.state;
    return (
      <span>
        Resultado de álbuns de:
        {' '}
        {saveName}
      </span>
    );
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

  returnLabel = () => {
    const {

      buttonEnable,
      name,
      albums,
      saveName,

    } = this.state;
    return (
      <label htmlFor="name">
        <input
          data-testid="search-artist-input"
          type="text"
          name="name"
          onChange={ this.handleChange }
          value={ name }
        />
        <button
          data-testid="search-artist-button"
          type="submit"
          onClick={ this.getAlbums }
          disabled={ buttonEnable }
        >
          Pesquisar
        </button>
        {(albums.length !== 0)
          && this.messageAlbum()}
        {(albums.length === 0 && saveName !== undefined)
          && <span>Nenhum álbum foi encontrado</span>}
      </label>
    );
  };

  render() {
    const { albums, label } = this.state;
    return (
      <div>
        <Header />
        <div data-testid="page-search">Search</div>
        {label
          ? <Loading /> : this.returnLabel() }
        <section>
          {albums.map((element) => (
            <div key={ element.collectionId }>
              <Link
                data-testid={ `link-to-album-${element.collectionId}` }
                to={ `/album/${element.collectionId}` }
              >
                <div>{element.artistName}</div>
                <img src={ element.artworkUrl100 } alt={ element.collectionName } />
                <div>{element.collectionName}</div>
              </Link>
            </div>
          ))}
        </section>
      </div>
    );
  }
}

export default Search;
