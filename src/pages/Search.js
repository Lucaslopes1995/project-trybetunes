import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = { name: '',
      shouldDisableButton: true };
    this.handleChange = this.handleChange.bind(this);
    // this.submitbutton = this.submitbutton.bind(this);
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

  //   async submitbutton(name) {
  //     this.setState({ carregando: true });
  //     const esperaCriacaoUsuario = await createUser({ name });

  //     if (esperaCriacaoUsuario === 'OK') {
  //       this.setState({ requisicaoFeita: true });
  //     }
  //   }

  render() {
    const { name, shouldDisableButton } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="search-artist-input">
            <input
              name="name"
              value={ name }
              onChange={ this.handleChange }
              id="search-artist-input"
              data-testid="search-artist-input"
            />
            <button
              type="button"
              data-testid="search-artist-button"
              disabled={ shouldDisableButton }
            >
              Pesquisar
            </button>
          </label>
        </form>
      </div>
    );
  }
}

export default Search;
