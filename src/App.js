import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';

class App extends React.Component {
  constructor() {
    super();
    this.renderRouts = this.renderRouts.bind(this);
  }

  renderRouts() {
    return (
      <Switch>
        <Route exact path="/project-trybetunes" component={ Login } />
        <Route exact path="/project-trybetunes/search" component={ Search } />
        <Route exact path="/project-trybetunes/album/:id" component={ Album } />
        <Route exact path="/project-trybetunes/favorites" component={ Favorites } />
        <Route exact path="/project-trybetunes/profile" component={ Profile } />
        <Route exact path="/project-trybetunes/profile/edit" component={ ProfileEdit } />
        <Route exact path="/project-trybetunes/*" component={ NotFound } />
      </Switch>
    );
  }

  render() {
    return (
      <>
        {this.renderRouts()}
      </>

    );
  }
}

export default App;
