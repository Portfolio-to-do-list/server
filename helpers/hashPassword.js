const crypto = require('crypto');



module.exports = function (email, password) {
    const secret = email;
    const hash = crypto.createHmac('sha256', secret)
        .update(password)
        .digest('hex');
    return hash
}