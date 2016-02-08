var app=require('express')();

app.use('/',function(req,res){
	res.send('It\s working.')
})

require('./index.js')(app)