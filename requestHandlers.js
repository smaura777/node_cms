var exec = require("child_process").exec;
var fs = require("fs");
var querystring = require("querystring");
var counter=0;
var postRes = "";


function _default(resp){
	 // Open index.html
     fs.readFile('index.html','utf8',function(err,data){
     	resp.writeHead(200,{"Content-Type":"text/html"});
     		if (err){
     			resp.write("<h2>Could not find index file </h2>");
     		}
     		else {
     			resp.write(data);
     		}
     		resp.end();
     });
}


function pageStart(resp){
	resp.write("<!DOCTYPE html><html lang=\"en\"><head><title>Bootstrap 101 Template</title>\
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\
     </head><body>");
}

function pageEnd(resp){
	resp.write("<script src=\"http://code.jquery.com/jquery.js\"></script></body></html>");
}


function start(resp,postData){
	console.log("Request handler 'start' called. ");
	
	
	
	
	// Testing code
	var sleep = function(milliseconds){
		var startTime = new Date().getTime();
		while(new Date().getTime() < startTime + milliseconds);
	}
	
	console.log("DATA 2 ==> " + postRes);
	
	/**
	var content = 'empty';
	exec("find /Users/smaura777/ -name \"*.css\"",function(error,stdout,stderr){

		content = stdout;
		console.log("Output of Command :");
		console.log(""+content+"");
		console.log("====== end ======");
		
		resp.writeHead(200,{"Content-Type":"text/plain"});
		resp.write(""+stdout+"");
		resp.end();
	});

     **/
     
     resp.writeHead(200,{"Content-Type":"text/html"});
     pageStart(resp);
   
    

       resp.write("<div class=\"main\"><h2> Comments count : "+counter+" </h2><div class=\"comments\"></div>\
     			    <div class=\"comment_form\">\
     			    	<form action=\"/upload\" method=\"POST\">\
     			    		<textarea name=\"comment_data\" rows=\"20\" cols=\"60\"></textarea>\
     			    		<input type=\"submit\" value=\"status\">\
     			    	</form>\
     			   </div>\
     		     </div>");
     		   
     
     pageEnd(resp);
    resp.end();
     counter +=1;
}

function upload(resp,postData){
    var tst = {};
    tst['me'] = "fdsf hello";
    var my_data = querystring.parse(postData);
	
	console.log("Request handler 'upload' called with  "+ postData);
	resp.writeHead(200,{"Content-Type":"text/plain"});
	//pageStart(resp);
	resp.write("UPLOAD " + "Yoooo" + " ");
	resp.write("UPLOAD " + tst.me + " " + my_data);
	//resp.write(utils.inspect( querystring.parse(postData) ));
	//pageEnd(resp);
	
	resp.end();
}

exports.start = start;
exports.upload = upload;
exports.defaultPage = _default;

exports.upload = upload;


