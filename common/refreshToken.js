const jwt = require('jsonwebtoken') ;

module.exports = function (token) {
    try {
    if (token) {
        const verified = jwt.verify(token, process.env.TOKEN);
        const user_id = verified._id;
        return jwt.sign({_id: user_id }, process.env.TOKEN, {expiresIn:'1 days'});
    }
    }
    catch (err) {
        return err;
    }
}