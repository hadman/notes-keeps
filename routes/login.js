var User = require('../models/user').User;
var HttpError = require('../error').HttpError;
var AuthError = require('../models/user').AuthError;
var async = require('async');

exports.get = function (req, res) {
    res.render('login');
};
//
exports.post = function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    User.authorize(username, password, function (err, user) {
        if(err){
            if(err instanceof AuthError){
                return next(new HttpError(403, err.message));
            }else{
                return next(err);
            }
        }
        req.session.user = user._id;
        res.send({});
    });
//
//     // 1. Получить пользователя с таким username из базы
//     // 2. Такой посетитель найден?
//     //     Да - сверить пароль user.checkPassword
//     //     Нет - создать нового полльзователя
//     // 3. Авторизация успешна?
//     //     Да - сохранить _id посетителя в сессии: session.user = user._is и ответить 200
//     //     Нет - вывести ошибку (403 или другие)
//
//     // User.findOne({username: username}, function (err, user) {
//     //     if(err) return next(err);
//     //     is(user) {
//     //         if (user.checkPassword(password)){
//     //             // .. 200 Ok
//     //         }else {
//     //             // .. 403
//     //         }
//     //     } else {
//     //         var user = new User({username : username, password: password});
//     //         user.save(function (err) {
//     //             if (err) return next(err);
//     //             // .. 200 OK ghивязка посетителя к текущей сессии
//     //
//     //         });
//     //     }
//     // })

};