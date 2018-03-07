const express = require('express'),
      router = express.Router(),
      User = require('../models/user'),
      passport = require('passport');

// ROOT ROUTE
router.get('/', (req, res) => {
    res.render('landing');
});

// SHOW REGISTER FORM
router.get('/register', (req, res) => {
    res.render('register', {message: 'Please sign up', currentUser: req.user});
});

// HANDLE REGISTER LOGIC
router.post('/register', (req, res) => {
    let newUser = new User({username: req.body.username});
    
    User.register(newUser, req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            return res.render('register', {message: err.message});
        } else {
            passport.authenticate('local')(req, res, () => {
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
    res.redirect('/campgrounds');
});

// MIDDLEWARE
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/login');
    }
}

// EXPORT
module.exports = router;