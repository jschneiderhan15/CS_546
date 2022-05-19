const express = require('express');
const router = express.Router();
const users = require('../data/users');
const data = require('../data');
const userData = data.users;

router.get('/', async (req, res) => {
    if(req.session.user){
        console.log('[' + new Date().toUTCString() + ']: ' + req.method + ' ' + req.originalUrl + ' (Authenticated User)');
        res.redirect('/private');
    } else {
        console.log('[' + new Date().toUTCString() + ']: ' + req.method + ' ' + req.originalUrl + ' (Non-Authenticated User)');
        res.status(401).render('../views/pages/login', {});
        return;
    }
});

router.get('/signup', async (req, res) => {
    if(req.session.user){
        console.log('[' + new Date().toUTCString() + ']: ' + req.method + ' ' + req.originalUrl + ' (Authenticated User)');
        res.redirect('/private');
    } else {
        console.log('[' + new Date().toUTCString() + ']: ' + req.method + ' ' + req.originalUrl + ' (Non-Authenticated User)');
        res.status(401).render('../views/pages/signup')
    }
});

router.post('/signup', async (req, res) => {
    try{
        if(!req.body.username){
            throw "Username must be supplied!";
        }
        if(!req.body.password){
            throw "Password must be supplied!";
        }
        if(req.body.username.trim().length === 0){
            throw "Username cannot just be empty spaces!";
        }
        for(x of req.body.username){
            if(x === " "){
                throw "Username cannot have spaces!";
            }
        }
        var regEx = /^[0-9a-zA-Z]+$/; //checking for alphanumeric only. got regex from w3schools!
        if(!req.body.username.match(regEx)){
            throw "Username must only contain alphanumeric characters!";
        }
        if(req.body.username.length < 4){
            throw "Username must be at least 6 characters long.";
        }
        if(req.body.password.trim().length === 0){
            throw "Password cannot just be empty spaces!";
        }
        for(x of req.body.password){
            if(x === " "){
                throw "Password cannot have spaces!";
            }
        }
        if(req.body.password.length < 6){
            throw "Password must be at least 6 characters long.";
        }
        const user = await userData.createUser(req.body.username, req.body.password);
        if(user.userInserted){
            console.log('[' + new Date().toUTCString() + ']: ' + req.method + ' ' + req.originalUrl + ' (Authenticated User)');
            res.redirect('/');
        } else{
            res.status(500).json("Internal Server Error");
            return;
        }
    } catch (e){
        console.log('[' + new Date().toUTCString() + ']: ' + req.method + ' ' + req.originalUrl + ' (Non-Authenticated User)');
        res.status(400).render('../views/pages/signup', {error: e});
        return;
    }
});

router.post('/login', async (req, res) => {
    try{
        if(!req.body.username){
            throw "Username must be supplied!";
        }
        if(!req.body.password){
            throw "Password must be supplied!";
        }
        if(req.body.username.trim().length === 0){
            throw "Username cannot just be empty spaces!";
        }
        for(x of req.body.username){
            if(x === " "){
                throw "Username cannot have spaces!";
            }
        }
        var regEx = /^[0-9a-zA-Z]+$/; //checking for alphanumeric only. got regex from w3schools!
        if(!req.body.username.match(regEx)){
            throw "Username must only contain alphanumeric characters!";
        }
        if(req.body.username.length < 4){
            throw "Username must be at least 6 characters long.";
        }
        if(req.body.password.trim().length === 0){
            throw "Password cannot just be empty spaces!";
        }
        for(x of req.body.password){
            if(x === " "){
                throw "Password cannot have spaces!";
            }
        }
        if(req.body.password.length < 6){
            throw "Password must be at least 6 characters long.";
        }
        const checkUser = await userData.checkUser(req.body.username, req.body.password);
        if(checkUser.authenticated){
            console.log('[' + new Date().toUTCString() + ']: ' + req.method + ' ' + req.originalUrl + ' (Authenticated User)');
            req.session.user = req.body.username;
            res.redirect('/private');
        } else{
            throw "Your username / password is invalid!"
        }
    } catch (e){
        console.log('[' + new Date().toUTCString() + ']: ' + req.method + ' ' + req.originalUrl + ' (Non-Authenticated User)');
        res.status(400).render('../views/pages/login', {error: e});
        return;
    }
});

router.get('/private', async (req, res) => {
    if(req.session.user){
        console.log('[' + new Date().toUTCString() + ']: ' + req.method + ' ' + req.originalUrl + ' (Authenticated User)');
        res.render('../views/pages/private', {username: req.session.user});
    } else{
        console.log('[' + new Date().toUTCString() + ']: ' + req.method + ' ' + req.originalUrl + ' (Non-Authenticated User)');
        e = "Please login with a valid username and password!";
        res.status(401).render('../views/pages/login', { e });
    }
});

router.get('/logout', async (req, res) => {
    res.clearCookie('AuthCookie');
    console.log('[' + new Date().toUTCString() + ']: ' + req.method + ' ' + req.originalUrl + ' (Authenticated User)');
    res.render('../views/pages/logout');
});
module.exports = router;