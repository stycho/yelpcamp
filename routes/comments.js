const express = require('express'),
      router = express.Router({mergeParams: true}),
      Campground = require('../models/campgrounds'),
      Comment = require('../models/comment'),
      middleware = require('../middleware');

// COMMENTS NEW
router.get('/new', middleware.isLoggedIn, (req, res) => {
    
    Campground.findById(req.params.id, (err, campground) => {
        if (err) {
            console.log(err);
        } else {
            res.render('comments/new', {campground: campground});
        }
    })
});

// COMMENTS CREATE
router.post('/', middleware.isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if (err) {
            console.log(err);
            res.redirect('/campgrounds')
        } else {
            Comment.create(req.body.comment, (err, comment) => {
                if (err) {
                    console.log(err);
                } else {
                    comment.author.id = req.user._id;
                    comment. author.username = req.user.username;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect('/campgrounds/' + campground._id);
                }
            });
        }
    });
});

// COMMENT EDIT
router.get('/:comment_id/edit', middleware.checkCommentOwnership, (req, res) => {
    Comment.findById(req.params.comment_id, (err, comment) => {
        if (err) {
            res.redirect('back');
        } else {
            res.render('comments/edit', {comment: comment, campgroundId: req.params.id});
        }
    });
});

// COMMENT UPDATE
router.put('/:comment_id', middleware.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment) => {
        if (err) {
            res.redirect('back');
        } else {
            res.redirect('/campgrounds/' + req.params.id);
        }
    })
});

// COMMENT DESTROY
router.delete('/:comment_id', middleware.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndRemove(req.params.comment_id, err => {
        if (err) {
            res.redirect('back');
        } else {
            res.redirect('back');
        }
    });
})

// // MIDDLEWARE
// function isLoggedIn(req, res, next) {
//     if(req.isAuthenticated()) {
//         return next();
//     } else {
//         res.redirect('/login');
//     }
// }

// function checkCommentOwnership(req, res, next) {
//     if (req.isAuthenticated()) {
//         Comment.findById(req.params.comment_id, (err, foundComment) => {
//             if (err) {
//                 res.redirect('back');
//             } else {
//                 if (foundComment.author.id.equals(req.user._id)) {
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