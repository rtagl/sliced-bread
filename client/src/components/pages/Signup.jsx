import React, { Component } from 'react';
import api from '../../api';

export default class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      name: "",
      password: "",
      message: null
    }
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleClick(e) {
    e.preventDefault()
    let data = {
      username: this.state.username,
      name: this.state.name,
      password: this.state.password,
    }
    api.signup(data)
      .then(result => {
        console.log('SUCCESS!')
        this.props.setUser()
        this.props.history.push("/") // Redirect to the home page
      })
      .catch(err => this.setState({ message: err.toString() }))
  }

  render() {
    return (
      <div className="Signup">

        <form id="form">
          <h2>Signup</h2>
          <label for="username">Username: </label>
          <input type="text" value={this.state.username} name="username" onChange={this.handleInputChange} /> <br />
          
          <label for="name">Name: </label>
          <input type="text" value={this.state.name} name="name" onChange={this.handleInputChange} /> <br />
          
          <label for="password">Password: </label>
          <input type="password" value={this.state.password} name="password" onChange={this.handleInputChange} /> <br />
          <button onClick={(e) => this.handleClick(e)}>Signup</button>

          {this.state.message && <div className="error-message">
            {this.state.message}
          </div>}

        </form>

      </div>
    );
  }
}