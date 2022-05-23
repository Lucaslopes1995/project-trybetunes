import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';
import './MusicCard.css';
import coracao from '../images/coracao.png'
import coracaoSel from '../images/coracao-selecionado.png'

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = { mussicFav: false, getRespAPI: false };
  }

  componentDidMount() {
    const { mussicFav } = this.props;
    this.setState({ mussicFav });
  }

  componentWillUnmount() {
    const { mussicFav } = this.state;
    this.setState({ mussicFav, getRespAPI: false });
  }

  async favNewSong() {
    const { music, ajustFav, location } = this.props;
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
    if (!location.pathname.includes('album')) {
      ajustFav();
    }

    // ajustFav();
  }

  render() {
    const { music, location } = this.props;
    const validaLocation = !location.pathname.includes('album');
    const { getRespAPI, mussicFav } = this.state;
    const { trackId, previewUrl, trackName } = music;
    const imgCor =  mussicFav ? coracaoSel : coracao

    // console.log(mussicFav)
    return (
      <>
        <p id="track-name">{trackName}</p>
        <audio
          data-testid="audio-component"
          src={ previewUrl }
          controls
        >
          <track kind="captions" />
        </audio>
        <label htmlFor={ trackId } id="track-lab-fav">
          <input
            id={ trackId }
            className="track-fav"
            name="mussicFav"
            type="checkbox"
            checked={ mussicFav }
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ (e) => this.favNewSong(e) }
          />
          <img src={imgCor}></img>
        </label>
        <div className='div-carregando'>
          {getRespAPI && <Carregando />}
        </div>
      </>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.object.isRequired,
  mussicFav: PropTypes.bool.isRequired,
  ajustFav: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
};

export default MusicCard;
