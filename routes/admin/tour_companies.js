var express = require('express');
var router = express.Router();
var checkLogin = require('../../lib/login-utils');
var TourCompany = require('../../models/TourCompany');

router.get('/', checkLogin.isAdmin, function (req, res, next) {
    TourCompany.find(function (err, tour_companies) {
        if (err) return next(err);

        res.render('admin/tour_companies', {title: 'Tour Companies', user: req.user, tour_companies: tour_companies});
    });
});

router.get('/new', checkLogin.isAdmin, function (req, res, next) {
    res.render('admin/tour_companies_new', {title: 'New Tour Company', user: req.user});
});

router.get('/edit/:id', checkLogin.isAdmin, function (req, res, next) {
    TourCompany.findById(req.params.id, function (err, tour_company) {
        if (err) return next(err);

        res.render('admin/tour_companies_new', {title: 'Edit Tour Company', user: req.user, tour_company: tour_company});
    });
});

module.exports = router;
