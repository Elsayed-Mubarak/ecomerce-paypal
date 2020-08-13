const mongoose = require('mongoose')
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false },
});



userSchema.method("toJSON", function() {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

userSchema.pre('save', function (next) {

  var user = this;
  console.log(".................im on user db model..................", user)
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, function (err, salt) {

      if (err) { return next(err) }
      bcrypt.hash(user.password, salt, null, function (err, hash) {
        console.log(".................im on user db model.is hash.................", hash)
        if (err) { return next(err) }
        user.password = hash;
        next();
      });
    });
  } else { return next() }
});

module.exports = mongoose.model('User', userSchema);
