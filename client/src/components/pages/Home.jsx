import React, { Component } from 'react';
import Axios from 'axios';
import api from '../../api'
import { SERVER_URL } from '../../config'

class Home extends Component {

  
  componentDidMount(){

    console.log(api.isLoggedIn())
    console.log(api.getLocalStorageUser())

    Axios.get(`${SERVER_URL}/whatever`).then(res=>{
      console.log(res)
    })

  }

  handleSubmit = (e) => {
    e.preventDefault()
    console.log(e)
  }


  render() {                
    return (
      <div className="Home">
        <div className="Party-code">
          <form id="form" onSubmit={e => this.handleSubmit(e)}>
            <h2>Find a Group</h2>

            <div>

              <input type="text" placeholder="Party Code" />
              <button type="submit">Submit</button>

            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Home
