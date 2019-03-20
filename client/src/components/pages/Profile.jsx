import React, { Component } from "react";
import Axios from "axios";
import { Redirect } from 'react-router-dom';
import api from '../../api'


class Profile extends Component {

  showUser = (props) => {
    console.log('hi', props)
  }

  render() {
    if (!api.isLoggedIn()) return <Redirect to="/login" />;
    return (
      <div>
        HI
      </div>
    )
  }
}

export default Profile