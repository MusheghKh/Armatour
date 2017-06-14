var express = require('express');
var router = express.Router();
var multer = require('multer');
var fs = require('fs');
var TourCompany = require('../../models/TourCompany');
var checkLogin = require('../../lib/login-utils');

var storageTourCompany = multer.diskStorage({
    destination: function (req, file, callback) {
        if(file.fieldname === 'logo'){
            callback(null, './public/images/uploads/tour_companies/logos/');
        }
    },
    filename: function (req, file, callback) {
        var name = file.originalname.replace(/\s+/g, '_').toLowerCase();
        callback(null, name);
    }
});
var uploadTourCompany = multer({storage: storageTourCompany});

router.get('/', function (req, res, next) {
    TourCompany.find(function (err, tour_companies) {
        if (err) return next(err);
        res.json(tour_companies);
    });
});

router.get('/:id', function (req, res, next) {
    TourCompany.findById(req.params.id, function (err, tour_company) {
        if (err) return next(err);
        return res.json(tour_company);
    });
});

router.post('/', checkLogin.isAdmin, function (req, res, next) {
    var callback = uploadTourCompany.fields([{name: 'logo', maxCount: 1}]);
    callback(req, res, function (err) {
        if (err) return next(err);

        var tourCompany = new TourCompany(req.body);
        tourCompany.coordinates.lat = req.body.lat;
        tourCompany.coordinates.lng = req.body.lng;

        var logoName = req.files.logo[0].originalname.replace(/\s+/g, '_').toLowerCase();
        tourCompany.logo.name = logoName;
        tourCompany.logo.path = '/images/uploads/tour_companies/logos/' + logoName;

        tourCompany.save(function (err) {
            if (err) return next(err);
            return res.redirect('/admin/tour_companies');
        });
    });
});

router.post('/edit/:id/add_logo', checkLogin.isAdmin, function (req, res, next) {
    var callback = uploadTourCompany.fields([{name: 'logo', maxCount: 1}]);
    callback(req, res, function (err) {
        if (err) return next(err);

        TourCompany.findById(req.params.id, function (err, tourCompany) {
            if (err) return next(err);

            var logoName = req.files.logo[0].originalname.replace(/\s+/g, '_').toLowerCase();
            tourCompany.logo.name = logoName;
            tourCompany.logo.path = '/images/uploads/tour_companies/logos/' + logoName;

            tourCompany.save(function (err) {
                if (err) return next(err);

                return res.redirect('/admin/tour_companies');
            });
        });
    });
});

router.get('/delete/:id', function (req, res, next) {
    TourCompany.findById(req.params.id, function (err, tourCompany) {
        if (err) return next(err);

        if (fs.existsSync('./public/images/uploads/tour_companies/logos/' + tourCompany.logo.name)) {
            fs.unlinkSync('./public/images/uploads/tour_companies/logos/' + tourCompany.logo.name);
        }

        tourCompany.remove(function(err){
            if (err) return next(err);

            return res.redirect('/admin/tour_companies');
        });
    });
});

router.get('/:id/delete_logo/:name', checkLogin.isAdmin, function (req, res, next) {
    TourCompany.findById(req.params.id, function (err, tourCompany) {
        if (err) return next(err);

        if (tourCompany.logo.name === req.params.name ){
            if (fs.existsSync('./public/images/uploads/tour_companies/logos/' + tourCompany.logo.name)) {
                fs.unlinkSync('./public/images/uploads/tour_companies/logos/' + tourCompany.logo.name);
            }
        }

        tourCompany.save(function(err){
            if (err) return next(err);

            return res.redirect('/admin/tour_companies');
        });
    });
});

router.post('/edit/:id', checkLogin.isAdmin, function (req, res, next) {
    TourCompany.findById(req.params.id, function (err, tourCompany) {
        if (err) return next(err);

        tourCompany.title = req.body.title;
        tourCompany.description = req.body.description;
        tourCompany.address = req.body.address;
        tourCompany.telephone = req.body.telephone;
        tourCompany.email = req.body.email;
        tourCompany.website = req.body.website;
        tourCompany.coordinates.lat = req.body.lat;
        tourCompany.coordinates.lng = req.body.lng;

        tourCompany.save(function (err) {
            if (err) return next(err);

            return res.json('/admin/tour_companies');
        });
    });
});

module.exports = router;
