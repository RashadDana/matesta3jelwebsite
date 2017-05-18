var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose'),
	autoIncrement = require('mongoose-auto-increment');
// var connection = mongoose.connect('mongodb://localhost/test');
var connection = mongoose.connect('mongodb://admin:admin@ec2-34-206-20-114.compute-1.amazonaws.com:27017/MA_Database');
var path = require('path');
var request = require('request');


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
	city: {type: Number, required: true},
	area: {type: Number, required: true},
	trafficLightId: {type: Number, required: true},
	email: {type: String, required: true},
	fullName : {type: String,required: true},
	age: {type: String, default: '20'},
	phone: {type: String,required: true},
	address: {type: String,required: true},
	joined: {type: Date,required: true, default: Date.now},
	hasCar: Boolean,
	wantsSupervisor:Boolean,
	lastActive:Date,
	volunteerType: {type: String,required: true},
	volunteerExperience: String,
	lastCheckedIn: Date,
	checkedBy:{type: String,required: true, default: '-'},
	gender:{type: String,required: true, default: 'male'}

},{collection: 'user'});





userSchema.plugin(autoIncrement.plugin, 'userModel');

var userModel = mongoose.model("userModel",userSchema);



var wareHouseUserSchema = mongoose.Schema({
	firebaseId: {type: String, required: true},
	wareHouse: {type: Number, required: true},
	email: {type: String, required: true},
	fullName : {type: String,required: true},
	age: {type: String, default: '20'},
	phone: {type: String,required: true},
	address: {type: String,required: true},
	joined: {type: Date,required: true, default: Date.now},
	lastActive:Date,
	volunteerType: {type: String,required: true},
	volunteerExperience: String,
	lastCheckedIn: Date,
	checkedBy:{type: String,required: true, default: '-'},
	gender:{type: String,required: true, default: 'male'}

},{collection: 'wareHouseUser'});





wareHouseUserSchema.plugin(autoIncrement.plugin, 'wareHouseUserModel');

var wareHouseUserModel = mongoose.model("wareHouseUserModel",wareHouseUserSchema);


var citySchema = mongoose.Schema({
	
	englishName: {type: String, required: true,  default: '-'},
	arabicName: {type: String, required: true, unique: true}

},{collection: 'city'});







var checkInSchema = mongoose.Schema({
	
	userId: {type: Number, required: true},
	superId: {type: Number, required: true},
	date: {type: Date,required: true, default: Date.now}

},{collection: 'checkIn'});

checkInSchema.plugin(autoIncrement.plugin, 'checkInModel');

var checkInModel = mongoose.model("checkInModel",checkInSchema);










citySchema.plugin(autoIncrement.plugin, 'cityModel');

var cityModel = mongoose.model("cityModel",citySchema);


var managmentUserSchema = mongoose.Schema({
	
	userName: {type: String, required: true, unique: true},
	password: {type: String, required: true}

},{collection: 'managmentUser'});




managmentUserSchema.plugin(autoIncrement.plugin, 'managmentUserModel');

var managmentUserModel = mongoose.model("managmentUserModel",managmentUserSchema);


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

var wareHouseSchema = mongoose.Schema({
	city: {type: Number, required: true},
	area: {type: Number, required: true},
	englishName: {type: String, required: true, unique: true},
	arabicName: {type: String, required: true, unique: true}

},{collection: 'wareHouse'});

wareHouseSchema.plugin(autoIncrement.plugin, 'wareHouseModel');

var wareHouseModel = mongoose.model("wareHouseModel",wareHouseSchema);




app.post('/api/user',function(req,res){

	var user = req.body;
	console.log(req.body);
	

	userModel
		.create(user)
		.then(
			function(postObj){

				var number = req.body.phone.substring(1);

request({
  method: 'POST',
  url: 'http://api.unifonic.com/rest/Messages/Send',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body: "AppSid=mBTuQPpEgcXLUJrydipVFGbGdcztc&Recipient=962"+number+"&Body=تم تسجيلك بنجاح، سنقوم بالتواصل معك خلال ٤٨ ساعة، عائلة ماتستعجل ترحب بك"
}, function (error, response, body) {
  console.log('Status:', response.statusCode);
  console.log('Headers:', JSON.stringify(response.headers));
  console.log('Response:', body);
});
		 res.json(200); 
		}
,
		function(error){
			// res.sendStatus(400);
			console.log(error)
			res.json(error)
				}

		);

});

