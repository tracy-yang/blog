var express = require('express');
var router = express.Router();
let User = require('../controller/user')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login',User.login);

module.exports = router;
