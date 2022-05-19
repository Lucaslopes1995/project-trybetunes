import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Carregando from '../components/Carregando';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';

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
    const { location } = this.props;
    console.log(favSongs);

    return (
      <div data-testid="page-favorites">
        <Header />
        {getRespAPI && <Carregando />}
        {favSongs.map((song) => (
          <MusicCard
            key={ song.trackId }
            music={ song }
            mussicFav
            ajustFav={ this.ajustFav }
            location={ location }
          />
        ))}
      </div>
    );
  }
}

Favorites.propTypes = {
  location: PropTypes.string.isRequired,
};

export default Favorites;
