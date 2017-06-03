var mongoose = require('mongoose');
var debug = require('debug')('armatour:server');

mongoose.Promise = global.Promise;

var uri = 'mongodb://armatourshef:tCyP255MMaLZ98bqJ2PvHNvN@ds161471.mlab.com:61471/armatour';

mongoose.connect(uri);

mongoose.connection.once('connected', function () {
    debug('Mongoose default connection open');
});

mongoose.connection.on('error',function (err) {
    debug('Mongoose default connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
    debug('Mongoose default connection disconnected');
});