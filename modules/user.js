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

UserSchema.statics.authenticate = function(username, password, cb) {
  user.findOne({username: username}).exec(function(err, user) {
    if(err) return cb(err);
    else if (!user) {
      return cb(new Error("User not found"));
    }
    bcrypt.compare(password, user.password, function(err, result) {
      if(result == true) {
        return cb(null, user);
      } else {
        return cb();
      }
    })
  });
}

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
