import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = { getRespAPI: false };
    this.handleChange = this.handleChange.bind(this);
  }

  async handleChange() {
    const { music: { trackName } } = this.props;
    // console.log(target.name,target.checked)
    // this.setState({[target.name]:target.checked})
    const favSong = await addSong(trackName);
    console.log(favSong);
    this.setState({ getRespAPI: favSong !== 'OK' });
  }

  async favNewSong(musicName) {
    this.setState({ getRespAPI: true });
    const favSong = await addSong(musicName);
    this.setState({ getRespAPI: favSong !== 'OK' });
  }

  render() {
    const { music } = this.props;
    const { getRespAPI } = this.state;
    const { trackName, previewUrl, trackId } = music;
    //   console.log(music)
    return (
      <>
        <p>{trackName}</p>
        <audio
          data-testid="audio-component"
          src={ previewUrl }
          controls
        >
          <track kind="captions" />
        </audio>
        <input
          type="checkbox"
          data-testid={ `checkbox-music-${trackId}` }
          onChange={ () => this.favNewSong() }
        />
        {getRespAPI && <Carregando />}
      </>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.string.isRequired,
};

export default MusicCard;
