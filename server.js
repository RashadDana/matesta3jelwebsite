var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose'),
	autoIncrement = require('mongoose-auto-increment');
// var connection = mongoose.connect('mongodb://localhost/test');
var connection = mongoose.connect('mongodb://admin:admin@ec2-54-163-210-122.compute-1.amazonaws.com:27017/MA_Database');
var path = require('path');



autoIncrement.initialize(connection);

app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res){
  res.render('index', {
    title: 'Home'
  });
});

app.get('/admin', function(req, res){
  res.render('admin', {
    title: 'admin'
  });
});

app.post('/api/admin', function(req, res){
 	
 	var id = req.body.firebaseId;
 	

 	console.log(id);
 	 if (id == "5sbD7tzmaDT4CEFFCx4n3oQxaR13"){

 	 	res.render('dashboard');
 	 }
 	
 	


});


app.listen(3000);


var userSchema = mongoose.Schema({
	firebaseId: {type: String, required: true},
	city: {type: String, required: true},
	area: {type: String, required: true},
	trafficLightId: {type: String, required: true},
	email: {type: String, required: true},
	fullName : {type: String,required: true},
	phone: {type: String,required: true},
	address: {type: String,required: true},
	joined: {type: Date,required: true, default: Date.now},
	hasCar: Boolean,
	wantsSupervisor:Boolean,
	lastActive:Date,
	volunteerType: {type: String,required: true},
	volunteerExperience: String,
	lastCheckedIn: Date

},{collection: 'user'});





userSchema.plugin(autoIncrement.plugin, 'userModel');

var userModel = mongoose.model("userModel",userSchema);

var citySchema = mongoose.Schema({
	
	englishName: {type: String, required: true, unique: true},
	arabicName: {type: String, required: true, unique: true}

},{collection: 'city'});




citySchema.plugin(autoIncrement.plugin, 'cityModel');

var cityModel = mongoose.model("cityModel",citySchema);




var areaSchema = mongoose.Schema({
	city: {type: Number, required: true},
	englishName: {type: String, required: true, unique: true},
	arabicName: {type: String, required: true, unique: true}

},{collection: 'area'});

areaSchema.plugin(autoIncrement.plugin, 'areaModel');

var areaModel = mongoose.model("areaModel",areaSchema);


var lightSchema = mongoose.Schema({
	city: {type: Number, required: true},
	area: {type: Number, required: true},
	englishName: {type: String, required: true, unique: true},
	arabicName: {type: String, required: true, unique: true},
	nickName:  String

},{collection: 'light'});

lightSchema.plugin(autoIncrement.plugin, 'lightModel');

var lightModel = mongoose.model("lightModel",lightSchema);


app.post('/api/user',function(req,res){

	var user = req.body;
	console.log(req.body);
	

	userModel
		.create(user)
		.then(
			function(postObj){
		 res.json(200); 
		}
,
		function(error){
			// res.sendStatus(400);
			res.json(error)
				}

		);

});


app.post('/api/city',function(req,res){

	var city = req.body;
	console.log(req.body);
	

	cityModel
		.create(city)
		.then(
			function(postObj){
		 res.json(200); 
		}
,
		function(error){
			res.json(error)
			res.sendStatus(400);

				}

		);

});

app.post('/api/area',function(req,res){

	var area = req.body;
	console.log(req.body);
	

	areaModel
		.create(area)
		.then(
			function(postObj){
		 res.json(200); 
		}
,
		function(error){
			res.json(error)
			res.sendStatus(400);
				}

		);

});

app.post('/api/light',function(req,res){

	var light = req.body;
	console.log(req.body);
	

	lightModel
		.create(light)
		.then(
			function(postObj){
		 res.json(200); 
		}
,
		function(error){
			res.sendStatus(400);
				}

		);

});

app.get('/api/city',function(req,res){

	  cityModel.find(function (err, cities) {
  if (err) return console.error(err);
  console.log(cities);
  res.json(cities)
});
});

app.get('/api/area',function(req,res){
	var cityId = req.query.city
	console.log(req.query);
	  areaModel.find({city:cityId},function (err, areas) {
  if (err) return console.error(err);
  
  res.json(areas)
});
});

app.get('/api/light',function(req,res){
		var areaId = req.query.area
	  lightModel.find({area:areaId}, function (err, lights) {
  if (err) return console.error(err);
  console.log(lights);
  res.json(lights)
});
});



