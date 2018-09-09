const User = require('../models/User')
const hashPassword = require('../helpers/hashPassword')
const { verify, sign } = require('../helpers/jwt')
const axios = require('axios')


module.exports = {
    login: function(req,res){
        let dataUser
        User.findOne({
            email: req.body.email,
            password: hashPassword(req.body.email, req.body.password)
        }).populate('TodoId')
        .then(user =>{
            dataUser = user
            if(user){
                return sign(user)
                
            }else{
                res.status(404).json({
                    message: "Email Atau Password Salah"
                })
            }
        })
        .then(token =>{
            req.session.token = token
            if(token){
                res.status(200).json({
                    message: 'berhasil Login',
                    token: token,
                    user: {
                        name: dataUser.name
                    }
                })
            }else{
                res.status(500).json({
                    message: 'gagal membuat token'
                })
            }
        })
    },

    register: function(req,res){
        let newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashPassword(req.body.email, req.body.password)
        })
        newUser.save()
        .then(success =>{
            res.redirect('http://localhost:8080/login/')
        })
        .catch(err =>{
            res.redirect('http://localhost:8080/register/')
        })
    },

    loginWithFacebook: function(req,res){
        let token = req.body.token
        let url = `https://graph.facebook.com/me?fields=id,name,email&access_token=${token}`
        let dataUser
        
        axios({
            method: 'get',
            url: url
        })
        .then(dataUserFacebook =>{
            dataUser = dataUserFacebook.data
            return User.findOne({
                email: dataUser.email,
            })            
        })
        .then(userFromDb =>{
            if(userFromDb){
                return userFromDb
            }else{
                let newUser = new User({
                    name: dataUser.name,
                    email: dataUser.email
                })
                return newUser.save()
            }
        })
        .then(newUser =>{
            return sign(newUser)
        })
        .then(token =>{
            if(token){
                res.status(200).json({
                    message: 'Berhasil Login',
                    token: token,
                    user: {
                        name: dataUser.name
                    }
                })
            }else{
                res.status(500).json({
                    message: 'Gagal membuat token'
                })
            }
        })
        .catch(err =>{
            res.status(404).json({
                message: 'Email atau Password Salah'
            })
        })
    },

    loginWithGoogle: function(req,res){
        let token = req.query.token
        let url = `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`
        let userGoogle

        axios({
            method: 'get',
            url: url
        })
        .then(data =>{
            userGoogle = {
                name: data.data.name,
                email: data.data.email
            }
            return User.findOne({email:userGoogle.email})
        })
        .then(userDb =>{
            if(userDb){
                return userDb
            }else{
                let newUser = new User({
                    name: userGoogle.name,
                    email: userGoogle.email
                })
                return newUser.save()
            }
        })
        .then(user =>{
            return sign(user)
        })
        .then(token =>{
            res.status(200).json({
                message: 'Berhasil Login',
                token: token,
                name: userGoogle.name
            })
        })
        .catch(err =>{
            res.status(200).json(err)
        })
    }
}