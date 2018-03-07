const express = require('express'),
      router = express.Router({mergeParams: true}),
      Campground = require('../models/campgrounds');

// CAMPGROUND INDEX
router.get('/', (req, res) => {
    Campground.find({}, (err, data) => {
        if (err) {
            console.log('ERROR: ', err);
        } else {
            res.render('campgrounds/index', {campgrounds: data});
        }
    });
});

// CAMPGOUND NEW
router.get('/new',isLoggedIn, (req, res) => {
    res.render('campgrounds/new.ejs');
});

// CAMPGROUND CREATE
router.post('/',isLoggedIn, (req, res) => {
    let name = req.body.name;
    let image = req.body.image;
    let desc = req.body.description;
    let newCampground = {name: name, image: image, description: desc};
    Campground.create(newCampground, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/campgrounds');
        }
    });
});

// CAMPGROUND SHOW
router.get('/:id', (req, res) => {
    Campground.findById(req.params.id).populate('comments').exec((err, foundCampgrounds) => {
        if (err) {
            console.log(err);
        } else {
            res.render('campgrounds/show', {campground: foundCampgrounds});
        }
    });
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