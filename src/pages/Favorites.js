import React from 'react';
import Header from '../components/Header';
import Carregando from '../components/Carregando';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = { getRespAPI: false, favSongs: [] };
  }

  async componentDidMount() {
    this.setState({ getRespAPI: true });
    const favSongs = await getFavoriteSongs();
    this.setState({ favSongs, getRespAPI: false });
    // console.log(favSongs);
  }

  //   componentDidUpdate() {
  //     this.setState({ getRespAPI: true });
  //     const {favSongs} = this.state
  //     this.setState({ favSongs, getRespAPI: false });
  //   }

  render() {
    const { favSongs, getRespAPI } = this.state;
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
          />
        ))}
      </div>
    );
  }
}

export default Favorites;
