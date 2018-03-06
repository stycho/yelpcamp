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
            res.render('index', {campgrounds: data});
        }
    });
});

app.get('/campgrounds/new', (req, res) => {
    res.render('new.ejs');
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
            res.render('show', {campground: foundCampgrounds});
        }
    });
});



// LISTEN
app.listen(process.env.PORT, process.env.IP, () => {
    console.log('YelpCamp is running...');
});