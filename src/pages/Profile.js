import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Carregando from '../components/Carregando';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = { user: {}, getRespAPI: false };
  }

  async componentDidMount() {
    this.setState({ getRespAPI: true });
    const user = await getUser();
    this.setState({ user, getRespAPI: false });
    console.log(user);
  }

  render() {
    const { getRespAPI, user } = this.state;
    const { name, email, image, description } = user;
    return (
      <div data-testid="page-profile">
        <Header />
        {getRespAPI && <Carregando />}
        <p>{name}</p>
        <p>{email}</p>
        <img src={ image } alt={ name } data-testid="profile-image" />
        <p>{description}</p>
        <Link to="/profile/edit">Editar perfil</Link>
      </div>
    );
  }
}

export default Profile;
