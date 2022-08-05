const express = require('express');
const router = express.Router();
const multer = require('multer');
const sharp = require('sharp');
const db = require('../conf/database');



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
cb(null, '/public/images/uploads')
  },
  filename: function (req, file, cb) {
    let fileExt = file.mimetype.split('/')[1];
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, `${file.fieldname} -${uniqueSuffix}.${fileExt}`)
  }
})
const uploader = multer({ storage: storage })



router.post('/createPost', uploader.single("uploadImg"), (req, res, next) => {
    let fileUploaded = req.file.path; // accessing properties 
    let fileAsThumbnail = `thumbnail-${req.file.filename}`; // taking the image uploaded and making a smaller version
    let destinationOfThumnail = req.file.destination + "/" + fileAsThumbnail; // this is where you'll put the thumbnail in the app
    let title = req.body.title;
    let description = req.body.description;
    let fk_userId = req.session.userId; // can't make a post w/o this


    sharp(fileUploaded)
    .resize(200)
    .toFile(destinationOfThumnail)
    .then(() => {
        let baseSQL = "INSERT INTO posts (title, description, photo, thumbnail, fk_authorId) VALUES (?,?,?,?,?);"
        return db.query(baseSQL, [
            title, 
            description, 
            fileUploaded, 
            destinationOfThumnail, 
            fk_userId
        ])
        .then(([results, fields]) => {
            if(results && results.affectedRows){
                req.flash('success', "Post was created !");
                req.session.save((err) => {
                    if(err) next(err);
                    res.redirect(`/`);
                });
            }else{
                req.flash("error", "Failed to create posts");
                req.session.save((err) => {
                    if(err) next(err);
                    res.redirect(`/postimage`);
                });
            }
        });
    });
});


router.get('/search', async (req, res, next) => {
    let postId = req.params.id;
    let baseSQL = "SELECT p.title, p.description, p.photo, p.createdAt, u.username FROM posts p JOIN users u on p.fk_authorId=u.id WHERE p.id=?;";
    db.query(baseSQL, [postId])
    .then(([results, fields]) =>{
        if(results && results.length){
            res.locals.currentPost = results[0];
            res.render('viewpost');
        }else{
            req.flash("error", "No post found!");
            req.session.save((err) => {
                if(err) next(err);
                res.redirect('/');
            });
        }
    })
});


router.get("/search", (req, res, next) => {
    let searchTerm = `%${req.query.searchText}%`;
    let baseSQL = 'select id, title, description, thumbnail, concat("", title, description) as haystack FROM posts HAVING haystack like ?;';
    db.query(baseSQL, [searchTerm])
    .then(([results, fields]) => {
       res.locals.results = results;
       req.flash("info", '${results.length} results founds');
       req.session.save((err) => {
        if(err) next(err);
        res.render("index");
       })
    })
    .catch((err) =>{
        next(err);
    })
})

module.exports = router;