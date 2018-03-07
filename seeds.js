const mongoose = require('mongoose');
const Campground = require('./models/campgrounds');
const Comment = require('./models/comment');

let data = [{
        name: 'Black Tusk',
        image: 'https://pixabay.com/get/eb35b70b2df6033ed95c4518b7444795ea76e5d004b0144395f3c271a7ecb3_340.jpg',
        description: 'Fringilla phasellus faucibus scelerisque eleifend. Lacus viverra vitae congue eu consequat ac felis donec et. Aliquam eleifend mi in nulla. Laoreet non curabitur gravida arcu ac tortor dignissim convallis aenean. Cursus metus aliquam eleifend mi. Eleifend quam adipiscing vitae proin sagittis nisl rhoncus. Ac turpis egestas maecenas pharetra convallis. Eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis orci. Dignissim diam quis enim lobortis scelerisque fermentum dui faucibus. Nunc sed velit dignissim sodales ut. Gravida cum sociis natoque penatibus et magnis dis. Enim neque volutpat ac tincidunt vitae semper quis lectus. Scelerisque felis imperdiet proin fermentum leo vel orci porta non. Magna eget est lorem ipsum dolor sit. Consectetur purus ut faucibus pulvinar elementum.'
    },
    {
        name: 'Cidar Creek',
        image: 'https://pixabay.com/get/ea34b00e21f6003ed95c4518b7444795ea76e5d004b0144395f3c271a7ecb3_340.jpg',
        description: 'Fringilla phasellus faucibus scelerisque eleifend. Lacus viverra vitae congue eu consequat ac felis donec et. Aliquam eleifend mi in nulla. Laoreet non curabitur gravida arcu ac tortor dignissim convallis aenean. Cursus metus aliquam eleifend mi. Eleifend quam adipiscing vitae proin sagittis nisl rhoncus. Ac turpis egestas maecenas pharetra convallis. Eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis orci. Dignissim diam quis enim lobortis scelerisque fermentum dui faucibus. Nunc sed velit dignissim sodales ut. Gravida cum sociis natoque penatibus et magnis dis. Enim neque volutpat ac tincidunt vitae semper quis lectus. Scelerisque felis imperdiet proin fermentum leo vel orci porta non. Magna eget est lorem ipsum dolor sit. Consectetur purus ut faucibus pulvinar elementum.'
    },
    {
        name: 'Trout Lake',
        image: 'https://pixabay.com/get/ea35b3092ff7033ed95c4518b7444795ea76e5d004b0144395f3c271a7ecb3_340.jpg',
        description: 'Fringilla phasellus faucibus scelerisque eleifend. Lacus viverra vitae congue eu consequat ac felis donec et. Aliquam eleifend mi in nulla. Laoreet non curabitur gravida arcu ac tortor dignissim convallis aenean. Cursus metus aliquam eleifend mi. Eleifend quam adipiscing vitae proin sagittis nisl rhoncus. Ac turpis egestas maecenas pharetra convallis. Eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis orci. Dignissim diam quis enim lobortis scelerisque fermentum dui faucibus. Nunc sed velit dignissim sodales ut. Gravida cum sociis natoque penatibus et magnis dis. Enim neque volutpat ac tincidunt vitae semper quis lectus. Scelerisque felis imperdiet proin fermentum leo vel orci porta non. Magna eget est lorem ipsum dolor sit. Consectetur purus ut faucibus pulvinar elementum.'
    },
];

let commentText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Id leo in vitae turpis. Faucibus et molestie ac feugiat sed lectus vestibulum mattis ullamcorper. Et molestie ac feugiat sed lectus vestibulum mattis ullamcorper. Ut pharetra sit amet aliquam. Sed velit dignissim sodales ut eu sem integer vitae. Vitae ultricies leo integer malesuada nunc vel risus commodo. Ultricies leo integer malesuada nunc vel risus commodo. Venenatis tellus in metus vulputate eu scelerisque felis imperdiet proin. Euismod quis viverra nibh cras pulvinar mattis nunc.';

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
                        text: commentText,
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