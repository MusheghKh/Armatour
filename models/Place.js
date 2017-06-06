var mongoose = require('mongoose');

var placeSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    audio: {
        name: String,
        path: String
    },
    main_image: {
        name: String,
        path: String
    },
    images: [{
        name: String,
        path: String
    }],
    coordinates: {
        lat: Number,
        lng: Number
    },
    comments: [{
        text: String
    }],
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Place', placeSchema);
