const mongoose = require('mongoose')
const { model } = require('./s_season_pojo')
const schema = new mongoose.Schema({
  u_name: {type: String, require: true},
  u_pwd: {type: String, require: true}
})

//静态方法
schema.statics.findById = function (u_id, callBack) {
  this.find({_id: u_id}, callBack);
};
schema.statics.findByName = function (u_name, callBack) {
  this.find({u_name: u_name}, callBack);
};
// schema.static.find = function () {
//   this.find
// }

const UserMain = mongoose.model("user_mains", schema)
module.exports = UserMain