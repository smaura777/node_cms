var exec = require("child_process").exec;
var fs = require("fs");
var util = require('util');
var querystring = require("querystring"),
  formidable = require("formidable");
  


function _default(resp,req){
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


function pageHeaderStart(resp){
	resp.write("<!DOCTYPE html><html lang=\"en\"><head><title>Bootstrap 101 Template</title>\
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">");
}

function pageHeaderEnd(resp){
	resp.write("</head><body>");
}

function pageInlineCSS(resp){
	resp.write("<style type=\"text/css\">\
	    body {font-size:12px; font-family:\"Helvetica Neue\", arial, sans-serif;}\
	    .main {margin-left:20px; margin-right:20px; padding-left:10px; border:2px solid #ededed; min-height:500px;}\
		#main_menu {width:300px; margin-left:0px;}\
		#main_menu ul.menu_set {padding:0; margin:0;}\
		#main_menu ul.menu_set li {display:inline; margin-right:5px; padding:1px;}\
		#main_menu ul.menu_set li span {font-weight:bold; font-size:1.2em;}\
		.comment_form {margin-top: 60px; width:400px;}\
	</style>");	
}

function pageEnd(resp){
	resp.write("<script src=\"http://code.jquery.com/jquery.js\"></script></body></html>");
}



function start(resp,req){
	console.log("Request handler 'start' called. ");
	
	// Testing code
	var sleep = function(milliseconds){
		var startTime = new Date().getTime();
		while(new Date().getTime() < startTime + milliseconds);
	}
	
	//console.log("DATA 2 ==> " + postRes);
	
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
     pageHeaderStart(resp);
     pageInlineCSS(resp);
     pageHeaderEnd(resp);
     resp.write("<div class=\"main\">\
       <div id=\"main_menu\">\
       		<ul class=\"menu_set\"> <li><span>home</span></li> <li><span>upload</span></li> <li><span>misc</span></li> </ul>\
       </div>\
     			    <div class=\"comment_form\">\
     			    	<form action=\"/upload\" method=\"POST\" enctype=\"multipart/form-data\">\
     			    		<div><textarea placeholder=\"What\'s up? \" name=\"comment_data\" rows=\"5\" cols=\"60\"></textarea></div>\
     			    		<div><input type=\"file\" name=\"media_asset\" accept=\"image/gif, image/jpeg, image/psd, application/zip, image/tiff, application/pdf, image/png\"></div>\
     			    		<div><input type=\"submit\" value=\"post\"></div>\
     			    	</form>\
     			   </div>\
     		     </div>");  		   
     pageEnd(resp);
     resp.end();
}

function upload(resp,req){
     //var my_data = querystring.parse(postData);
    //console.log("Request handler 'upload' called with  "+ postData);
	
	resp.writeHead(200,{"Content-Type":"text/plain"});
	resp.write("Hello..");
	resp.end();
}

function show (resp,req){
	console.log("Request handler show callerd");
	resp.writeHead(200,{"Content-Type":"text/plain"});
	resp.write("What would you like to see? \n");
	resp.end();
	
}

exports.start = start;
exports.upload = upload;
exports.defaultPage = _default;
exports.show = show;

exports.upload = upload;


