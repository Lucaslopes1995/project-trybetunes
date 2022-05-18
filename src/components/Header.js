import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';

class Header extends React.Component {
  constructor() {
    super();
    this.state = { user: {}, awaitUser: true };
    // this.usuario = this.usuario.bing(this);
  }

  async componentDidMount() {
    const usuario = await getUser();
    this.setState({ user: usuario, awaitUser: false });
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
    const { user, awaitUser } = this.state;
    return (
      <header data-testid="header-component">
        <Link data-testid="link-to-search" to="/search"> Search </Link>
        <Link data-testid="link-to-favorites" to="/favorites"> Favorites </Link>
        <Link data-testid="link-to-profile" to="/profile"> Profile </Link>
        {awaitUser ? <Carregando /> : <p data-testid="header-user-name">{user.name}</p>}

      </header>
    );
  }
}

export default Header;
