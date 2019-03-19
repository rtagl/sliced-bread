import React, { Component } from 'react';
import Axios from 'axios';


class ReceiptUpload extends Component {

  state = {
    image: '',
    imageViewer: '',
    items: [],
    product: '',
    price: ''
  }

  handleSubmit = (e) => {
    e.preventDefault()
    let myImage = this.state.image
    console.log('in handleSubmit', myImage)
    window.Tesseract.recognize(myImage)
    .then(result => {
        this.cleanUp(result.text)
    }).progress(result => {
      document.getElementById("ocr_status")
        .innerText = result["status"] + " (" +
        (result["progress"] * 100) + "%)";
    })

  }

  showReceipt = () => {
    return this.state.items.map((item,i)=> {
      return (
        <div>
          <input name={i+'_0'} defaultValue={item[0]} />
          <input name={i+'_1'}defaultValue={item[1]} />
        </div>
      );
    })
  }

  imageChange = (e) => {
    e.preventDefault()
    let reader = new FileReader()
    let image = e.target.files[0]
    console.log('e.target.files', image)

    reader.onloadend = () => {
      this.setState({
        image,
        imageViewer: reader.result
      })
    }
    reader.readAsDataURL(image)
  }

  cleanUp = (text) => {
  // console.log(text.split("\n"));
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
    console.log(items)

  }


  newSubmit = (e) => {
    e.preventDefault()
    let updatedReceipt = [] 
    for(let i=0; i < this.state.items.length; i++){
        console.log(e.target[i+"_0"].value, e.target[i+"_1"].value);
      updatedReceipt.push([e.target[i + "_0"].value, e.target[i + "_1"].value])
    }
    Axios.post('http://localhost:5000/api/savedReceipt', {items: updatedReceipt}).then(updatedReceipt => {
      console.log(updatedReceipt)
    })
  }
  render() {
    return (
      <div>
        <div>
          <form class="form-receipt" onSubmit={(e) => this.handleSubmit(e)}>
            <label htmlFor="receiptName">Name Your Receipt</label>
            <input
              name="receiptName"
              type="text"
              id="url"
              placeholder="Receipt Name"
              
            />

            <label htmlFor="inviteGuests">Add Guests</label> 
            <input
              name="inviteGuests"
              type="text"
              placeholder="Add guest names"
            />

            <label htmlFor="photo">Upload Your Receipt</label>
            <input style={{color: 'white', fontSize: '0.8rem', border: 'none', marginBottom: '5px'}} 
              type="file" 
              name="photo" 
              
              onChange={(e) => {this.imageChange(e)}}
            />
            
            <button type="submit" id="go_button">SAVE</button>
          </form>
        </div>

        <div className="receipt-results">
          <form onSubmit={this.newSubmit}>
            {this.showReceipt()}
            <button type="submit"></button>
          </form>

          <div style={{ color: 'white' }} id="ocr_status"> </div>
        </div>

      </div>
    );
  }
}

export default ReceiptUpload