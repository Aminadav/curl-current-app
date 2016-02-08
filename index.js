module.exports=function(app){
	// var args=process.argv.join(' ')
	var url
	var foundCurl=false
	var args=''
	for (var i in process.argv){
		if(process.argv[i]=='curl'){
			foundCurl=true
			continue;
		}
		if(!foundCurl) continue;
		if (process.argv[i][0]=='/'){
			url=process.argv[i]
			process.argv[i]=''
		}
		else{
			args+='"' + process.argv[i] +'"'
		}
	}
	if(!url){
		console.log('You not specify the URL. The url must start with /')
		return
	}
	var port=parseInt(Math.random()*1000+5000)
	url='http://127.0.0.1:' + port  + url

	var command='curl "' + url + '"' + ' ' + args

	var http=require('http')
	
	var server=http.createServer(app).listen(port)

	console.log('Running: ' + command)
	require('child_process').exec(command,function(err,body){
		if(err) console.log(err)
		console.log(body)
		server.close()
	})
}