const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    try {
        if (req.user._id == req.params.id) {
            return next();
        }
        
        return res.send("You can not access this page");
    }
    catch (err) {
        //console.log(err);
        return res.redirect('/user/login');
    }
}