const express = require('express');
const { isLoggedIn } = require('../middlewares')
const router = express.Router();
const Receipt = require("../models/Receipt");



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

module.exports = router;
