const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      Campground = require('./models/campgrounds'),
      Comment = require('./models/comment'),
      //User = require('./models/user'),
      seedDB = require('./seeds.js');
      
mongoose.connect('mongodb://localhost/yelp_camp');

// SET
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

// Seeds DB with data
seedDB();

// GET
app.get('/', (req, res) => {
    res.render('landing');
});

app.get('/campgrounds', (req, res) => {
    Campground.find({}, (err, data) => {
        if (err) {
            console.log('ERROR: ', err);
        } else {
            res.render('campgrounds/index', {campgrounds: data});
        }
    });
});

app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new.ejs');
});

// POST
app.post('/campgrounds', (req, res) => {
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

// SHOW
app.get('/campgrounds/:id', (req, res) => {
    Campground.findById(req.params.id).populate('comments').exec((err, foundCampgrounds) => {
        if (err) {
            console.log(err);
        } else {
            console.log(foundCampgrounds);
            res.render('campgrounds/show', {campground: foundCampgrounds});
        }
    });
});

// ===================
// COMMENT ROUTS
// ===================

app.get('/campgrounds/:id/comments/new', (req, res) => {
    
    Campground.findById(req.params.id, (err, campground) => {
        if (err) {
            console.log(err);
        } else {
            console.log(campground);
            res.render('comments/new', {campground: campground});
        }
    })
});

app.post('/campgrounds/:id/comments', (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if (err) {
            console.log(err);
            res.redirect('/campgrounds')
        } else {
            Comment.create(req.body.comment, (err, comment) => {
                if (err) {
                    console.log(err);
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect('/campgrounds/' + campground._id);
                }
            });
        }
    });
});

// LISTEN
app.listen(process.env.PORT, process.env.IP, () => {
    console.log('YelpCamp is running...');
});