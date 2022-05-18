import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Carregando from '../components/Carregando';

class Search extends React.Component {
  constructor() {
    super();
    this.state = { name: '',
      shouldDisableButton: true,
      carregando: false,
      requisicaoFeita: false,
      albuns: [],
      artista: '',
      notFoundArtist: false,
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

  async submitbutton() {
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
      notFoundArtist: validaArtista });
  }

  render() {
    const { name,
      shouldDisableButton,
      carregando,
      requisicaoFeita,
      albuns,
      artista,
      notFoundArtist } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <form>
          {carregando ? <Carregando /> : (
            <label htmlFor="search-artist-input">
              <input
                name="name"
                value={ name }
                onChange={ this.handleChange }
                id="search-artist-input"
                data-testid="search-artist-input"
              />
            </label>)}
          {!carregando && (
            <button
              type="button"
              data-testid="search-artist-button"
              disabled={ shouldDisableButton }
              onClick={ this.submitbutton }
            >
              Pesquisar
            </button>)}
          {requisicaoFeita && (
            <p>
              Resultado de álbuns de:
              {' '}
              {artista}
            </p>)}

          {requisicaoFeita && albuns.map((album) => (
            <div key={ album.artistId + album.releaseDate + album.trackCount }>
              <Link
                data-testid={ `link-to-album-${album.collectionId}` }
                to={ `album/${album.collectionId}` }
              >
                {album.collectionName}
              </Link>
              <p>{album.artistName}</p>
            </div>
          ))}
          {!notFoundArtist && <p>Nenhum álbum foi encontrado</p>}

        </form>
      </div>
    );
  }
}

export default Search;
