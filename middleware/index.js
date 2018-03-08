const Campground = require('../models/campgrounds');
const Comment = require('../models/comment');

let middlewareObj = {
    
};

middlewareObj.checkCampOwnership = (req, res, next) => {
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, (err, foundCampground) => {
            if (err) {
                req.flash('error', "Campground not found");
                res.redirect('back');
            } else {
                if (foundCampground.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash('error', "You don't have permission to do that");
                    res.redirect('back');
                }
            }
        });
    } else {
        res.redirect('back');
    }
}

middlewareObj.checkCommentOwnership = (req, res, next) => {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, (err, foundComment) => {
            if (err) {
                req.flash('error', 'Comment not found');
                res.redirect('back');
            } else {
                if (foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash('error', "You don't have permission to do that");
                    res.redirect('back');
                }
            }
        });
    } else {
        req.flash('error', 'You must be logged in');
        res.redirect('back');
    }
}

middlewareObj.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next();
    } else {
        req.flash('error', 'You must be logged in');
        res.redirect('/login');
    }
}

module.exports = middlewareObj;