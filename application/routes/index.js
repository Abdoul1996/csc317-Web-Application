var express = require('express');
var router = express.Router();
const {getRecentPosts} = require('../middleware/postmiddleware');



/* GET home page. */
router.get("/",getRecentPosts, function(req, res, next){
  res.render("index", {
    title: "CSC 317 App",
    name: "Abdoulfatah",
  });
});


/* localhost:3000/login*/

router.get("/login", function(req, res, next){
  res.render("login", {
    title: "CSC 317 App",
    name: "Abdoulfatah",
    css: ["form.css"],
  });
});


/* localhost:3000/registration */

router.get("/registration", function(req, res, next){
  res.render("registration", {
    title: "CSC 317 App",
    name: "Abdoulfatah",
    css: ["form.css"],
  });
});

/* localhost:3000/postimage */

router.get("/postimage", function(req, res, next){
  res.render("postimage", {
    title: "CSC 317 App",
    name: "Abdoulfatah",
    css: ["form.css"],
  });
});



router.use("/postimage",(req, res, next) =>{
  if(req.session.username){
    next();
  }else{
    req.flash("error", "Only logged in users can make posts!");
    req.session.save((err) => {
      if(err) next(err);
      res.redirect("/");
    });
  }
});





module.exports = router;
