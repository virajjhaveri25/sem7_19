var express=require('express');
var session=require('express-session');

var app=express();

app.use(session({ secret:"enc-key",
				  saveUninitialized:true,
				  resave:true
				}));

app.get('/',function(req,res){
	if(req.session.page_views)
	{
        req.session.page_views++;
        res.send("you visited" + req.session.page_views + " times");
	}
	else
	{
        req.session.page_views=1;
        res.send("welcome");
	}
});
app.listen(8000);