import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends Component {
  state = {
    loading: false,
    favoriteSong: [],
  };

  async componentDidMount() {
    this.setState({ favoriteSong: await getFavoriteSongs() });
  }

  saveMusicFavorite = () => {
    this.setState({ loading: true }, async () => {
      await addSong({ ...this.props });
      const { favoriteSong } = this.state;
      this.setState({
        loading: false,
        favoriteSong: [...favoriteSong, this.props],
      });
    });
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loading, favoriteSong } = this.state;
    const favoriteMusic = (
      <label htmlFor="favorite">
        ❤️
        <input
          type="checkbox"
          name="favorite"
          id="favorite"
          data-testid={ `checkbox-music-${trackId}` }
          checked={ favoriteSong.some((element) => element.trackId === trackId) }
          onChange={ this.saveMusicFavorite }
        />
      </label>
    );

    return (
      <div>
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta esse recurso.
          {' '}
          <code>audio</code>
          .
        </audio>

        {
          loading ? <Loading /> : favoriteMusic
        }
      </div>
    );
  }
}
MusicCard.defaultProps = {
  trackName: '',
};

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
};

export default MusicCard;
