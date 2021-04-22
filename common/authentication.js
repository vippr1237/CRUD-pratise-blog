const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    const token = req.header('auth-token');
    if (token == 'null' || token== 'undefined') return res.redirect('/user/login');

    try {
        const verfied = jwt.verify(token, process.env.TOKEN);
        req.user = verfied;
        return next();
    }
    catch (err) {
        //console.log(err);
        return res.redirect('/user/login');
    }
}