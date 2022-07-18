var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'CSC 317 App', name:"[Abdoulfatah Abdillahi]" });
});

router.get('/registration', function(req, res, next) {
  res.render('registration', { title: 'CSC 317 App', name:"[Abdoulfatah Abdillahi]" });
});

router.get('/postimage', function(req, res, next) {
  res.render('postimage', { title: 'CSC 317 App', name:"[Abdoulfatah Abdillahi]" });
});

module.exports = router;
