var express = require('express');
var router = express.Router();
var checkLogin = require('../../lib/login-utils');
var Tour = require('../../models/Tour');

router.get('/', checkLogin.isAdmin, function (req, res, next) {
    Tour.find(function (err, tours) {
        if (err) return next(err);

        res.render('admin/tours', {title: 'Tours', user: req.user, tours: tours});
    });
});

router.get('/new', checkLogin.isAdmin, function (req, res, next) {
    res.render('admin/tours_new', {title: 'New Tour', user: req.user});
});

router.get('/edit/:id', checkLogin.isAdmin, function (req, res, next) {
    Tour.findById(req.params.id, function (err, tour) {
        if (err) return next(err);

        res.render('admin/tours_new', {title: 'Edit Tour', user: req.user, tour: tour});
    });
});

module.exports = router;
