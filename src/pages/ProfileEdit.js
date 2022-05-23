import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Carregando from '../components/Carregando';
import { getUser, updateUser } from '../services/userAPI';
import './ProfileEdit.css';
import perfil from '../images/perfil.png';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = { name: '',
      email: '',
      image: '',
      description: '',
      getRespAPI: false,
      shouldButtonDisable: true,
      shouldRedirect: false };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    this.setState({ getRespAPI: false });
    const user = await getUser();
    const { name, email, image, description } = user;
    this.setState({ name, email, image, description, getRespAPI: false });

    this.setState((state) => {
      const nome = state.name;
      const { email: em, image: im, description: des } = state;
      const validButton = (nome === '')
      || (em === '')
      || (im === '')
      || (des === '')
      || !em.includes('@');
      return { shouldButtonDisable: validButton };
    });

    // console.log(user);
  }

  componentWillUnmount() {
    this.setState({ name: '',
      email: '',
      image: '',
      description: '',
      getRespAPI: false,
      shouldButtonDisable: true,
      shouldRedirect: false });
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
    // const nome = this.state.name
    // const {  email, image, description } = this.state;
    // console.log(nome,email, image,description)
    // const validButton = (nome==='') || (email==='') || (image==='') || (description==='')
    this.setState((state) => {
      const nome = state.name;
      const { email, image, description } = state;
      const validButton = (nome === '')
      || (email === '')
      || (image === '')
      || (description === '')
      || !email.includes('@');
      return { shouldButtonDisable: validButton };
    });
    // const  {shouldButtonDisable} =this.state

    // if(!shouldButtonDisable){

    //     this.setState(()=>{
    //         return{shouldRedirect:true}})
    // }
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { name, email, image, description } = this.state;
    this.setState({ awaitResAPI: true, getRespAPI: true });
    const ajustaUser = await updateUser({ name, email, image, description });
    if (ajustaUser === 'OK') {
      this.setState({ awaitResAPI: false, shouldRedirect: true });
    }
  }

  render() {
    const { getRespAPI } = this.state;
    const { name,
      email,
      image,
      description,
      shouldButtonDisable,
      awaitResAPI,
      shouldRedirect } = this.state;
    const { history } = this.props;
    return (
      <div data-testid="page-profile-edit">
        <Header history={ history } />
        <div className='carregando'>

          {getRespAPI && <Carregando />}
        </div>
        <div id="todo-form">
          <form id="form-edit-profile" onSubmit={ this.handleSubmit }>
            <div id="div-img" className="div-inputs">
              <img src={ perfil } alt="perfil" />
              <input
                type="text"
                name="image"
                value={ image }
                data-testid="edit-input-image"
                onChange={ this.handleChange }
                placeholder="Inserir um Link"
              />

            </div>
            <div id="div-nome" className="div-inputs">
              <strong>Nome</strong>
              <p>Fique à vontade para usar seu nome social</p>
              <input
                type="name"
                name="name"
                value={ name }
                data-testid="edit-input-name"
                onChange={ this.handleChange }
              />

            </div>

            <div id="div-email" className="div-inputs">
              <strong>E-mail</strong>
              <p>Escolha um e-mail que consulte diariamente</p>
              <input
                type="email"
                name="email"
                value={ email }
                data-testid="edit-input-email"
                onChange={ this.handleChange }
                placeholder="usuario@usuario.com.br"
              />

            </div>

            <div id="div-description" className="div-inputs">
              <strong>Descrição</strong>
              <textarea
                type="text"
                name="description"
                value={ description }
                data-testid="edit-input-description"
                onChange={ this.handleChange }
                placeholder="Sobre mim"
              />

            </div>

            <button
              type="submit"
              data-testid="edit-button-save"
              disabled={ shouldButtonDisable }

            >
              Editar
            </button>

          </form>
          {shouldRedirect && <Redirect to="/profile" />}
        </div>
      </div>
    );
  }
}

export default ProfileEdit;
