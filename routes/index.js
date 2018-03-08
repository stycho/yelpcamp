const express = require('express'),
      router = express.Router(),
      User = require('../models/user'),
      passport = require('passport'),
      middleware = require('../middleware');

// ROOT ROUTE
router.get('/', (req, res) => {
    res.render('landing');
});

// SHOW REGISTER FORM
router.get('/register', (req, res) => {
    res.render('register', {currentUser: req.user});
});

// HANDLE REGISTER LOGIC
router.post('/register', (req, res) => {
    let newUser = new User({username: req.body.username});
    
    User.register(newUser, req.body.password, (err, user) => {
        if (err) {
            req.flash('error', err.message);
            return res.redirect('register');
        } else {
            passport.authenticate('local')(req, res, () => {
                req.flash('success', "Welcome to GoodCamp " + user.username);
                res.redirect('/campgrounds')
            });
        }
    });
});

// SHOW LOGIN FORM
router.get('/login', (req, res) => {
    res.render('login');
});

// HANDLE LOGIN LOGIC
router.post('/login', passport.authenticate('local', 
    {
        successRedirect: '/campgrounds',
        failureRedirect: '/login'
    }), (req, res) => {}
);
    
// LOGOUT ROUTE
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', 'Logged out');
    res.redirect('/campgrounds');
});

// EXPORT
module.exports = router;