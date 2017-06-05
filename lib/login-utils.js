module.exports = {

    accessToLogin: function (req, res, next) {
        if (req.isAuthenticated()) {
            return res.redirect('/admin');
        }
        return next();
    },

    isLoggedIn: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/admin/login');
    }

};