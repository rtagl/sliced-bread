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
    guests: [],
    imgPath: ''
  };

  componentDidMount() {

    Axios.get(`${SERVER_URL}/group/${this.props.match.params.id}`)
      .then(res => {
        this.setState({
          receiptName: res.data.receiptName,
          items: res.data.items,
          owner: res.data.owner,
          guests: res.data.guests.split(','),
          imgPath: res.data.imgPath
        })
      })

      //this.splitGuests()
  }

  showItems = () => {
    return this.state.items.map((item, i) => {
      return (
        <div className="group-items">
          <div className="food-bubble">
          <div key={i}>{`${item[0]}: $${item[1]}`}</div>
          <button>+</button>
          </div>
        </div>
      );
    })
  }

  // splitGuests = () => {
  //   console.log('HIIIIIIIIIII')
  //   let str = [...this.state.guests]
  //   console.log('yooyo', str)
  //   //let strClean = str.replace(/\s/g, '')
  //   //console.log('replaced', strClean)
  //   let guestArr = []
  //   guestArr = str.split(' ')
  //   console.log('hi', guestArr)
    
  //   this.setState({
  //     guestArr
  //   })
  // }

  showGuests = () => {
    let guestList = [...this.state.guests]
    console.log('hjijhrije', this)
    return guestList.map((guest, i) => {
      return (
        <div key={i}>
          {guest}
        </div>
      )
    })
    //return guestList
  }

  render() {
    console.log('this.state', this.state)
    // const {receiptName, items, owner, guests} = {...this.state}
    return (
      <div>
        <div className="Group">
          <h2>Group {this.state.receiptName}</h2>
          {/* <div>{owner}</div>
          <div>{guests}</div>
          <div>{items}</div> */}
          <div className="items-row">{this.showItems()}</div>
          {this.showGuests()}
        </div>
        {/* <div>
          <div>
            {this.showGuests()}
          </div>
        </div> */}
      </div>
    );
  }
}

export default Group
