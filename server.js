// globals
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var request = require('request');
var harp = require("harp");
var db = mongoose.connection;

// database check
db.on('error', console.error);
db.once('open', function() {
    // Create your schemas and models here.
    console.log("Connection to database successful.");
});
mongoose.connect('mongodb://adrian:1234@ds013456.mlab.com:13456/dashboard');


// middleware --------------------------------------------------------------------------------------------------------------------------------------
app.use(express.static(__dirname + '/public'));
app.use(harp.mount(__dirname + '/public'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

app.use(function(req, res, next) {
	console.log('A request is happening.');
  next();
});
// schema 
var choreSchema = new mongoose.Schema({
	name: String,
	status: {
		type: Boolean,
		default: false
	},
	date : {
		type:Date,
		default: Date.now
	}
})

var Chore = mongoose.model('Chore', choreSchema);

// Routes -----------------------------------------------------------------------------------------------------------------------------------------


// API --------------------------------------------------------------------------------------------------------------------------------------------
app.get('/api/chores', function(req,res){
	Chore.find(function(err, chores){
		if(err){
			console.log(err);
		}
		res.json(chores);

	})
});

app.post('/api/chores', function(req,res){

	var newChore = new Chore({
		name: req.body.name
	})
	newChore.save(function(err){
		if(err){
			res.send('error when creating chore.');
		}else{
			res.send('succesfully created chore.');
		}
	})
});

app.delete('/api/chores/:chore_id', function(req, res) {
	Chore.remove({
		_id : req.params.chore_id
	}, function(err, todo){
		if (err)
			res.send(err);

		Chore.find(function(err, todos) {
		    if (err)
		        res.send(err)
		    res.json(todos);
		});
	});
});
console.log('listening on port 8080.');
app.listen('8080');