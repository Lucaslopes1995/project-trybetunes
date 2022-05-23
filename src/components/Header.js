import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';
import './Header.css';
import avatar from '../images/avatar.png';
import logo from '../images/logoBranco.png';

class Header extends React.Component {
  constructor() {
    super();
    this.state = { user: {}, awaitUser: true };
    this.clickMenu = this.clickMenu.bind(this);
    // this.usuario = this.usuario.bing(this);
  }

  async componentDidMount() {
    const { history } = this.props;
    this.setState({ history });
    const usuario = await getUser();
    this.setState({ user: usuario, awaitUser: false });
  }

  clickMenu({ target }) {
    const { history } = this.state;
    const { id, className } = target;
    if (className === 'logo-perfil' || id === 'profile') {
      history.push('/project-trybetunes/profile');
    }
    if (id === 'logo-header' || id === 'search') {
      history.push('/project-trybetunes/search');
    }
    if (id === 'favorites') {
      history.push('/project-trybetunes/favorites');
    }
  }

  //   componentDidUpdate() {
  //     const { user } = this.state;
  //     if (user !== undefined) {
  //       console.log(user);
  //     }
  //   }

  // usuario(){

  // }
  render() {
    const { user, awaitUser, className } = this.state;
    return (
      <header data-testid="header-component">
        <div id="div-superior">
          <img id="logo-header" src={ logo } alt="logo" onClick={ this.clickMenu } />
          {awaitUser ? <Carregando /> : <div id="div-usuario" onClick={ this.clickMenu } className="logo-perfil">
            <img src={ avatar } className="logo-perfil" />
            <span className="logo-perfil" data-testid="header-user-name">{user.name}</span>
          </div>}
        </div>
        <div id="header-todos-links">

          <div id="search" className="div-link-header" onClick={ this.clickMenu }>
            <Link data-testid="link-to-search" to="/project-trybetunes/search"> Search </Link>
          </div>
          <div id="favorites" className="div-link-header" onClick={ this.clickMenu }>

            <Link data-testid="link-to-favorites" to="/project-trybetunes/favorites"> Favorites </Link>
          </div>

          <div id="profile" className="div-link-header" onClick={ this.clickMenu }>

            <Link data-testid="link-to-profile" to="/project-trybetunes/profile"> Profile </Link>
          </div>

        </div>

      </header>
    );
  }
}

Header.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Header;
