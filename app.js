var express = require('express'),
    fs = require('fs'),
    routes = require('./routes'),
    http = require('http'),
    csv = require('csv'),
    path = require('path');
var records = new Array();
var app = express();
var records = [];


app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function () {
    app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/mongo', routes.mongo);

app.get('/setupDB', function (req, res) {
    var insert = {};

    csv(records)
        .from.stream(fs.createReadStream(__dirname + '/team.txt'), {
            columns: true
        })
		
    .on('end', function (count) {
        var MongoClient = require('mongodb').MongoClient;
        // Connect to the db
        MongoClient.connect("mongodb://localhost/teamDb", function (err, db) {
            var collection = db.collection('teams')
            records.push(insert);

            collection.insert(records, function (err, doc) {
                // console.log(doc);
            });

        });
        console.log(count);
        res.send('Number of states: ' + count + 
        '<br><a href="/">Back</a>');
				
    });
});

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
