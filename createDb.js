var mongoose = require('libs/mongoose');
// mongoose.set('debug', true);
var async = require('async'); // асинхронная библиотека для работы с колбэками

var User;

async.series([ // по очередно выполняет прописанные функции
    open,
    dropDatabase,
    requireModels,
    createUsers
], function (err) { // results - все, что вернули эти функции
    console.log(arguments);
    mongoose.disconnect();
});


// 4 асинхронных функции
function open(callback) { // ничего в нее не передается
    mongoose.connection.on('open', callback);
}

function dropDatabase(callback) { // очистить базу данных. ничего в нее не передается
    var db = mongoose.connection.db;
    mongoose.connection.dropDatabase(callback);
}

function requireModels(callback) {
    User = require('models/user').User;
    async.each(Object.keys(mongoose.models), function(modelName, callback) {
        mongoose.models[modelName].ensureIndexes(callback);
    }, callback);
    //  User.on('index', callback);
}

function createUsers(callback) {
    // require('models/user');

    var users = [
        {username: 'Вася', password: "supervasya"},
        {username: 'Петя', password: "123"},
        {username: 'admin', password: "thetruehero"}
    ];

    async.each(users, function (userData, callback) {
        var user = new mongoose.models.User(userData);
        user.save(callback); // callback(err, user, affected)
    }, callback);
}







// TEST

// database.dropDatabase(function (err) {
//     // if(err) throw err;
//     console.log("OK");
// });

// var User = require('models/user').User;
//
// var user = new User({
//     username: "Tester2",
//     password: "secret"
// });
//
// user.save(function (err, user, affected) {
//    if(err) throw err;
//    User.findOne({username: "Tester"}, function (err, tester) {
//        console.log(tester);
//    })
// });
//
// var mongoose = require('mongoose');
// mongoose.Promise = global.Promise;
// var config = require('config');
// mongoose.connect('mongodb://localhost/test');
//
// var schema = mongoose.Schema({
//     name: String
// });
// schema.methods.meow = function () {
//     console.log(this.get('name'));
// };
// var Cat = mongoose.model('Cat', schema);
//
// var kitty = new Cat({
//     name: 'Zildjian'
// });
//
// kitty.save(function (err, kitty, afected) {
//     kitty.meow();
// });




// ----MONGODB----
// var MongoClient = require('mongodb').MongoClient
//     , format = require('util').format;
//
// MongoClient.connect('mongodb://127.0.0.1:27017/test', function(err, db) {
//     if(err) throw err;
//
//     var collection = db.collection('test_insert');
//     collection.remove({}, function (err, results) {
//         console.log(arguments);
//     });
//     // collection.insert({a:2}, function(err, docs) {
//     //
//     //     collection.count(function(err, count) {
//     //         console.log(format("count = %s", count));
//     //     });
//     //
//     //     // Locate all the entries using find
//     //     collection.find().toArray(function(err, results) {
//     //         console.dir(results);
//     //         // Let's close the db
//     //         db.close();
//     //     });
//     // });
// });