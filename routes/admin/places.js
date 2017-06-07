var express = require('express');
var router = express.Router();
var checkLogin = require('../../lib/login-utils');
var Place = require('../../models/Place');

router.get('/', checkLogin.isAdmin, function (req, res, next) {
    Place.find(function (err, places) {
        if (err) return next(err);

        res.render('admin/places', {title: 'Places', user: req.user, places: places});
    });
});

router.get('/new', checkLogin.isAdmin, function (req, res, next) {
    res.render('admin/places_new', {title: 'New Place', user: req.user});
});

router.get('/edit/:id', checkLogin.isAdmin, function (req, res, next) {
    Place.findById(req.params.id, function (err, place) {
        if (err) return next(err);

        res.render('admin/places_new', {title: 'Edit Place', user: req.user, place: place});
    });
});

module.exports = router;
