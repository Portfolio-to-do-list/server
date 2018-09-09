const ObjectId = require('mongoose').Types.ObjectId
const Todo = require('../models/Todo')
const User = require('../models/User')
const { verify } = require('../helpers/jwt')


module.exports = {
    getListTodos: function(req,res){
        verify(req.query.token)
        .then(dataUser =>{
            return Todo.find({UserId:ObjectId(dataUser.id)})
        })
        .then(todos =>{
            if(todos){
                res.status(200).json(todos)
            }else{
                res.status(404).json({
                    message: 'INVALID TOKEN OR USER NOT FOUND'
                })
            }
        })
        .catch(err =>{
            res.status(500).json({
                message: err
            })
        })
    },
    
    createTodo: function(req,res){
        verify(req.query.token)
        .then(dataUser => {
            return User.findById(ObjectId(dataUser.id))
        })
        .then(user =>{
            let date = req.body.dueDate.split('-')
            let newTodo = new Todo({
                name: req.body.name,
                description: req.body.description,
                status: false,
                dueDate: new Date(date[0],date[1],date[2]),
                UserId: user._id
            })
            return newTodo.save()
        })
        .then(newTodo => {
           res.status(200).json({
               message: 'Berhasil Membuat Task'
           })
        })
        .catch(err =>{
            console.log(err)
            res.status(500).json({
                message: err.message
            })
        })
    },

    removeTask: function(req,res){
        let todoId = req.body.todoId

        Todo.findByIdAndRemove(ObjectId(todoId))
        .then(()=>{
            res.status(200).json({
                message: 'Berhasil Delete'
            })
        })
        .catch(err =>{
            res.status(500).json({
                message: err
            })
        })
    },

    editTask: function(req,res){
        let todoId = ObjectId(req.body.todoId)
        let keys = Object.keys(req.body)
        let values = Object.values(req.body)
        let obj = {}
        for(let i = 0 ; i < keys.length ; i++){
            if(keys === 'status'){
                obj[`${keys[i]}`] = Number(values[i])
            }else{
                obj[`${keys[i]}`] = values[i]
            }
        }
        Todo.findByIdAndUpdate(todoId, obj)
        .then(task =>{
            if(task){
                res.status(200).json({
                    message: "Successfully Update Task",
                    task: task
                })
            }else{
                res.status(404).json({
                    message: "Task Not Found"
                })
            }
        })
        .catch(err =>{
            res.status(500).json(err)
        })
    }
}