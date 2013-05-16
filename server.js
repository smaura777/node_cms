var http = require("http");
var url = require("url");

function start(route,handle){
	http.createServer(function(req,resp){
    	var pathname = url.parse(req.url).pathname;
    	console.log("Request for "+pathname+" received");
    	route(handle,pathname,resp,req);
    	
	}).listen(8084,function(){
		  console.log("Connection receive for note service ");
	});
       
}

exports.start =  start;

 