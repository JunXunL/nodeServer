const mongoose = require("mongoose");
const shame = new mongoose.Schema({
  s_url: {type: String, require: true},
  s_type: {type: String, require: true}
})

const Image = mongoose.model('s_images', shame)

module.exports = Image