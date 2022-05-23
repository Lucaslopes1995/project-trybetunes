import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Carregando from '../components/Carregando';
import { getUser } from '../services/userAPI';
import './Profile.css';
import perfil from '../images/perfil.png';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = { user: {}, getRespAPI: false, adaptedImage:false };
    this.userData = this.userData.bind(this);
    this.validImage = this.validImage.bind(this)
  }

  async componentDidMount() {
    this.setState({ getRespAPI: true });
    const user = await getUser();
    this.setState({ user, getRespAPI: false });
    // console.log(user);
  }

  componentWillUnmount() {
    this.setState({ adaptedImage: false });
  }

  async userData() {
    const user = await getUser();
    return user;
  }

  validImage(){
    this.setState({adaptedImage:true})
  }

  render() {
    const { getRespAPI, user, adaptedImage } = this.state;
    const { name, email, image, description } = user;
    const { history } = this.props;
    return (
      <div data-testid="page-profile">
        <Header history={ history } />

        <div className='carregando'>

              {getRespAPI && <Carregando />}
        </div>
        <div id="body-profile-page">
          <div id="div-text-imag">
            <div className='div-awaitingAPI'>
              {adaptedImage ?<img src={ perfil } alt={ name } data-testid="profile-image" />:
              <img src={ image } alt={ name } data-testid="profile-image" onError={this.validImage}/>
              }
            </div>
            <strong>Nome</strong>
            <div className='div-awaitingAPI-text'>

              <p>{name}</p>
            </div>
            <strong>E-mail</strong>
            <div className='div-awaitingAPI-text'>

            <p>{email}</p>
            </div>
            <strong>Descrição</strong>
            <div className='div-awaitingAPI-text'>

            <p>{description}</p>
            </div>
          </div>
          <Link to="/project-trybetunes/profile/edit">Editar perfil</Link>
        </div>
      </div>
    );
  }
}

export default Profile;
