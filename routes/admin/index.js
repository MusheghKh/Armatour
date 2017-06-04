var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('admin/index');
});

router.get('/portfolio', function (req, res, next) {
    res.render('admin/portfolio');
});

router.get('/blog', function (req, res, next) {
    res.render('admin/blog');
});

router.get('/signup', function (req, res, next) {
    res.render('admin/signup');
});

router.get('/register', function (req, res, next) {
    res.render('admin/register');
});

router.get('/timeline', function (req, res, next) {
    res.render('admin/timeline');
});

router.get('/typography', function (req, res, next) {
    res.render('admin/typography');
});

router.get('/bootstrap-elements', function (req, res, next) {
    res.render('admin/bootstrap-elements');
});

router.get('/bootstrap-grid', function (req, res, next) {
    res.render('admin/bootstrap-grid');
});

router.get('/forms', function (req, res, next) {
    res.render('admin/forms');
});

module.exports = router;
