const express = require('express')
const router = express.Router()
const SeasonSchema = require('../mongodb/modle/s_season_pojo')

router.get('/show', (req, res)=>{
	console.log("---------------/show-------------")
	SeasonSchema.find()
	.then((data)=>{
		// console.log(data)
		res.send(data)
	})
	.catch((err)=>{
		res.send(err)
	})
})

router.post('/add', (req, res)=>{
	let data = {
		"s_name": "你好",
		"s_code": "hello"
	}
	// let {s_name, s_code} = req.body
	SeasonSchema.insertMany(data).then((data)=>{
		res.send({err:0, msg:'insert OK'})
	}).catch((err)=>{
		res.send({err:-1, msg:'insert error'})
	})
})

module.exports = router