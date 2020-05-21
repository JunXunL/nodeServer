const express = require('express')
const router = express.Router()

router.get("/clothsList", (req, res, next)=>{
  res.render('cloth/list', {title: '衣帽间'})
})

module.exports = router