import React, { Component } from 'react';
import Axios from 'axios';
import api from '../../api'
import { SERVER_URL } from '../../config'
import { throws } from 'assert';

class Group extends Component {
  state = {
    items: [],
    receiptName: '',
    owner: '',
    guests: '',
    imgPath: ''
  };

  componentDidMount() {

    Axios.get(`${SERVER_URL}/group/${this.props.match.params.id}`)
      .then(res => {
        this.setState({
          receiptName: res.data.receiptName,
          items: res.data.items,
          owner: res.data.owner,
          guests: res.data.guests,
          imgPath: res.data.imgPath
        })
      })
  }

  showItems = () => {
    return this.state.items.map((item, i) => {
      return (
        <div key={i} className="group-items">
          <div>
            {`${item[0]}: $${item[1]}`}
          </div>
        </div>
      )
    })
  }

  splitGuests = () => {
    console.log(this.state.guests)
  }

  render() {
    console.log('this.state', this.state)
    // const {receiptName, items, owner, guests} = {...this.state}
    return (
      <div className="Group">Group {this.state.receiptName}
        {/* <div>{owner}</div>
        <div>{guests}</div>
        <div>{items}</div> */}
        <div>{this.showItems()}</div>
        <div>{this.splitGuests()}</div>
      </div>
    )
  }
}

export default Group
