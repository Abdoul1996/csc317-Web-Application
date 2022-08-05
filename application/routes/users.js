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
    req.flash("error", "Username already exist!");
      req.session.save(err =>{
        if(err) next(err);
        res.redirect("/registration");
      });
  }
 })

 .then(([results, fields]) => {
  if(results && results.length == 0){
    return bcrypt.hash(password, 1);
  }else{
    req.flash("error", "Email already exist!");
    req.session.save(err =>{
      if(err) next(err);
      res.redirect("/registration");
    });
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
    req.flash("success", "User account made!");
    req.session.save((err) => {
      if(err) next(err);
      res.redirect("/login");
    })
  }else{
    req.flash("error", "User could not be made");
      req.session.save(err =>{
        if(err) next(err);
        res.redirect("/registration");
      });
  }
 })
 .catch((err) => next(err));
});


router.post("/login", (req, res, next) => {
  const {username, password} = req.body;
  console.log(req.body);
  let loggedUserId;
  let loggedUsername;

  db.query("SELECT id, username, password FROM users WHERE username=?", [username])
  .then(([results, fields]) => {
    console.log(results);
    if(results && results.length == 1){
    let dbPassword = results[0].password;
    loggedUserId = results[0].id;
    loggedUsername = results[0].username;
    return bcrypt.compare(password, dbPassword);
    }else{
      req.flash("error", "Invalid username/password combination");
      req.session.save(err =>{
        if(err) next(err);
        res.redirect("/login");
      });
    }
  }).then((passwordMatch) => {
    if(passwordMatch){
      req.session.username = loggedUsername;
      req.session.userId = loggedUserId;
      req.flash("success", "You are now logged in");
      req.session.save((err) => {
        res.redirect('/');
      })
    }else{
      req.flash("error", "Invalid username/password combination");
      req.session.save(err =>{
        if(err) next(err);
        res.redirect("/login");
      });
     // res.redirect('/login');
    }
  })
});

router.post("/logout", (req, res, next) => {
  req.session.destroy((err) =>{
    if(err){
      next(err);
    }else{
      res.json({
        status: "ok",
        code: 200,
        message: "Session was destroyed",
      });
    }
  });
});


/*router.post('/logout', (req, res, next) => {
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
});*/
module.exports = router;
