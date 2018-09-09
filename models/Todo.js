const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    name: String,
    description: String,
    status: Boolean,
    dueDate: Date,
    UserId: mongoose.Schema.Types.ObjectId
})

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo