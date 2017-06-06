var express = require('express');
var router = express.Router();
var multer = require('multer');
var fs = require('fs');
var Place = require('../../models/Place');
var checkLogin = require('../../lib/login-utils');

var storagePlace = multer.diskStorage({
    destination: function (req, file, callback) {
        switch (file.fieldname) {
            case 'main_image':
                callback(null, './public/images/uploads/places/main');
                break;
            case 'audio':
                callback(null, './public/audio/uploads/places');
                break;
            case 'other_image':
                callback(null, './public/images/uploads/places/others');
                break;
        }
    },
    filename: function (req, file, callback) {
        var name = file.originalname.replace(/\s+/g, '_').toLowerCase();
        callback(null, name);
    }
});
var uploadPlace = multer({storage: storagePlace});

router.get('/', function (req, res, next) {
    Place.find(function (err, works) {
        if (err) return next(err);
        res.json(works);
    });
});

router.get('/:id', function (req, res, next) {
    Place.findById(req.params.id, function (err, place) {
        if (err) return next(err);
        return res.json(place);
    });
});

router.post('/', checkLogin.isAdmin, function (req, res, next) {
    var callback = uploadPlace.fields([{name: 'main_image', maxCount: 1}, {name: 'audio', maxCount: 1}]);
    callback(req, res, function (err) {
        if (err) return next(err);

        var place = new Place(req.body);
        place.coordinates.lat = req.body.lat;
        place.coordinates.lng = req.body.lng;

        var imageName = req.files.main_image[0].originalname.replace(/\s+/g, '_').toLowerCase();
        place.main_image.name = imageName;
        place.main_image.path = '/images/uploads/places/main/' + imageName;

        var audioName = req.files.audio[0].originalname.replace(/\s+/g, '_').toLowerCase();
        place.audio.name = audioName;
        place.audio.path = '/audio/uploads/places/' + audioName;

        place.save(function (err) {
            if (err) return next(err);
            return res.redirect('/admin/places');
        });
    });
});

router.post('/edit/:id/add_image', checkLogin.isAdmin, function (req, res, next) {
    var callback = uploadPlace.fields([{name: 'other_image', maxCount: 1}]);
    callback(req, res, function (err) {
        if (err) return next(err);

        Place.findById(req.params.id, function (err, place) {
            if (err) return next(err);

            var imageName = req.files.other_image[0].originalname.replace(/\s+/g, '_').toLowerCase();
            place.images.push({name: imageName, path: '/images/uploads/places/others/' + imageName});

            place.save(function (err) {
                if (err) return next(err);

                return res.redirect('/admin/places');
            });
        });
    });
});

router.get('/delete/:id', function (req, res, next) {
    Place.findById(req.params.id, function (err, place) {
        if (err) return next(err);

        place.images.forEach(function(image){
            if (fs.existsSync('./public/images/uploads/places/others/' + image.name)) {
                fs.unlinkSync('./public/images/uploads/places/others/' + image.name);
            }
        });

        if (fs.existsSync('./public/images/uploads/places/main/' + place.main_image.name)) {
            fs.unlinkSync('./public/images/uploads/places/main/' + place.main_image.name);
        }

        if (fs.existsSync('./public/audio/uploads/places/' + place.audio.name)) {
            fs.unlinkSync('./public/audio/uploads/places/' + place.audio.name);
        }

        place.remove(function(err){
            if (err) return next(err);

            return res.redirect('/admin/places');
        });
    });
});

router.get('/:id/delete_image/:name', function (req, res, next) {
    Place.findById(req.params.id, function (err, place) {
        if (err) return next(err);

        var indexes = [];
        place.images.forEach(function(image, i){
            if (image.name === req.params.name){
                indexes.push(i);
                if (fs.existsSync('./public/images/uploads/places/others/' + image.name)) {
                    fs.unlinkSync('./public/images/uploads/places/others/' + image.name);
                }
            }
        });

        for (var i = indexes.length -1; i > -1; i--){
            place.images.splice(indexes[i], 1);
        }

        place.save(function(err){
            if (err) return next(err);

            return res.redirect('/admin/places');
        });
    });
});

router.post('/edit/:id', checkLogin.isAdmin, function (req, res, next) {
    Place.findById(req.params.id, function (err, place) {
        if (err) return next(err);

        place = new Place(req.body);
        place.save(function (err) {
            if (err) return next(err);

            return res.json(place);
        });
    });
});

module.exports = router;
