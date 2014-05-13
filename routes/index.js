
/*
 * home page
 */
//Mongoose 

var mongoose = require('../node_modules/mongoose');
mongoose.connect('mongodb://localhost/teamDb');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
console.log("Connected!");

//teams Schema
var Schema = mongoose.Schema;
var teamsSchema = new Schema({
	State:{
		teams: Number
	}
});

//Our Model
var DataModel = mongoose.model('DataModel',teamsSchema,'teams');


//Exports!
exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

//This will be called by Ajax
exports.mongo = function(req, res){


		//Using lean
		DataModel.find().lean().exec(function (err, results) {
			res.send(results);
		});

	//});

};