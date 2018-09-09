const ObjectId = require('mongoose').Types.ObjectId
const Todo = require('../models/Todo')
const { verify, sign } = require('../helpers/jwt')

module.exports = {
    isLogin: function(req,res,next){
        if(req.query.token){
            next()
        }else{
            res.status(403).json({
                message: 'login terlebih dahulu',
                path: './controllers/index.js'
            })
        }
    },
    itSelf: function(req,res,next){
        let todoId = ObjectId(req.body.todoId)
        let task
        Todo.findById(todoId)
        .then(todo =>{
            task = todo
            return verify(req.query.token)
        })
        .then(user =>{
            if(task.UserId == user.id){
                next()
            }else{
                res.status(401).json({
                    message: 'TIDAK ADA ACCESS'
                })
            }
        })
        .catch(err =>{
            res.status(500).json(err)
        })
    }
}