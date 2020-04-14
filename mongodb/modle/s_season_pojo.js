const mongoose = require('mongoose')

let schema = new mongoose.Schema({
	s_name: {type:String, require:true},
	s_code: {type:String, require:true}
});

let Season = mongoose.model('s_seasons', schema)

module.exports = Season