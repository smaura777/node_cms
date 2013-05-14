var http = require("http");
var url = require("url");
var formidable = require("formidable");
var sys = require("sys");


function start(route,handle){
	http.createServer(function(req,resp){
    	//console.log(req.headers); 
    	var pathname = url.parse(req.url).pathname;
    	var postData = "";
    	req.setEncoding("utf8");
    	
    	if (pathname =='/upload' && req.method.toLowerCase() == 'post'){
    		console.log("Uploading ...");
    		
    		//req.addListener("end",function(chunk){
    		  console.log("End post");
			  var form = new formidable.IncomingForm();
			  form.parse(req,function(err,fields,files){
				resp.writeHead(200,{'Content-type':'text/plain'});
				resp.write('received upload: \n\n');
				resp.end(sys.inspect({fields:fields,files:files}));
			
			    });
    	    
    	    //});
    		
    		return;	
    	}
    	else if (req.method.toLowerCase() != 'post'){
    		route(handle,pathname,resp,postData);
    	}
    	
    	/**
    	req.addListener("data",function(chunk){
    		postData += chunk;
    		console.log("Received data chunk");
    	});
    	
    
    	
    	req.addListener("end",function(chunk){
    		console.log("Done receiving");
    		route(handle,pathname,resp,postData);
    	});
    	
    	
        **/
        	
    	
    	//route(handle,pathname,resp);
    	console.log("Request for "+pathname+" received");
		
		/**
		resp.writeHead(200,{"Content-Type":"text/html"});
		resp.write("<!DOCTYPE html><html><head><title>Node</title></head>"+
		"<body><div style='width:500px;margin:50px auto 0 auto; background-color:#fff;outline:1px solid #000; ' >");
		resp.write("<div><p>Hello Node.js World</p></div>");
		resp.write("<div><p>Received request from "+req.headers['user-agent']+"</p></div>");
		resp.write("</div></body></html>");
		resp.end();
		**/
	}).listen(8084,function(){
		  console.log("Connection receive for note service ");
	});
       
}

exports.start =  start;

 