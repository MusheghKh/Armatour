var mongoose = require('mongoose');

var tourSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        name: String,
        path: String
    },
    place_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Place'
    },
    coordinates: {
        start: {
            lat: Number,
            lng: Number
        },
        end: {
            lat: Number,
            lng: Number
        }
    },
    updated_at: {
        type: Date,
        default: null
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Tour', tourSchema);
