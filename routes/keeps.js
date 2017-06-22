var Keep = require('../models/keep').Keep;
var async = require('async');

exports.get = function (req, res, next) {
    Keep.find({'userId': req.session.user+'', 'visible': 1}, function (err, keeps) {
        if (err) return next(err);
        res.render('keeps',{
            keepObj: keeps
        });
        // res.json(keeps);
    })
};