app.post('/api/wareHouseUser',function(req,res){

	var user = req.body;
	console.log(req.body);
	

	wareHouseUserModel
		.create(user)
		.then(
			function(postObj){

var number = req.body.phone.substring(1);

request({
  method: 'POST',
  url: 'http://api.unifonic.com/rest/Messages/Send',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body: "AppSid=mBTuQPpEgcXLUJrydipVFGbGdcztc&Recipient=962"+number+"&Body=تم تسجيلك بنجاح، سنقوم بالتواصل معك خلال ٤٨ ساعة، عائلة ماتستعجل ترحب بك"
}, function (error, response, body) {
  console.log('Status:', response.statusCode);
  console.log('Headers:', JSON.stringify(response.headers));
  console.log('Response:', body);
});

		 res.json(200); 
		}
,
		function(error){
			// res.sendStatus(400);
			console.log(error)
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


app.post('/api/managmentUser',function(req,res){

	var user = req.body;
	console.log(req.body);
	

	managmentUserModel
		.create(user)
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


app.post('/api/wareHouse',function(req,res){

	var house = req.body;
	console.log(req.body);
	

	wareHouseModel
		.create(house)
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

app.get('/api/areas',function(req,res){

	  areaModel.find(function (err, cities) {
  if (err) return console.error(err);
  console.log(cities);
  
  res.json(cities)
});
});

app.get('/api/lights',function(req,res){

	  lightModel.find(function (err, cities) {
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


app.get('/api/wareHouse',function(req,res){
		
	  wareHouseModel.find( function (err, houses) {
  if (err) return console.error(err);
  console.log(houses);
  res.json(houses)
});
});

app.get('/api/user',function(req,res){
		
	  userModel.find( function (err, users) {
  if (err) return console.error(err);
  console.log(users);
  res.json(users)
});
});

app.get('/api/wareHouseUser',function(req,res){
		
	  wareHouseUserModel.find( function (err, users) {
  if (err) return console.error(err);
  console.log(users);
  res.json(users)
});
});

app.put('/api/updateUser',function(req,res){

	var id = req.body.id,
       body = req.body;
  console.log(body);
  userModel.findByIdAndUpdate(id, body, function(error, courses) {
    // Handle the error using the Express error middleware
    if(error){
res.json(error);
     return next(error);}
    
    // Render not found error
    if(!courses) {
      return res.status(404).json({
        message: 'Course with id ' + id + ' can not be found.'
      });
    }

    res.json(courses);
  });
});



app.put('/api/updateWareHouseUser',function(req,res){

	var id = req.body.id,
       body = req.body;
  console.log(body);
  wareHouseUserModel.findByIdAndUpdate(id, body, function(error, courses) {
    // Handle the error using the Express error middleware
    if(error){
res.json(error);
     return next(error);}
    
    // Render not found error
    if(!courses) {
      return res.status(404).json({
        message: 'Course with id ' + id + ' can not be found.'
      });
    }

    res.json(courses);
  });
});




app.post('/api/deleteUser',function(req,res){
	var id = req.body.id

	userModel.findByIdAndRemove(id, function (err,offer){
    if(err) { throw err; }

    res.json(offer);
    // ...
});


});

app.post('/api/deleteWareHouseUser',function(req,res){
	var id = req.body.id

	wareHouseUserModel.findByIdAndRemove(id, function (err,offer){
    if(err) { throw err; }

    res.json(offer);
    // ...
});


});



app.post('/api/login',function(req,res){

managmentUserModel.findOne({userName:req.body.userName},function(err,user){

	if(!user){

		res.render('admin.ejs',{err: 'invalid username'});

	}else if (req.body.password === user.password){

		res.render('dashboard.ejs');
	}else{
		res.render('admin.ejs',{err: 'invalid username'});

	}
});
	});

app.post('/api/usersOfCity',function(req,res){
console.log(req.body);
userModel.find({city:req.body.city}).exec(function(err,users){
	
	
	res.json(users);
});
	});

app.post('/api/usersOfArea',function(req,res){
console.log(req.body);
userModel.find({area:req.body.area}).exec(function(err,users){
	
	
	res.json(users);
});
	});



app.post('/api/usersInCity',function(req,res){

userModel.find({city:req.body.city}).exec(function(err,users){
	var count = users.length;
	
	res.json(count);
});
	});

app.post('/api/usersInWareHouse',function(req,res){

wareHouseUserModel.find({wareHouse:req.body.wareHouse}).exec(function(err,users){
	var count = users.length;
	
	res.json(count);
});
	});

app.post('/api/usersOfWareHouse',function(req,res){
console.log(req.body);
wareHouseUserModel.find({wareHouse:req.body.wareHouse}).exec(function(err,users){
	
	
	res.json(users);
});
	});

app.post('/api/usersInArea',function(req,res){

userModel.find({area:req.body.area}).exec(function(err,users){
	var count = users.length;
	
	res.json(count);
});
	});

app.post('/api/usersInLight',function(req,res){

userModel.find({trafficLightId:req.body.light}).exec(function(err,users){
	var count = users.length;
	
	res.json(count);
});
	});

app.post('/api/usersOfLight',function(req,res){

userModel.find({trafficLightId:req.body.light}).exec(function(err,users){
	
	
	res.json(users);
});
	});


app.post('/api/areasInCity',function(req,res){

areaModel.find({city:req.body.city}).exec(function(err,users){
	var count = users.length;
	
	res.json(count);
});
	});

app.post('/api/lightsInArea',function(req,res){

lightModel.find({area:req.body.area}).exec(function(err,users){
	var count = users.length;
	
	res.json(count);
});
	});

app.post('/api/lightsOfArea',function(req,res){

lightModel.find({area:req.body.area}).exec(function(err,users){
	
	
	res.json(users);
});
	});

app.post('/api/lightsInCity',function(req,res){

lightModel.find({city:req.body.city}).exec(function(err,users){
	var count = users.length;
	
	res.json(count);
});
	});

app.post('/api/userByFirebaseId',function(req,res){

userModel.find({firebaseId:req.body.firebaseId}).exec(function(err,users){
	
	
	res.json(users);
});
	});

app.post('/api/lightById',function(req,res){

lightModel.find({_id:req.body.id}).exec(function(err,lights){
	
	
	res.json(lights);
});
	});

app.post('/api/areaById',function(req,res){

areaModel.find({_id:req.body.id}).exec(function(err,areas){
	
	
	res.json(areas);
});
	});

app.post('/api/checkIn',function(req,res){

	var checkIn = req.body;
	console.log(req.body);
	

	checkInModel
		.create(checkIn)
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

app.get('/api/checkIn',function(req,res){

	  checkInModel.find(function (err, checkIns) {
  if (err) return console.error(err);
  console.log(checkIns);
  
  res.json(checkIns)
});
});
	

