import React, { Component } from 'react';
import Axios from 'axios';
import { Redirect } from 'react-router-dom'
import api from '../../api'

class ReceiptUpload extends Component {

  state = {
    image: '',
    imageViewer: '',
    items: [],
    product: '',
    receiptName: '',
    guests: '',
    price: ''
  }

  handleSubmit = (e) => {
    e.preventDefault()
    let myImage = this.state.image;

    window.Tesseract.recognize(myImage)
    .then(result => {
        this.cleanUp(result.text)
    }).progress(result => {
      document.getElementById("go_button").style.visibility = "hidden";
      document.getElementById("ocr_status")
        .innerText = result["status"] + " (" +
        (result["progress"] * 100).toFixed(2) + "%)";

    }).then(() => {
      document.getElementById("edit-receipt").style.visibility = "visible"
      document.getElementById("ocr_status").innerText = "";
      document.getElementById("submit-btn").style.visibility= "visible";
    })
  }

  handleGuests = (e) => {
    this.setState({
      guests: e.target.value
    })
  }

  handleReceiptName = (e) => {
    this.setState({
      receiptName: e.target.value
    })
  }

  showReceipt = () => {
    return this.state.items.map((item,i)=> {
      return (
        <div key={i} className="items-chart">
          <input name={i+'_0'} defaultValue={item[0]} />
          <input name={i+'_1'} defaultValue={item[1]} />
        </div>
      );  
    })
  }

  imageChange = (e) => {
    e.preventDefault()
    let reader = new FileReader()
    let image = e.target.files[0]

    reader.onloadend = () => {
      this.setState({
        image,
        imageViewer: reader.result
      })
    }
    reader.readAsDataURL(image)
  }

  cleanUp = (text) => {
    let lines = text.split("\n")
    let items = []
    lines.forEach((line) => {
      if (line.includes('$')) {

        items.push(line.split('$'))
      }
    })
    this.setState({
      items: items
    })
  }


  newSubmit = (e) => {
    e.preventDefault()
    let receiptName = this.state.receiptName
    let guests = this.state.guests
    let updatedReceipt = [] 
    for(let i=0; i < this.state.items.length; i++){
        console.log(e.target[i+"_0"].value, e.target[i+"_1"].value);
        updatedReceipt.push([e.target[i + "_0"].value, e.target[i + "_1"].value])
    }
    Axios.post('http://localhost:5000/api/savedReceipt', { items: updatedReceipt, receiptName: receiptName, guests: guests}).then(responseFromServer => {
      console.log(responseFromServer, receiptName, guests, updatedReceipt)
    })
  }

  render() {
    if (!api.isLoggedIn()) return <Redirect to="/login" />
    return (
      <div>
        <div className="receipt-page container">
          <form className="form-receipt" onSubmit={e => this.handleSubmit(e)}>
            <label htmlFor="receiptName">Name Your Receipt</label>
            <input
              id="receiptName"
              type="text"
              placeholder="Receipt Name"
              value={this.state.receiptName}
              onChange={(e) => this.handleReceiptName(e)}
            />

            <label htmlFor="guests">Add Guests</label>
            <input
              id="guests"
              type="text"
              placeholder="Add guest names"
              value={this.state.guests}
              onChange={(e) => this.handleGuests(e)}
            />

            <label htmlFor="photo">Upload Your Receipt</label>
            <input
              style={{
                color: "white",
                fontSize: "0.8rem",
                border: "none",
                marginBottom: "5px"
              }}
              type="file"
              name="photo"
              onChange={(e) => {
                this.imageChange(e);
              }}
            />

            <button type="submit" id="go_button" style={{visibility: 'visibile'}}>
              UPLOAD FILE
            </button>
          </form>

          <div className="receipt-results">

            <div style={{ color: "white" }} id="ocr_status">
              {" "}
            </div>

            <form onSubmit={this.newSubmit}>
              <label id="edit-receipt" style={{ visibility: 'hidden', color: 'rgb(221, 118, 34)'}}>Edit Receipt</label>
              {this.showReceipt()}
              <button id="submit-btn" type="submit" style={{ visibility: 'hidden' }}>
                SAVE AND SUBMIT
              </button>

            </form>
          </div>

        </div>

      </div>
    );
  }
}

export default ReceiptUpload


