// var datetime = require('date-and-time');
// var past = '2015-01-01 00:00:00';
// var pastDateTime = datetime.create(past);
// // get the current timestamp of the past
// setTimeout(function () {
//     var pastNow = pastDateTime.now();
//     // this would be 1420038010000
//     console.log(pastNow);
//     // this would be 2015-01-01 00:00:10
//     console.log(new Date(1420038010000));
// }, 1000);	


var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});