var contRouter = require("./controller/contactcontroller.js");

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/helloworld");

mongoose.connection.on("connected", () => {
  console.log("connected to database mongodb @27017");
});

var express = require("express");
var app = express();
app.use("/contact", contRouter);
app.use(express.static("views"));

app.listen(4000);
console.log("server is running 3000!!!");

// var objects={
// 	"k1":1,
// 	"k2":2,
// 	"k3":3
// }
// console.log(objects);

// var arr=[];
// for(var key in objects){
// 	var k=key;
// 	var v=objects[key];
// 	var o={k:v};
// 	arr.push(o);
// }
// 	console.log(arr);
