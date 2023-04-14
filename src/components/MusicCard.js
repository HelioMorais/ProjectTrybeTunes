import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends Component {
  state = {
    loading: false,
    checked: false,
  };

  saveMusicFavorite = () => {
    this.setState({ loading: true }, async () => {
      const { music } = this.props;
      await addSong({ music });
      this.setState({
        loading: false,
        checked: true,
      });
    });
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loading, checked } = this.state;
    const favoriteMusic = (
      <label htmlFor="favorite">
        ❤️
        <input
          type="checkbox"
          name="favorite"
          id="favorite"
          data-testid={ `checkbox-music-${trackId}` }
          checked={ checked }
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
  music: '',
};

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  music: PropTypes.string,
};

export default MusicCard;
