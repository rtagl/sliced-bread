import React, { Component } from 'react';

class ReceiptUpload extends Component {

  state = {
  }

  componentDidMount() {
    const script = document.createElement("script");

    script.src = "https://cdn.jsdelivr.net/gh/naptha/tesseract.js@v1.0.14/dist/tesseract.min.js";
    script.async = true;

    document.body.appendChild(script);
  }

  render() {
    return (
      <div>
        <div>
          <form id="form">
            <label for="receiptName">Name Your Receipt: </label>
            <input name="receiptName" type="text" id="url" placeholder="Image URL" value="https://res.cloudinary.com/dgg0g978i/image/upload/v1552511158/receipt.png" />
            <input type="button" id="go_button" value="Run" />

            <label>Upload an image</label>
            <input type="file" name="photo" value="" />

            <input type="submit" value="SAVE" />
            
            <div id="ocr_results"> </div>
            <div id="ocr_status"> </div>
          </form>
        </div>

      </div>
    )
  }
}

export default ReceiptUpload