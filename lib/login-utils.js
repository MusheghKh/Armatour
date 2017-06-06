module.exports = {

    isNeedAdminLogin: function (req, res, next) {
        if (req.isAuthenticated()) {
            if (req.user.role === 'Administrator'){
                return res.redirect('/admin');
            }
            return res.redirect('/');
        }
        return next();
    },

    isAdmin: function (req, res, next) {
        if (req.isAuthenticated() && req.user.role === 'Administrator') {
            return next();
        }
        return res.redirect('/admin/login');
    }

};
