import React from 'react';
import Header from '../components/Header';
import './NotFound.css';
import logo from '../images/LOGO_POSITIVA 1.png';

class NotFound extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <div data-testid="page-not-found">
        <Header history={ history } />
        <div id="body-not-found">
          <img src={ logo } alt="logo" />
          <div id="textos-not-found">
            <div id="h3-not-found">
              <h3>Ops!</h3>
            </div>
            <div>
              <h4>A página que você está procurando não foi encontrada</h4>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NotFound;
