var checkAuth = require('../middleware/checkAuth');

var User = require('../models/user').User;
var HttpError = require('../error').HttpError;
var ObjectID = require('mongodb').ObjectID;

module.exports = function (app) {
    // app.get('/', require('./frontpage').get);
    app.get('/', function (req, res, next) {
        if (req.user) {
            res.redirect('/keeps');
        }else {
            res.redirect('/login');
        }

    });
    app.get('/login', require('./login').get);
    app.post('/login', require('./login').post);

    app.get('/newkeep', checkAuth, require('./newkeep').get);
    app.post('/newkeep',checkAuth, require('./newkeep').post);
    app.get('/keeps',checkAuth, require('./keeps').get);

    app.post('/logout', require('./logout').post);
    app.post('/delkeep',checkAuth, require('./delkeep').post);

    app.get('/chat', checkAuth, require('./chat').get);

    app.get('/users', function (req, res, next) {
        User.find({}, function (err, users) {
            if (err) return next(err);
            res.json(users);
        })
    });

    app.get('/user/:id', function (req, res, next) {
      try {
          var id = new ObjectID(req.params.id); // явное преобразование
      }catch (e){
          return next(404);
          return;
      }
        User.findById(id, function (err, user) {
            if (err) return next(err);
            if(!user){
                next(new HttpError(404, "User not found"));
            }
            res.json(user);
        })
    });
};

// module.exports = function (app) {
//     app.get('/',function (req, res, next) {
//         res.render("index", {
//
//         });
//     });
//
//     var User = require('models/user').User; // подключаем модель
//     app.get('/users', function (req, res, next) {
//         User.find({}, function (err, users) {
//             if (err) return next(err);
//             res.json(users);
//         })
//     });
//
//     app.get('/user/:id', function (req, res, next) {
//       try {
//           var id = new ObjectID(req.params.id); // явное преобразование
//       }catch (e){
//           return next(404);
//           return;
//       }
//         User.findById(id, function (err, user) {
//             if (err) return next(err);
//             if(!user){
//                 next(new HttpError(404, "User not found"));
//             }
//             res.json(user);
//         })
//     });
// };
//
