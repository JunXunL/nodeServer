const mongoose = require('mongoose');
// 首页导航栏目
const schema = new mongoose.Schema({
  s_code: {type: String, require: true},
  s_title: {type: String, require: true},
  s_image: {type: String, require: false},
  s_level: {type: String, require: true}, // 导航级别
  s_hide: {type: Number, require: true} // 是否显示
});
const Channel = mongoose.model("s_channels", schema);

module.exports = Channel;
