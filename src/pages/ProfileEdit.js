import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Carregando from '../components/Carregando';
import { getUser, updateUser } from '../services/userAPI';

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
    this.setState({ getRespAPI: true });
    const user = await getUser();
    const { name, email, image, description } = user;
    this.setState({ name, email, image, description, getRespAPI: false });
    console.log(user);
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

  async handleSubmit() {
    const { name, email, image, description } = this.state;
    this.setState({ awaitResAPI: true, shouldRedirect: true });
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
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {getRespAPI && <Carregando />}
        <form>
          <input
            type="text"
            name="name"
            value={ name }
            data-testid="edit-input-name"
            onChange={ this.handleChange }
          />
          <input
            type="email"
            name="email"
            value={ email }
            data-testid="edit-input-email"
            onChange={ this.handleChange }
          />
          <input
            type="text"
            name="description"
            value={ description }
            data-testid="edit-input-description"
            onChange={ this.handleChange }
          />
          <input
            type="text"
            name="image"
            value={ image }
            data-testid="edit-input-image"
            onChange={ this.handleChange }
          />

          <button
            type="button"
            data-testid="edit-button-save"
            disabled={ shouldButtonDisable }
            onClick={ this.handleSubmit }
          >
            Editar
          </button>

        </form>
        {awaitResAPI && <Carregando />}
        {shouldRedirect && <Redirect to="/profile" />}
      </div>
    );
  }
}

export default ProfileEdit;
