import React, { Component } from 'react';
import { Route, Link, NavLink, Switch } from 'react-router-dom';
import Home from './pages/Home';

import Login from './pages/Login';
import Signup from './pages/Signup';
import api from '../api';


class App extends Component {
  state = {
    countries: [],
    user: {},
  }

  componentDidMount() {
    this.setUser()
  }

  setUser = () => {
    if (api.isLoggedIn()) {
      this.setState({ user: api.getLocalStorageUser() })
    } else {
      this.setState({ user: {} })

    }
  }

  handleLogoutClick(e) {
    api.logout()
    //this.setState({user:null})
    this.setUser()

  }

  render() {
    let text = 'Welcome, '
    return (
      <div className="App">

        <header className="App-header">
          <div className="Logo">
              <h1>Sliced Bread</h1>
          </div>
          
          <div className="App-info">
            <NavLink to="/" exact>Home</NavLink>
            {!api.isLoggedIn() && <NavLink to="/signup">Signup</NavLink>}
            {!api.isLoggedIn() && <NavLink to="/login">Login</NavLink>}
            {api.isLoggedIn() && <Link to="/" onClick={(e) => this.handleLogoutClick(e)}>Logout</Link>}
            <NavLink to="/profile">{api.isLoggedIn() ? `${text} ${this.state.user.username}!` : null}</NavLink>
          </div>
        </header>

        <Switch>


        <Route
            exact
            path='/'
            render={(props) => <Home {...props}  setUser={this.setUser} />}
          />
          <Route
            path='/signup'
            render={(props) => <Signup {...props} setUser={this.setUser} />}
          />
          <Route
            path='/login'
            render={(props) => <Login {...props} setUser={this.setUser}/>}
          />
          
          
          <Route render={() => <h2>404</h2>} />


        </Switch>
      </div>
    );
  }
}

export default App