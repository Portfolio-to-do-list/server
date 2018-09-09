const jwt = require('jsonwebtoken')

module.exports = {
    verify: function(token){
        
        return new Promise((resolve,reject)=>{
            jwt.verify(token, process.env.SECRET, function(err, decoded) {
                err? reject(err) : resolve(decoded)
            });

        })
    },

    sign: function(user){
        return new Promise((resolve,reject)=>{
            jwt.sign({
                id: user._id,
                name: user.name,
                email: user.email
            }, process.env.SECRET, function(err,token){
                err? reject(err) : resolve(token)
            })
        })
    }
}