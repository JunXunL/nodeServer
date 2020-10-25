const mongoose = require("mongoose");
const shema = new mongoose.Schema({
  s_path: {type: String, require: true}, // 存放目录层级
  s_url: {type: String, require: true}, // 绝对路径
  s_type: {type: String, require: true}, // 图片用于什么模块
  s_title: {type: String, require: true} // 图片标题
})

const Image = mongoose.model('s_images', shema)

module.exports = Image