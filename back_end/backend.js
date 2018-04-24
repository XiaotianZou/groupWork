var express = require("express");
var app = express();


var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";
var con;
var userCollction;
var activityCollction;


MongoClient.connect(url, function(err, db) {
 	if (err) throw err;
    console.log('database set up');
    con = db.db("runoob");
    userCollction = con.collection("user");
    activityCollction = con.collection("activitity");
});
//错误
//code == 404: err
var server = app.listen(8888, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log("应用实例，访问地址为 http://%s:%s", host, port);
})

app.get("/", (req, res) => {
	activityCollction.insertOne({id:100, array:[{id:"1", a:true}, {id:"2", a:true}]});
    res.send("hello");
})

app.get("/newUser", (req, res) => {//400:duplicated
    var doc = {
    	id: req.query.id,
    	name: req.query.name,
    	password: req.query.password,
    	mail: req.query.mail,
    	phone: req.query.phone,
    	url: req.query.url,
    	organize:[],
    	join:[]
    }
    userCollction.findOne({id: req.query.id}, function(err, data) {
    	//check duplication
    	if(data) {res.send({"ok":false, "code": 400, "err":"duplicated"});return;}
    	//insert
    	userCollction.insertOne(doc, function(err, data) {
    		if(err) {res.send({"ok":false, "code": 404, "err":err});}
    		console.log("newUser:" + req.query.name);
    		res.send({"ok":true, "data":doc});
    	});
    })
    // userCollction.find({}).toArray(function(err, result) { // 返回集合中所有数据
    //     if (err) throw err;
    //     console.log(result);
    // });
});

app.get("/newActivity", (req, res) => {//400:non_register, 401:wrong_password
	var doc = {
		id: req.query.id,
		name: req.query.name,
		info: req.query.info,
		place: req.query.place,
		organizer: req.query.oid,
		start_time: req.query.st,
		end_time: req.query.et,
		signup_start_time: req.query.sst,
		signup_end_time: req.query.set,
		joins:[]
	}
	activityCollction.insertOne(doc, function(err, data){
		if(err) {res.send({"ok":false, "code":404, "err":err});}
    	console.log("newActivity:" + req.query.name);
    	res.send({"ok":true, "data": doc});
	})
})

app.get("/log", (req, res) => {
	userCollction.findOne({id: req.query.id}, function(err, data) {
		if(err) {res.send({"ok":false, "err":err});}
		else if(data === null) {res.send({"ok":false, "code": 400, "err":"Not register"});}
		else if(data.password != req.query.password) {
			res.send({"ok":false, "code":401, "err":"Password invalid"});
		}
		else res.send({"ok": true, "data":data});
	})
})


app.get("/test", (req, res) => {
	// activityCollction.update({"array.id":"1"},{$set:{"array.$.a":false}},function(err, res){
	// 	activityCollction.find({}).toArray(function(err, result) { // 返回集合中所有数据
 //         		if (err) throw err;
 //         		console.log(JSON.stringify(result));
 //     		});
	// })
	// activityCollction.updateOne(
 //   		{ id: 1 },
 //   		{ $push: { array: {"3":true} } },
 //   		function(err, res) {
 //   			console.log(res);
 //   			activityCollction.find({}).toArray(function(err, result) { // 返回集合中所有数据
 //        		if (err) throw err;
 //        		console.log(JSON.stringify(result));
 //    		});
 //   		}
	// )
	activityCollction.findOne({id:100}, function(err, data) {
		var a = [];
		for(var i = 0; i < data.array.length; i++) {
			console.log(JSON.stringify(data.array[i]));
			a.push(data.array[i]["id"]);
		}
		res.send(a);
	})
});