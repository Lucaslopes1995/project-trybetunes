import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Carregando from '../components/Carregando';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';
import './Favorites.css';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = { getRespAPI: false, favSongs: [] };
    this.ajustFav = this.ajustFav.bind(this);
  }

  async componentDidMount() {
    this.ajustFav();

    // console.log(favSongs);
  }

  async ajustFav() {
    this.setState({ getRespAPI: true });
    const favSongs = await getFavoriteSongs();
    this.setState({ favSongs, getRespAPI: false });
  }

  //   componentDidUpdate() {
  //     this.setState({ getRespAPI: true });
  //     const {favSongs} = this.state
  //     this.setState({ favSongs, getRespAPI: false });
  //   }

  render() {
    const { favSongs, getRespAPI } = this.state;
    const { location, history } = this.props;
    // console.log(favSongs);

    return (
      <div data-testid="page-favorites">
        <Header history={ history } />

        <div id="div-body-favorites">
          <div id="textos-inicio">
            <div id='div-carregando'>
              {getRespAPI && <Carregando />}
            </div>
            <p>Músicas Favoritas</p>
            <hr />
          </div>
          <div>
            {favSongs.map((song,i) => (
              <div id="div-fav-music" key={ song.trackId+i}>
                <img src={ song.artworkUrl100 } id="img-fav-music" />
                <MusicCard
                  
                  music={ song }
                  mussicFav
                  ajustFav={ this.ajustFav }
                  location={ location }
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    );
  }
}

Favorites.propTypes = {
  location: PropTypes.object.isRequired,
};

export default Favorites;
