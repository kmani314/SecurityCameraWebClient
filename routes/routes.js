const router = require('express').Router();
const User = require('../modules/user.js');
const path = require('path');

/* This is the registration route, no longer valid after users have been created
router.post('/', (req, res, next) => {
  if(req.body.username && req.body.password) {
    User.create({username: req.body.username, password: req.body.password}, (err) => {
      if(err) return next(err);
      else return res.redirect('/');
    });
  }
});
*/
router.post('/', (req, res, next) => {
    if(req.body.username && req.body.password) {
      User.authenticate(req.body.username, req.body.password, (err, user) => {
        if(err || !user) return next(new Error("Wrong Email or Password"));
        else {
          req.session.userId = user._id;
          return res.redirect('/');
        }
      });
    } else {
      return next(new Error("All fields are required"));
    }
});

router.get('/', (req, res, next) => {
  console.log("get /");
  User.findById(req.session.userId).exec(function (err, user) {
    if(err) return next(err)
    else {
      if(user === null) {
        res.redirect('/login.html');
        return next(err);
      } else return res.sendFile(path.join(__dirname, '../public', 'index.html'));
    }
  })
});
module.exports = router;
