var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/jsonexample', function (req, res, next) {
    res.json({name1: 'lalala', name2: 'nanana'});
});

module.exports = router;
