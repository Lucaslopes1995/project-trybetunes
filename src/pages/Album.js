import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Carregando from '../components/Carregando';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = { musics: [], getRespAPI: false };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const musics = await getMusics(id);
    this.setState({ musics });
    // console.log(musics[0].artistName);
  }

  render() {
    const { musics, getRespAPI } = this.state;
    const validamusic = musics.length !== 0;
    console.log(getRespAPI);

    // console.log(musics);
    return (
      <div data-testid="page-album">

        <Header />
        {(validamusic) && <p data-testid="artist-name">{musics[0].artistName}</p>}
        {validamusic && <p data-testid="album-name">{musics[0].collectionName}</p> }
        {musics.filter((el, i) => i !== 0).map((music) => (
          <div key={ music.trackId + music.artistId }>
            <MusicCard music={ music } />
          </div>

        ))}
        {getRespAPI && <Carregando />}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.string.isRequired,
};

export default Album;
