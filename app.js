var express = require('express');
var http = require('http');
var path = require('path');
var config = require('./config');
var log = require('./libs/log')(module);
var mongoose = require('./libs/mongoose');
var HttpError = require('./error').HttpError;

var app = express();

// var routes = require('./routes');
// var user = require('./routes/user');

app.engine('ejs', require('ejs-locals')); // чем обрабатывать файлы ejs вместо стандартного
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs'); // Движок шаблонов

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser()); // req.body

app.use(express.cookieParser()); // req.cookies

var MongoStore = require('connect-mongo')(express);
var mongoose_store = new MongoStore({mongooseConnection: mongoose.connection});

app.use(express.session({
    secret: config.get('session:secret'),
    key: config.get('session:key'),
    cookie: config.get('session:cookie'),
    saveUninitialized: false,
    resave: false,
    store: mongoose_store
}));

// app.use(function (req, res, next) {
//     req.session.numberOfVisits = req.session.numberOfVisits+1 || 1;
//     res.send("Visits: "+req.session.numberOfVisits);
// });
app.use(require('./middleware/loadUser'));
app.use(require('./middleware/sendHttpError'));

app.use(app.router);

require('./routes')(app);

app.use(express.static(path.join(__dirname, 'public'))); // статика на крайний случай

app.use(function (err, req, res, next) {
    if (typeof  err == 'number'){
        err = new HttpError(err);
    }

    if(err instanceof  HttpError){
        res.sendHttpError(err);
    }else{
        if (app.get('env') == 'development') {
            express.errorHandler(err, req, res, next);
        }else{
            log.error(err);
            err = new HttpError(500);
            res.sendHttpError(err);
        }
    }




});


//
// // all environments

//
// // development only
// if ('development' == app.get('env')) {
//   app.use(express.errorHandler());
// }
//
// app.get('/', routes.index);
// app.get('/users', user.list);
//
//

http.createServer(app).listen(config.get('port'), function(){
    log.info('Express server listening on port ' + config.get('port'));
});

