import React from 'react';
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

  componentDidUpdate() {
    const { user } = this.state;
    if (user !== undefined) {
      console.log(user);
    }
  }

  // usuario(){

  // }
  render() {
    const { user, awaitUser } = this.state;
    return (
      <header data-testid="header-component">
        {awaitUser ? <Carregando /> : <p data-testid="header-user-name">{user.name}</p>}

      </header>
    );
  }
}

export default Header;
