const router = require('express').Router()
const client = require('./client.js')
const { getListTodos, createTodo, removeTask, editTask } = require('../controllers/todo')
const { login, register, loginWithFacebook, loginWithGoogle } = require('../controllers/register-login-logout')
const { isLogin, itSelf } = require('../controllers/')

router.use('/', client)

router.post('/login', login) // body: email, password
router.post('/register', register) // body: name, email, password
router.post('/loginWithFacebook', loginWithFacebook) // body: token
router.get('/loginWithGoogle', loginWithGoogle)

router.get('/api/get-list', isLogin, getListTodos)
router.post('/api/create-todo', isLogin, createTodo) // body: task
router.put('/api/edit-todo', isLogin, itSelf, editTask) // body: todoId, status
router.delete('/api/remove-todo', isLogin, removeTask) // body: todoId


module.exports = router