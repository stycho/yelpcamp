const mongoose = require('mongoose');
const Campground = require('./models/campgrounds');
const Comment = require('./models/comment');

let data = [{
        name: 'Black Tusk',
        image: 'https://pixabay.com/get/eb35b70b2df6033ed95c4518b7444795ea76e5d004b0144395f3c271a7ecb3_340.jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
        name: 'Cidar Creek',
        image: 'https://pixabay.com/get/ea34b00e21f6003ed95c4518b7444795ea76e5d004b0144395f3c271a7ecb3_340.jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
        name: 'Trout Lake',
        image: 'https://pixabay.com/get/ea35b3092ff7033ed95c4518b7444795ea76e5d004b0144395f3c271a7ecb3_340.jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
]

function seedDB() {
    //Remove all campgrounds
    Campground.remove({}, (err) => {
        if (err) {
            console.log(err);
        }
        console.log("removed campgrounds!");
        //add a few campgrounds
        data.forEach((seed) => {
            Campground.create(seed, (err, campground) => {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log("added a campground");
                    //create a comment
                    Comment.create({
                        text: "This place is great, but I wish there was internet",
                        author: "Homer"
                    }, (err, comment) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            campground.comments.push(comment);
                            campground.save();
                            console.log("Created new comment");
                        }
                    });
                }
            });
        });
    });
}

module.exports = seedDB;