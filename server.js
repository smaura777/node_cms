var http = require("http");
var url = require("url");
var querystring = require("querystring");


function start(route,handle){
	http.createServer(function(req,resp){
    	var urlObj = url.parse(req.url);
    	
    	var pathname = urlObj.pathname;
    	var query = urlObj.query;
    	
    	var search = urlObj.search;
    	var queryStr = querystring.parse(search);
    	console.log("qstring : " + queryStr[0]);
    	 
    	
    	
    	console.log("search " + search);
    	console.log("query "+ query);
    	console.log("Request for "+pathname+" received");
    	
    	var filename = req.url.toString().split('=');
    	if ( typeof filename == 'object' && filename.length > 1){
    	  console.log("filename is  " + filename[1]);
    	}
    	
    	route(handle,pathname,resp,req);
    	
	}).listen(8084,function(){
		  console.log("Connection receive for note service ");
	});
       
}

exports.start =  start;

 