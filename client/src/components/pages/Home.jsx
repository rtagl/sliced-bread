import React, { Component } from 'react';
import Axios from 'axios';
import api from '../../api'
import { SERVER_URL } from '../../config'
import { throws } from 'assert';

class Home extends Component {

  state = {
    group: ''
  }
  componentDidMount(){

    console.log(api.isLoggedIn())
    console.log(api.getLocalStorageUser())

    Axios.get(`${SERVER_URL}/whatever`).then(res=>{
      console.log(res)
    })

  }

  handleSubmit = (e) => {
    e.preventDefault()
    console.log(e.target.value, 'testing')

  }

  handleChange = (e) => {
    this.setState({
      group: e.target.value
    },()=>{
        console.log(this.state.group, 'testing')
    })
  }

  


  render() {                
    return (
      <div className="Home">
        <div className="Party-code">
        </div>
      </div>
    );
  }
}

export default Home
