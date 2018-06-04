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
    con = db.db("test3");
    userCollction = con.collection("user");
    activityCollction = con.collection("activitity");
});

function init(callback) {
	var doc = {
    	id: "id2",
    	name: "name1",
    	password: "password",
    	mail: "mail",
    	phone: "phone",
    	url: "url",
    	organize:["test1"],
    	join:["test1"]
    }
    var doc2 = {
		id: "aid1",
		name: "name1",
		info: "info",
		place: "gz",
		organizer: "id1",
		start_time: "1",
		end_time: "2",
		signup_start_time: "3",
		signup_end_time: "4",
		joins:[{id:"1", signin:false}, {id:"2", signin:false}]
	}
	userCollction.insertOne(doc, function() {
		activityCollction.insertOne(doc2, function() {
			callback();
		})
	})
}
//错误
//code == 404: err
var server = app.listen(8888, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log("应用实例，访问地址为 http://%s:%s", host, port);
})

app.get("/", (req, res) => {
	//init(function(){console.log("init完成");})
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
    userCollction.findOne({name: req.query.name}, function(err, data) {
    	//check duplication
    	if(data) {res.send({"ok":false, "code": 400, "err":"duplicated"});return;}
    	//insert
    	userCollction.insertOne(doc, function(err, data) {
    		if(err) {res.send({"ok":false, "code": 404, "err":err});}
    		console.log("newUser:" + req.query.name);
    		res.send({"ok":true, "data":doc});
    	});
    })
});

app.get("/newActivity", (req, res) => {//400:non_register, 401:wrong_password
	var doc = {
		id: req.query.aid,
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
		userCollction.updateOne({id:req.query.oid}, {$push:{organize: req.query.aid}}, function() {
			console.log("newActivity:" + req.query.name);
    		res.send({"ok":true, "data": doc});
		})
	})
})

app.get("/log", (req, res) => {
	userCollction.findOne({name: req.query.name}, function(err, data) {
		if(err) {res.send({"ok":false, "code":404, "err":err});}
		else if(data === null) {res.send({"ok":false, "code": 400, "err":"Not register"});}
		else if(data.password != req.query.password) {
			res.send({"ok":false, "code":401, "err":"Password invalid"});
		}
		else res.send({"ok": true, "data":data});
	})
})

app.get("/getOneActivity", (req, res) => {
	activityCollction.findOne({id:req.query.id}, function(err, data) {
		if(err) {res.send({"ok":false, "code":404, "err":err});}
		else if(data === null) {res.send({"ok":false, "code":404, "err":"stupid boy"});}
		else res.send({"ok": true, "data":data});
	})
})
app.get("/getOneUser", (req, res) => {
	userCollction.findOne({id:req.query.id}, function(err, data) {
		if(err) {res.send({"ok":false, "code":404, "err":err});}
		else if(data === null) {res.send({"ok":false, "code":404, "err":"stupid boy"});}
		else res.send({"ok": true, "data":data});
	})
})
//是否参加
app.get("/isSignup", (req, res) => {
	var aid = req.query.aid;
	var uid = req.query.uid;
	activityCollction.findOne({id:aid, "joins.id": uid}, function(err, data) {
		if(err) {res.send({"ok":false, "code":404, "err":err});}
		else if(data === null) {
			res.send({"ok": true, "code":400, "data":"Not_signup"});
		}
		else {
			res.send({"ok": true, "code":401, "data":"signup"});
		}
	})
})
//报名
app.get("/signup", (req, res) => {//未检查重复，待定$addToset
	var aid = req.query.aid;
	var uid = req.query.uid;
	activityCollction.updateOne({id:aid},{$push:{joins:{id:uid, signin:false}}}, function() {
		userCollction.updateOne({id:uid}, {$push:{join: aid}}, function() {
			res.send({"ok": true});
		})
	})
})
//签到
app.get("/signin", (req, res) => {
	var aid = req.query.aid;
	var uid = req.query.uid;
	activityCollction.updateOne({id:aid, "joins.id": uid},{$set:{"joins.$.signin":true}}, function() {
		res.send({"ok": true});
	})
})

//获取所有用户
app.get("/getAllUser", (req, res) => {
	userCollction.find({}).toArray(function(err, result) { // 返回集合中所有数据
         	if (err) throw err;
         	res.send({"ok": true, "data":result});
    });
})

//获取所有的活动
app.get("/getAllActivity", (req, res) => {
	activityCollction.find({}).toArray(function(err, result) { // 返回集合中所有数据
         	if (err) throw err;
         	res.send({"ok": true, "data":result});
    });
})

//获取某人创建的活动
app.get("/getOneUserOrganize", (req, res) => {
	var uid = req.query.uid;
	userCollction.findOne({id:uid}, function(err, data) {
		if(err) {res.send({"ok":false, "code":404, "err":err});}
		else if(data === null) {res.send({"ok":false, "code":404, "err":"stupid boy"});}
		else res.send({"ok": true, "data":data.organize});
	})
})
//获取某人参与的活动
app.get("/getOneUserTakein", (req, res) => {
	var uid = req.query.uid;
	userCollction.findOne({id:uid}, function(err, data) {
		if(err) {res.send({"ok":false, "code":404, "err":err});}
		else if(data === null) {res.send({"ok":false, "code":404, "err":"stupid boy"});}
		else res.send({"ok": true, "data":data.join});
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