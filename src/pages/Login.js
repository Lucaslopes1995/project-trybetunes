import React from 'react';
import { Redirect } from 'react-router-dom';
import Carregando from '../components/Carregando';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor() {
    super();
    this.state = { name: '',
      shouldDisableButton: true,
      carregando: false,
      requisicaoFeita: false };
    this.handleChange = this.handleChange.bind(this);
    this.submitbutton = this.submitbutton.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;

    // const validButton = (value.length >3) ? false : true
    this.setState({ [name]: value });

    this.setState((state) => {
      const { name: nome } = state;
      const validButton = nome.length <= 2;
      return { shouldDisableButton: validButton };
    });
  }

  async submitbutton(name) {
    this.setState({ carregando: true });
    const esperaCriacaoUsuario = await createUser({ name });

    if (esperaCriacaoUsuario === 'OK') {
      this.setState({ requisicaoFeita: true });
    }
  }

  render() {
    const { name, shouldDisableButton, carregando, requisicaoFeita } = this.state;
    return (
      <div data-testid="page-login">
        <form>
          <label htmlFor="login-name-input">
            Nome
            <input
              name="name"
              value={ name }
              id="login-name-input"
              data-testid="login-name-input"
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            data-testid="login-submit-button"
            disabled={ shouldDisableButton }
            onClick={ () => this.submitbutton(name) }
          >
            Entrar
          </button>
          {carregando && <Carregando />}
          {requisicaoFeita && <Redirect to="/search" />}
        </form>
      </div>

    );
  }
}

export default Login;
