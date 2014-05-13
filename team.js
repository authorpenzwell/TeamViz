var express = require('express'),
	mongoose = require('mongoose')
, http = require('http');

var app = express();

app.configure(function() {
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(__dirname + "/public"));
});

mongoose.connect("mongodb://localhost/teamDb");

var TeamSchema = new mongoose.Schema({
	State: String,
	Team: String,
}),

	Teams = mongoose.model('Teams', TeamSchema);
// INDEX	
app.get("/teams", function (req, res) {
	Teams.find({}, function (err, docs) {
		res.render('teams/index', { teams: docs });
	});
});

// MAP  
app.get('/teams/team', function (req, res) {
	res.render("teams/team");
});

http.createServer(app).listen(app.get('port'), function(){
	console.log("Express server listening on port " + app.get('port'));
});




