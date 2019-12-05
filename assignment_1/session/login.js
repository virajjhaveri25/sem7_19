var mysql=require('mysql');
var express=require('express');
var session=require('express-session');
var fileStore=require('session-file-store')('session');
var path=require('path');
var app=express();

app.use(express.static('public'));

var connection=mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'root',
	database:'mydb'
});

app.use(session({
	secret:'secret',
	resave:false,
	saveUninitialized:false,
	cookie:{maxAge: 1000*100},
	store:new FileStore({path:'/session-data'})
}));

app.use(bodyParser.urlencoded({extended:true}));

app.post('/validate',function(req,res){
	var username=request.body.username;
	var password=request.body.password;

	if(username && password)
	{
		connection.query('SELECT * from users WHERE username=?  AND password=?',[username,password],function(error,results,fields){
			if(results.length>0)
			{
				request.session.loggedin=true;
				request.session.username=username;
				response.redirect('/home');
			}
			else
			{
				response.send('incorrect');
			}
			response.end();
		});
	}
	else
	{
		response.send('Please enter details');
		response.end();
	}
});

app.get('/home',function(req,res){
	if(response.session.loggedin)
	{
		response.send('Welcome' + request.session.username + "<br>" + request.session.id + "!!" + "<br><a href='./logout'>Logout</a>");
	}
	else
	{
		response.send('Please login again');
		response.end();
	}
});

app.get('/logout',function(req,res){
	if(request.session.loggedin)
	{
		if(req.session) 
		{
			req.session.destroy(function(err){
				if(err)
				{
					return next(err);
				}
				else
				{
					return res.redirect('/login.html');
				}
			});
		}
	}
	else
	{
		res.redirect('/login.html');
	}
});

app.listen(9000);