import React, { Component } from "react";
import Axios from "axios";
import { Redirect } from 'react-router-dom';
import api from '../../api'


class Profile extends Component {

  state = {
    user: {}
  }
  showUser = (props) => {
    console.log('hi', props)
  }

  render() {
    if (!api.isLoggedIn()) return <Redirect to="/login" />;
    return (
      <div>
        {/* <h2>{props.user}</h2> */}
      </div>
    )
  }
}

export default Profile