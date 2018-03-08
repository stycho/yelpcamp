const express = require('express'),
      router = express.Router({mergeParams: true}),
      Campground = require('../models/campgrounds'),
      middleware = require('../middleware');

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
router.get('/new',middleware.isLoggedIn, (req, res) => {
    res.render('campgrounds/new.ejs');
});

// CAMPGROUND CREATE
router.post('/',middleware.isLoggedIn, (req, res) => {
    let name = req.body.name;
    let image = req.body.image;
    let desc = req.body.description;
    let author = {
        id: req.user._id,
        username: req.user.username
    };
    let newCampground = {name: name, image: image, description: desc, author: author};
    Campground.create(newCampground, (err, newCampground) => {
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

// CAMPGROUND EDIT
router.get('/:id/edit',middleware.checkCampOwnership, (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        res.render('campgrounds/edit', {campground: foundCampground});
    });
});

// CAMPGROUND UPDATE
router.put('/:id', (req, res) => {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, campground) => {
        if (err) {
            res.redirect('/campgrounds');
        } else {
            res.redirect('/campgrounds/' + req.params.id);
        }
    });
});

//CAMPGROUND DESTROY
router.delete('/:id',middleware.checkCampOwnership, (req, res) => {
    Campground.findByIdAndRemove(req.params.id, err => {
        if (err) {
            res.redirect('/campgrounds');
        } else {
            res.redirect('/campgrounds');
        }
    });
});


// // MIDDLEWARE
// function isLoggedIn(req, res, next) {
//     if(req.isAuthenticated()) {
//         return next();
//     } else {
//         res.redirect('/login');
//     }
// }

// function checkCampOwnership(req, res, next) {
//     if (req.isAuthenticated()) {
//         Campground.findById(req.params.id, (err, foundCampground) => {
//             if (err) {
//                 res.redirect('back');
//             } else {
//                 if (foundCampground.author.id.equals(req.user._id)) {
//                     next();
//                 } else {
//                     res.redirect('back');
//                 }
//             }
//         });
//     } else {
//         res.redirect('back');
//     }
// }

// EXPORT
module.exports = router;