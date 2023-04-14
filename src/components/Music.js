import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Music extends Component {
  render() {
    const { album } = this.props;
    const albumCheck = album.filter((element) => element.trackName !== undefined);
    return (
      <div>
        {albumCheck.map((element) => (
          <div
            key={ element.trackNumber }
          >
            <span>
              {' '}
              {element.trackName}
            </span>
            {' '}
            <br />
            <audio data-testid="audio-component" src={ element.previewUrl } controls>
              <track kind="captions" />
            </audio>
          </div>
        ))}
      </div>
    );
  }
}

Music.propTypes = {
  album: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      artist: PropTypes.string,
    }),
  ).isRequired,
};

export default Music;
