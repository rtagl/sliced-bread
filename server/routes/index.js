const express = require('express');
const { isLoggedIn } = require('../middlewares')
const router = express.Router();
const Receipt = require("../models/Receipt");
const parser = require("../configs/cloudinary.js");



router.get("/whatever", (req, res, next) => {
  console.log('in whatever',req.user)
  res.json({user:req.user})
})

router.post("/savedReceipt", (req, res, next) => {
  console.log(req.body,'sup')
  let receipt = new Receipt(req.body);
  receipt.receiptName = req.body.receiptName;
  receipt.guests = req.body.guests
  receipt.owner = req.user._id
  receipt.save((err,doc)=>{
    if(!err){
      return res.json(doc)
    }
  })

})

router.post(
  "/users/first-user/pictures",
  parser.single("picture"),
  (req, res, next) => {

    console.log("MADEITITITITIT")
    res.json({ url: req.file.url })
    // Receipt.findOneAndUpdate({}, { imgPath: req.file.url }).then(() => {
    //   res.json({
    //     success: true,
    //     imgPath: req.file.url
    //   });
    // });
  }
);


router.get('/group/:id', (req, res, next) => {
  Receipt.findById(req.params.id).then(theReceiptFromDB=>{
    res.json(theReceiptFromDB)
  })
})



module.exports = router;
