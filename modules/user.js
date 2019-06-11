const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 12;

var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  }
});

UserSchema.pre('save', function (next) {
  var user = this;
  console.log(this.password);
  bcrypt.hash(user.password, saltRounds, (err, hash) => {
    if(err) return next(err);
    else {
      this.password = hash;
      next();
    }
  });

});

var user = mongoose.model('User', UserSchema);
module.exports = user;
