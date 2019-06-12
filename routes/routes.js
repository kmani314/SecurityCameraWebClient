const router = require('express').Router();
const User = require('../modules/user.js');
const path = require('path');
const sanitize = require('mongo-sanitize')
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
      req.body = sanitize(req.body);

      User.authenticate(req.body.username, req.body.password, (err, user) => {
        if(err || !user) {
          return next("Wrong Email or Password");
        } else {
          req.session.userId = user._id;
          return res.redirect('/view.html');
        }
      });
    } else {
      return next("All fields are required");
    }
});

router.get('/view.html', (req, res, next) => {
  User.findById(req.session.userId).exec(function (err, user) {
    if(err) {
      return next(err);
    } else {
      if(user === null) {
        res.redirect('/');
      } else return res.sendFile(path.join(__dirname, '../public', 'view.html'));
    }
  })
});

router.get('/logout', (req, res, next) => {
  if(req.session) {
    req.session.destroy((err) => {
      res.redirect('/');
    });
  } else {
    res.redirect('/');
  }
});
module.exports = router;
