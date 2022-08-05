const postMiddleWare = {};
const db = require('../conf/database');

postMiddleWare.getRecentPosts = (req, res, next) => {
    db.query("SELECT id, title, description, thumbnail FROM posts LIMIT 8;")
    .then(([resulsts, fields]) => {
        if(resulsts && resulsts.length){
            res.locals.resulsts = resulsts;
        }
        next();
    });
};


module.exports = postMiddleWare;