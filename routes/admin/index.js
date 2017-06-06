var express = require('express');
var router = express.Router();
var passport = require('passport');
var checkLogin = require('../../lib/login-utils');
var Place = require('../../models/Place');

router.get('/login', checkLogin.isNeedAdminLogin, function (req, res, next) {
    res.render('admin/login', {title: 'Login'});
});

router.post('/login', checkLogin.isNeedAdminLogin, passport.authenticate('local-admin-login', {
    successRedirect : '/admin/',
    failureRedirect : '/admin/register',
    failureFlash : false
}));

router.post('/register', checkLogin.isAdmin, passport.authenticate('local-signup', {
    successRedirect : '/admin/login',
    failureRedirect : '/admin/register',
    failureFlash : false
}));

router.get('/register', checkLogin.isAdmin, function (req, res, next) {
    res.render('admin/register', {title: 'Register'/*, user: req.user*/});
});

router.get('/logout', checkLogin.isAdmin, function (req, res, next) {
    req.logout();
    res.redirect('/admin/login');
});

router.get('/', checkLogin.isAdmin, function (req, res, next) {
    res.render('admin/index', {title: 'Admin Panel', user: req.user});
});

router.get('/portfolio', checkLogin.isAdmin, function (req, res, next) {
    res.render('admin/portfolio', {title: 'Portfolio', user: req.user});
});

router.get('/blog', checkLogin.isAdmin, function (req, res, next) {
    res.render('admin/blog', {title: 'Blog', user: req.user});
});

router.get('/signup', checkLogin.isAdmin, function (req, res, next) {
    res.render('admin/signup', {title: 'Sign up', user: req.user});
});

router.get('/timeline', checkLogin.isAdmin, function (req, res, next) {
    res.render('admin/timeline', {title: 'Timeline', user: req.user});
});

router.get('/typography', checkLogin.isAdmin, function (req, res, next) {
    res.render('admin/typography', {title: 'Typography', user: req.user});
});

router.get('/bootstrap-elements', checkLogin.isAdmin, function (req, res, next) {
    res.render('admin/bootstrap-elements', {title: 'Bootstrap elements', user: req.user});
});

router.get('/bootstrap-grid', checkLogin.isAdmin, function (req, res, next) {
    res.render('admin/bootstrap-grid', {title: 'Bootstrap grid', user: req.user});
});

router.get('/forms', checkLogin.isAdmin, function (req, res, next) {
    res.render('admin/forms', {title: 'Forms', user: req.user});
});

router.get('/places', checkLogin.isAdmin, function (req, res, next) {
    Place.find(function (err, places) {
        if (err) return next(err);

        res.render('admin/places', {title: 'Places', user: req.user, places: places});
    });
});

router.get('/places/new', checkLogin.isAdmin, function (req, res, next) {
    res.render('admin/places_new', {title: 'New Place', user: req.user});
});

router.get('/places/edit/:id', checkLogin.isAdmin, function (req, res, next) {
    Place.findById(req.params.id, function (err, place) {
        if (err) return next(err);

        res.render('admin/places_new', {title: 'Edit Place', user: req.user, place: place});
    });
});

module.exports = router;
