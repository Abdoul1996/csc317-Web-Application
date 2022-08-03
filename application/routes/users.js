var express = require('express');
var router = express.Router();
const db = require('../conf/database');
const bcrypt = require('bcrypt');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/registration', (req, res, next) => {
 const {username, email, password, confirmPassword} = req.body;

 db.query('select * from users where username=?;',[username])
 .then(([results, fields]) => {
  if(results && results.length==0){
    return db.query('select * from users where email=?;',[email])
  }else{
    res.redirect('/registration')
  }
 })

 .then(([results, fields]) => {
  if(results && results.length == 0){
    return bcrypt.hash(password, 1);
  }else{
    res.redirect('/registration');
  }
 })


 .then((hashedPassword) =>{
  if(results && results.length == 0){
    return db.query('insert into users (username, email, pwd) VALUE (?,?,?)',
    [username, email, hashedPassword]);
    }else{
      res.redirect('/registration')
    }
 })




 
 .then(([results, fields]) => {
  if(results && results.affectedRows){
    res.redirect('login');
  }else{
    res.redirect('/registration');
  }
 })
 .catch((err) => next(err));
});


router.post('/login', (req, res, next) => {
  let{username, password} = req.body;

  db.query('SELECT id, username, password FROM users WHERE username=?', [username])
  .then(([results, fields]) => {
    let dbPassword = results[0].password;
    if(results && results.length == 1){
    }else{
      res.redirect('/login');
    }
  })

  .then((passwordMatch) => {
    if(results && results.length == 1){
      req.session.username = results[0].username;
      req.session.userId = results[0].id;
      res.redirect('/');
    }else{
      res.redirect('/login');
    }
  })
})


router.post('/logout', (req, res, next) => {
  req.session.destroy((err) => {
    if(err){
      errorPrint('session could not be destroy.');
      next(err);
    }else{
      successPrint('session was destroyed.');
      res.clearCookie('csid');
      res.json({status: "ok", message: "user is logged out"});
      }
  })
});
module.exports = router;
