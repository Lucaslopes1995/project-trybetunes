import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = { mussicFav: false, getRespAPI: false };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { mussicFav } = this.props;
    this.setState({ mussicFav });
  }

  async handleChange() {
    const { music: { trackId } } = this.props;
    // console.log(target.name,target.checked)
    // this.setState({[target.name]:target.checked})
    const favSong = await addSong(trackId);
    console.log(favSong);
    this.setState({ getRespAPI: favSong !== 'OK' });
  }

  async favNewSong() {
    const { music } = this.props;
    const { mussicFav } = this.state;
    this.setState({ getRespAPI: true });
    let favSong;
    if (!mussicFav) {
      favSong = await addSong(music);
    } else {
      // console.log(trackId)
      favSong = await removeSong(music);
    }

    // console.log(favSong);
    this.setState({ getRespAPI: favSong !== 'OK', mussicFav: !mussicFav });
  }

  render() {
    const { music } = this.props;
    const { getRespAPI, mussicFav } = this.state;
    const { trackId, previewUrl, trackName } = music;
    // console.log(mussicFav)
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
          name="mussicFav"
          type="checkbox"
          checked={ mussicFav }
          data-testid={ `checkbox-music-${trackId}` }
          onChange={ (e) => this.favNewSong(e) }
        />
        {getRespAPI && <Carregando />}
      </>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.string.isRequired,
  mussicFav: PropTypes.bool.isRequired,
};

export default MusicCard;
