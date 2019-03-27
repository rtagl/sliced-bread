import React, { Component } from 'react';
import Axios from 'axios';
import api from '../../api'
import { SERVER_URL } from '../../config'
import { throws } from 'assert';

class Group extends Component {
  state = {
    items: [],
    receiptName: "",
    owner: "",
    guests: [],
    imgPath: "",
    value: 'select'
  };

  // receives the data from the receipt page and sets the state
  componentDidMount() {
    Axios.get(`${SERVER_URL}/group/${this.props.match.params.id}`).then(res => {


      let newGuestList = [];
      res.data.guests.split(",").map((guest, i) => {
          newGuestList.push({ id: i, name:guest, items: [], total: 0})
      })
      console.log(newGuestList)
      this.setState({
        receiptName: res.data.receiptName,
        items: res.data.items,
        owner: res.data.owner,
        guests: newGuestList, //res.data.guests.split(","),
        imgPath: res.data.imgPath
      });
    });



    //this.splitGuests()
  }

  // logic for changing state when a guest is assigned to a food item 
  handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    let items = e.target.name.split(',')
    let item = items[0]
    let price = items[1]
    // let selectedItem = e.target.name;
    let selectedPerson = e.target.value;


    console.log(price,item, 'item split')
    let updatedGuestList = [...this.state.guests]
    updatedGuestList.forEach(eachGuest=>{
      if(eachGuest.name === selectedPerson){
        eachGuest.items.push(item)
        eachGuest.total += Number(price);
      }
      //return eachGuest
    })
    console.log(updatedGuestList);
    this.setState({ guests: updatedGuestList})
  }

  // displays a div for each food items from the receipt, prices, and
  // drop down list with each guests name. Clicking a guest adds that food items
  // price to the user
  showItems = () => {
    return this.state.items.map((item, i) => {
      return (
        <div className="group-items">
          <div className="food-bubble">
            <div key={i}>{`${item[0]}: $${item[1]}`}</div>
            <select name={item[0]+','+item[1]}  onChange={this.handleChange}>
                <option>Select</option>
              {this.state.guests.map((g)=>{
                return (
                    <option value={g.name}>{g.name}</option>
                );
              })}
            </select>
          </div>
        </div>
      );
    });
  };

  // Displays list of guests and their individual updated total $ owed 
  showGuests = () => {
    let guestList = [...this.state.guests];
    return guestList.map((guest, i) => {
      return <div key={i} className="totals-row">{guest.name} ${guest.total.toFixed(2)}</div>;
    });
    //return guestList
  };

  render() {
    console.log("this.state", this.state);
    // const {receiptName, items, owner, guests} = {...this.state}
    return (
      <div>
        <h2 style={{marginTop: '20px', marginLeft: '30px'}}>Receipt for {this.state.receiptName}</h2>
        <div className="Group">
          <div>
            <div className="items-row">{this.showItems()}</div>
          </div>
          <div className="totals">
            <div>
              {this.showGuests()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Group
