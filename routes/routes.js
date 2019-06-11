const router = require('express').Router();
const User = require('../modules/user.js');

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

module.exports = router;
