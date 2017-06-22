var crypto = require('crypto');
var util = require('util');

var mongoose = require('../libs/mongoose'),
    Schema = mongoose.Schema;

// var async = require('async');

mongoose.Promise = global.Promise;

var schema = new Schema({
    text: {
        type: String,
        required: true
    },
    visible: {
        type: Number,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now()
    }
});


// schema.statics.createkeep = function (keepfield, callback) {
//     var User = this;
//
//     async.waterfall([ // поочерендное выполнение. колбэк из одной в другую
//         function (callback) {
//             User.findOne({username: username}, callback);
//         },
//         function (user, callback) {
//             if (user) {
//                 if (user.checkPassword(password)) {
//                     callback(null, user);
//                 } else {
//                     callback(new AuthError("Пароль неверен"));
//                 }
//             } else {
//                 var user = new User({username: username, password: password});
//                 user.save(function (err) {
//                     if (err) return callback(err);
//                     // .. 200 OK ghивязка посетителя к текущей сессии
//                     callback(null, user);
//                 });
//             }
//         }
//
//     ], callback);
// };

exports.Keep = mongoose.model('Keep', schema);

// function AuthError(message) {
//     Error.apply(this, arguments);
//     Error.captureStackTrace(this, AuthError);
//
//     this.message = message;
// }
//
// util.inherits(AuthError, Error);
//
// AuthError.prototype.name = 'AuthError';
//
// exports.AuthError = AuthError;