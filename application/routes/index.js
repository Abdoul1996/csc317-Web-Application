var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'CSC 317 App', name:"[Abdoulfatah Abdillahi]" });
});

router.get('/registration', function(req, res, next) {
  res.render('registration', { title: 'Registration'});
});

router.get('/postimage', function(req, res, next) {
  res.render('postimage', { title: 'Post Image'});
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Log In' });
});

module.exports = router;
