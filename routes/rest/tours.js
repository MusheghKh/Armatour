var express = require('express');
var router = express.Router();
var multer = require('multer');
var fs = require('fs');
var Tour = require('../../models/Tour');
var checkLogin = require('../../lib/login-utils');

var storageTour = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/images/uploads/tours');
    },
    filename: function (req, file, callback) {
        var name = file.originalname.replace(/\s+/g, '_').toLowerCase();
        callback(null, name);
    }
});
var uploadTour = multer({storage: storageTour});

router.get('/', function (req, res, next) {
    Tour.find(function (err, works) {
        if (err) return next(err);

        res.json(works);
    });
});

router.get('/:id', function (req, res, next) {
    Tour.findById(req.params.id, function (err, tour) {
        if (err) return next(err);

        return res.json(tour);
    });
});

router.post('/', checkLogin.isAdmin, function (req, res, next) {
    var callback = uploadTour.single('image');
    callback(req, res, function (err) {
        if (err) return next(err);

        var tour = new Tour(req.body);
        tour.coordinates.start.lat = req.body.start_lat;
        tour.coordinates.start.lng = req.body.start_lng;

        tour.coordinates.end.lat = req.body.end_lat;
        tour.coordinates.end.lng = req.body.end_lng;

        var imageName = req.file.originalname.replace(/\s+/g, '_').toLowerCase();
        tour.image.name = imageName;
        tour.image.path = '/images/uploads/tours/' + imageName;

        tour.save(function (err) {
            if (err) return next(err);
            return res.redirect('/admin/tours');
        });
    });
});

router.get('/delete/:id', function (req, res, next) {
    Tour.findById(req.params.id, function (err, tour) {
        if (err) return next(err);

        if (fs.existsSync('./public/images/uploads/tours/' + tour.image.name)) {
            fs.unlinkSync('./public/images/uploads/tours/' + tour.image.name);
        }

        tour.remove(function(err){
            if (err) return next(err);

            return res.redirect('/admin/tours');
        });
    });
});

router.post('/edit/:id', checkLogin.isAdmin, function (req, res, next) {
    Tour.findById(req.params.id, function (err, tour) {
        if (err) return next(err);

        tour.title = req.body.title;
        tour.description = req.body.description;
        tour.coordinates.start.lat = req.body.start_lat;
        tour.coordinates.start.lng = req.body.start_lng;
        tour.coordinates.end.lat = req.body.end_lat;
        tour.coordinates.end.lng = req.body.end_lng;
        tour.place_id = req.body.place_id;
        tour.updated_at = Date.now();

        tour.save(function (err) {
            if (err) return next(err);

            return res.redirect('/admin/tours');
        });
    });
});

module.exports = router;
