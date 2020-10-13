const mongoose = require("mongoose");
const shame = new mongoose.Schema({
  s_url: {type: String, require: true}, // 绝对路径
  s_type: {type: String, require: true} // 图片用于什么模块
})

const Image = mongoose.model('s_images', shame)

module.exports = Image