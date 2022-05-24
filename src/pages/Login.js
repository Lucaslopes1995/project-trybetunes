import React from 'react';
import { Redirect } from 'react-router-dom';
import Carregando from '../components/Carregando';
import { createUser } from '../services/userAPI';
import './Login.css';

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

  async submitbutton(e,name) {
    e.preventDefault();
    this.setState({ carregando: true });
    const esperaCriacaoUsuario = await createUser({ name });

    if (esperaCriacaoUsuario === 'OK') {
      this.setState({ requisicaoFeita: true });
    }
  }

  render() {
    const { name, shouldDisableButton, carregando, requisicaoFeita } = this.state;
    return (
      <div id="page-login" data-testid="page-login">
        <div className='page-login-div'/>
        <form  onSubmit={ (e) => this.submitbutton(e,name) }>
          <label htmlFor="login-name-input">
            <input
              name="name"
              placeholder="Nome"
              value={ name }
              id="login-name-input"
              data-testid="login-name-input"
              onChange={ this.handleChange }
              maxLength='15'
              autoComplete='off'
            />
          </label>
          <div className='carregando'>
          {carregando && <Carregando />}
          {requisicaoFeita && <Redirect to="/project-trybetunes/search" />}

          </div>
          <button
            type="submit"
            data-testid="login-submit-button"
            disabled={ shouldDisableButton }
          >
            Entrar
          </button>
          
        </form>
      </div>

    );
  }
}

export default Login;
