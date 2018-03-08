const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      flash = require('connect-flash'),
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
app.use(flash());

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

// PASS VARIABLES TO ALL PAGES
app.use((req, res, next) => {
    res.locals.currentUser = req.user; // USER AUTH
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
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