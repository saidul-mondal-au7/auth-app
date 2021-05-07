const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const userSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  image: {
    type: String
  }
}, {
collection: 'jsons'
})
 
module.exports = mongoose.model('Json', userSchema)
