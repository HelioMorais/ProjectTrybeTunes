import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from './Loading';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends Component {
  state = {
    album: [],
  };

  componentDidMount() {
    const { match: { params } } = this.props;
    getMusics(params.id).then((result) => this.setState({
      album: result,
    }));
  }

  renderAlbumPage = () => {
    const { album } = this.state;
    return (
      <div data-testid="page-album">
        <span data-testid="artist-name">
          Artista/Banda:
          {' '}
          {album[0].artistName}
        </span>
        {' '}
        <br />
        <span data-testid="album-name">
          Coleção:
          {' '}
          {album[0].collectionCensoredName}
        </span>
      </div>
    );
  };

  render() {
    const { album } = this.state;
    const authenticateAlbum = album.filter((element) => element.trackName !== undefined);
    return (
      <div>
        <Header />
        {(album.length === 0)
          ? <Loading /> : this.renderAlbumPage()}
        {authenticateAlbum.map(({ trackName, trackId, previewUrl }) => (
          <div key={ trackName }>
            <p>{ trackName }</p>
            <MusicCard
              trackId={ trackId }
              previewUrl={ previewUrl }
              album={ album }
            />
          </div>))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
