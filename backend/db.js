const mongoose = require('mongoose');
const dbUri = require('./dbInfo').dbUri;
const Schema = mongoose.Schema;
const VideoSubmissionSchema = require('./relational_schema/videoSubmission');
const VideoPreferenceSchema = require('./relational_schema/videoPreference');

/* Connection to the database */

mongoose.connect('mongodb://' + dbUri, { useMongoClient: true });

mongoose.connection.once('open', function() {
    console.log('database is connected');
});

mongoose.connection.on('error', function(error) {
    console.log('database connection error: ' + error);
});


const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: [true, 'email is required']
    },
    password: {
        type: String,
        validate: {
          validator: (password) => password.length > 6,
          message: 'Password must be longer than 6 charecters'
        },
        require: [true, 'Password is required']
    },
    bookmarks: {
        type: [String],
        required: false
    },
    videosSubmitted: [VideoSubmissionSchema],
    videoPreference: [VideoPreferenceSchema],
    categoryPreference: {
        category: [String],
        subcategory: [String]
    }
});

UserSchema.virtual('bookmarksCount').get(function () {
    return this.bookmarks.length;
});

const VideoSchema = new Schema({
   videoId: {
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
       required: true
   },
   likes: {
       type: Number,
       required: false
   },
   dislikes: {
       type: Number,
       required: false
   },
   viewCount: {
       type: Number,
       required: false
   },
   category: {
       type: String,
       required: false
   },
   subcategory: {
       type: String,
       required: false
   },
   thumbnail: {
       type: String,
       required: false
   },
   createdBy: {
       type: String,
       required: true
   },
   dateCreated: {
       type: String,
       required: false
   }
});


/* Model for Schema */

const User = mongoose.model('User', UserSchema);
const Video = mongoose.model('Video', VideoSchema);


module.exports.User = User;
module.exports.Video = Video;