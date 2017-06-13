var mongoose = require('mongoose');

var tourCompanySchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    logo: {
        name: String,
        path: String
    },
    description: {
        type: String
    },
    telephone: {
        type: String
    },
    email: {
        type: String
    },
    website: {
        type: String
    },
    coordinates: {
        lat: Number,
        lng: Number
    },
    comments: [{
        text: String
    }]
});

module.exports = mongoose.model('TourCompany', tourCompanySchema);
