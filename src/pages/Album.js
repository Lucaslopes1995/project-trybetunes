import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Carregando from '../components/Carregando';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import './Album.css';

class Album extends React.Component {
  constructor() {
    super();
    this.state = { musics: [], getRespAPI: false, favSongs: [] };
  }

  async componentDidMount() {
    const favSongs = await getFavoriteSongs();
    const { match: { params: { id } } } = this.props;
    const musics = await getMusics(id);
    this.setState({ musics, favSongs });
    // console.log(favSongs);
  }

  render() {
    const { musics, getRespAPI, favSongs } = this.state;
    const { location, history } = this.props;
    const validamusic = musics.length !== 0;
    // console.log(getRespAPI);

    // console.log(musics[0]);
    return (
      <div id="page-album" data-testid="page-album">

        <Header history={ history } />
        <div id="body-page-album">
          {(validamusic) && (
            <div id="div-album">
              <img id="album-image" data-testid="album-image" src={ musics[0].artworkUrl100 } />
              <div id="div-textos">
                <h2 data-testid="artist-name">{musics[0].artistName}</h2>
                <span data-testid="album-name">{musics[0].collectionName}</span>
              </div>
            </div>
          )}
          <div id="div-musics">

            {musics.filter((el, i) => i !== 0).map((music) => (
              <div id="div-music" key={ music.trackId + music.artistId }>
                <MusicCard
                  music={ music }
                  mussicFav={ (favSongs
                    .find((s) => s.trackId === music.trackId) !== undefined) }
                  ajustFav={ () => {} }
                  location={ location }
                />
              </div>

            ))}
            {getRespAPI && <Carregando />}
          </div>
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default Album;
