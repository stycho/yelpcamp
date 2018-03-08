const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      passport = require('passport'),
      LocalStrategy = require('passport-local'),
      methodOverride = require('method-override'),
      Campground = require('./models/campgrounds'),
      Comment = require('./models/comment'),
      User = require('./models/user'),
      seedDB = require('./seeds.js');
      
// REQUIRE ROUTES
const commentRoutes = require('./routes/comments'),
      campgroundRoutes = require('./routes/campgrounds'),
      indexRoutes = require('./routes/index');
      
mongoose.connect('mongodb://localhost/yelp_camp');

// SET
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));

// Seeds DB with data
// seedDB();

// PASSPORT CONFIG
app.use(require('express-session')({
    secret: 'I cant get it out of my head',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// PASSES USER AUTH TO ALL PAGES
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});

// USE ROUTES
app.use(indexRoutes);
app.use('/campgrounds/:id/comments',commentRoutes);
app.use('/campgrounds', campgroundRoutes);

// LISTEN
app.listen(process.env.PORT, process.env.IP, () => {
    console.log('YelpCamp is running...');
});