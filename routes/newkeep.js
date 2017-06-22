var Keep = require('../models/keep').Keep;
var HttpError = require('../error').HttpError;
var async = require('async');

exports.get = function (req, res) {
    res.render('newkeep');
};
//
exports.post = function (req, res, next) {
    var keepfield = req.body.keepfield;
    var keep = new Keep({text : keepfield, userId: req.session.user, visible: 1});
    keep.save(function (err) {
        if (err) return next(err);
    });

    res.send({});


};