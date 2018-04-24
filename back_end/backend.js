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

var server = app.listen(8888, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log("应用实例，访问地址为 http://%s:%s", host, port);
})

app.get("/", (req, res) => {
	activityCollction.insertOne({id:100, array:[{id:"1", a:true}, {id:"2", a:true}]});
    res.send("hello");
})

app.get("/newUser", (req, res) => {
    var doc = {
    	id: req.query.id,
    	name: req.query.name,
    	password: req.query.password,
    	mail: req.query.mail,
    	phone: req.query.phone,
    	url: req.query.url
    }
    userCollction.insertOne(doc, function(err, res) {
    	if(err) {es.send({"ok":false, "err":err});}
    	console.log("newUser:" + req.query.name);
    	res.send({"ok":true});
    });
    // userCollction.find({}).toArray(function(err, result) { // 返回集合中所有数据
    //     if (err) throw err;
    //     console.log(result);
    // });
});

app.get("/newActivity", (req, res) => {

})

app.get("/test", (req, resp) => {
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
	activityCollction.findOne({id:100}, function(err, res) {
		var a = [];
		for(var i = 0; i < res.array.length; i++) {
			console.log(JSON.stringify(res.array[i]));
			a.push(res.array[i]["id"]);
		}
		resp.send(a);
	})
});