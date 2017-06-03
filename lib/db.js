var mongoose = require('mongoose');
var debug = require('debug')('armatour:server');

mongoose.Promise = global.Promise;

var uri = 'mongodb://armatourshef:tCyP255MMaLZ98bqJ2PvHNvN@ds161471.mlab.com:61471/armatour';

mongoose.connect(uri);

mongoose.connection.once('connected', function () {
    console.log('Mongoose default connection open');
});

mongoose.connection.on('error',function (err) {
    console.log('Mongoose default connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});