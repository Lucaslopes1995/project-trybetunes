import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Carregando from '../components/Carregando';
import './Search.css';

class Search extends React.Component {
  constructor() {
    super();
    this.state = { name: '',
      shouldDisableButton: true,
      carregando: false,
      requisicaoFeita: false,
      albuns: [],
      artista: '',
      notFoundArtist: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitbutton = this.submitbutton.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;

    // const validButton = (value.length >3) ? false : true
    this.setState({ [name]: value });

    this.setState((state) => {
      const { name: nome } = state;
      const validButton = nome.length <= 1;
      return { shouldDisableButton: validButton };
    });
  }

  async submitbutton(e) {
    e.preventDefault();
    const { name } = this.state;
    this.setState({ name: '', carregando: true, artista: name });
    const esperaRetornoArtista = await searchAlbumsAPI(name);
    let validaArtista = true;
    if (esperaRetornoArtista.length === 0) {
      validaArtista = false;
    }
    this.setState({ albuns: esperaRetornoArtista,
      requisicaoFeita: true,
      carregando: false,
      notFoundArtist: validaArtista,
      shouldDisableButton: true });
  }

  render() {
    const { name,
      shouldDisableButton,
      carregando,
      requisicaoFeita,
      albuns,
      artista,
      notFoundArtist } = this.state;

    const { history } = this.props;

    return (
      <div data-testid="page-search">
        <Header history={ history } />
        <div id="body-search-page">
          <form id="form-search" onSubmit={ this.submitbutton }>
            {carregando ? <Carregando /> : (
              <div id="input-button-form">
                <label htmlFor="search-artist-input">
                  <input
                    name="name"
                    value={ name }
                    onChange={ this.handleChange }
                    id="search-artist-input"
                    data-testid="search-artist-input"
                  />
                </label>
                <button
                  type="submit"
                  data-testid="search-artist-button"
                  disabled={ shouldDisableButton }
                >
                  Pesquisar
                </button>
              </div>)}
          </form>

          <div id="result-found-musics">
            {requisicaoFeita && (
              <p>
                Resultado de álbuns de
                {' '}
                {artista}
                {':'}
              </p>)}
            <div id="found-musics">
              {requisicaoFeita && albuns.map((album,i) => (
                <div key={ album.artistId + album.releaseDate + album.trackCount + i} id="div-img-text">
                  <div id="div-img">
                    <img alt={ album.collectionId } src={ album.artworkUrl100 } onClick={()=>history.push(`album/${album.collectionId}`)}/>
                  </div>
                  <div id="div-text">
                    <Link
                      data-testid={ `link-to-album-${album.collectionId}` }
                      to={ `album/${album.collectionId}` }
                    >
                      {album.collectionName}
                    </Link>
                    <p>{album.artistName}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {!notFoundArtist && <p>Nenhum álbum foi encontrado</p>}

        </div>
      </div>
    );
  }
}

export default Search;
