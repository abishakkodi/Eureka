const mongoose = require('mongoose');
const dbUri = require('./dbInfo').dbUri;
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

/* Connection to the database */

mongoose.connect('mongodb://' + dbUri, { useMongoClient: true });

mongoose.connection.once('open', function() {
    console.log('database is connected');
});

mongoose.connection.on('error', function(error) {
    console.log('database connection error: ' + error);
});

/* List of Schemas */

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        require: true
    }
});


const VideoSchema = new Schema({
    videoId: {
        type: String,
        require: true
    },
    url: {
        type: String,
        required: true,
        unique: true
    },
    linkType: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    createdBy: {
        type: String,
        required: true
    },
    submittedBy: {
        type: String,
        required: true
    },
    dateAdded: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: false
    },
    category: {
        type: String,
        required: true
    },
    subcategory: {
        type: String,
        required: true
    }
});







/* authenticate input against database */



/* hashing a password before saving it to the database */

UserSchema.pre('save', function (next) {
    var user = this;
    bcrypt.hash(user.password, 10, function (err, hash){
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    })
});


/* Model for Schema */

const User = mongoose.model('User', UserSchema);
const Video = mongoose.model('Video', VideoSchema);


module.exports.User = User;
module.exports.Video = Video;
