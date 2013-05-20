var exec = require("child_process").exec;
var fs = require("fs");
var util = require('util');
var querystring = require("querystring"),
  formidable = require("formidable"),
  mime = require("mime"),
  im = require('imagemagick');
  
  

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


/**************************************************************************************/

/**************************************************************************************/




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
    if (req.method.toLowerCase() == 'post'){
	   var form = new formidable.IncomingForm();
	    form.uploadDir = '/tmp';
	    
	   form.parse(req,function(err,fields,files){
	      if (err) {
	      	  //resp.writeHead(200,{"Content-Type":"text/plain"});
	      	   //resp.write("Error");
	      	   console.log("error ......");
	      }
	      else {   
	   		console.log("Error:");
	   		console.log(err);
	   		console.log("Fields:");
	   		console.log(fields);
	   		console.log("Files (files.media_asset.path , name, lastModifiedDate,type):");
	   		//console.log(files);
	   		console.log(files.media_asset.path);
	   		
	   		var fileRealname = files.media_asset.name;
	   		var tmpFile = files.media_asset.path;
	   		var realPathName = "/tmp/" + fileRealname;
	   		console.log("realPathName: "+ realPathName); 
	   		var fileMimeType = files.media_asset.type;
	   		// Rename uploaded file 
	   		fs.rename(tmpFile,realPathName,function(err){
	   			if (err){
	   				console.log("Error renamin file " + tmpFile);	
	   			}
	   			else {
	   				console.log("Rename of " + realPathName + " successful");
	   				
	   			    resp.writeHead(200,{"Content-Type":"text/html"});
	                pageHeaderStart(resp);
                    pageInlineCSS(resp);
                    pageHeaderEnd(resp);	
	                resp.write("<div><h2>Image: "+fileRealname+" <h2></div>");
	                resp.write("<div> <img src=\"/show/?q="+fileRealname+"\"> </div>");
	                pageEnd(resp);
	   				resp.end();
	   				
	   				/**
	   				fs.readFile(realPathName,"binary",function(err,data){
	   					if (err){
	   						console.log("Error reading file " + realPathName);	
	   					     resp.writeHead(500,{"Content-Type":"text/plain"});
	   					     resp.write("File reading error");
	   					     resp.end();		
	   					}
	   					else {
	   					     console.log("Writing file of type : "+ fileMimeType + " on screen" );
	   						 resp.writeHead(200,{"Content-Type":""+fileMimeType+""});
	   						 resp.write(data,"binary");
	   						//  resp.writeHead(200, {"Content-Type":"text/html"});
	   						 // resp.write("<h1>Data here: </h1>");
	   						 resp.end();	
	   					}
	   				});
	   				**/
	   				
	   				//resp.writeHead(200, {"Content-Type":"" + fileMimeType + ""});
	   				
	   			}
	   		} );
	   		//console.log(files.media_asset.name);
	   		//console.log(files.media_asset.lastModifiedDate);
	   		// Upload directory content
	   		
	   		/**
	   		fs.readdir('/tmp',function(err,files){
	   			if (err){
	   				console.log("Error reading directory ");
	   			}
	   			else {
	   				console.log("directory content : ");
	   				console.log(files);
	   			}
	   			
	   		});
	   	  	**/
	   	  	
	   	  }
	   	  
	   });
	   
	   /**
	   resp.writeHead(200,{"Content-Type":"text/html"});
	     pageHeaderStart(resp);
         pageInlineCSS(resp);
         pageHeaderEnd(resp);	
	     
	     resp.write("<div><h2>Thanks for uploading<h2></div>");
	   
	   pageEnd(resp);
	   **/
	}
	else {
	   resp.writeHead(200,{"Content-Type":"text/plain"});
	   resp.write("Nothing was uploaded");
	}
	
}

function show (resp,req){
	console.log("Request handler show callerd");
	var filename = req.url.toString().split('=')[1];
	console.log("filename to show "+ filename);
	var cpath = "/tmp/"+ filename + "";
	var ftype = mime.lookup(cpath);
	console.log("MIME: " + ftype);
	
	/**
	im.readMetadata(cpath, function(err, metadata){
	
    	if (err) {
    		console.log("Error reading photo data with imagemagick");
    	}
    	else {
    		console.log('Shot at '+metadata.exif.dateTimeOriginal);
    	}
    	
    })
	**/
	
		
	fs.readFile(cpath,"binary",function(err,data){
			if (err){
	   			console.log("Error reading file " + cpath);	
	   			resp.writeHead(500,{"Content-Type":"text/plain"});
	   			resp.write("File reading error");
	   			resp.end();		
	   		}
	   		else {
	   			console.log("Writing file of type : "+ ftype + " on screen" );
	   			resp.writeHead(200,{"Content-Type":""+ ftype +""});
	   			resp.write(data,"binary");
	   			resp.end();
	   		}
	});
	
	/**
	resp.writeHead(200,{"Content-Type":"text/plain"});
	resp.write("What would you like to see? \n");
	resp.end();
	**/
}


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


function staticResource(resp,req){
	var pathname = __dirname + req.url;
	console.log("pathname "+ pathname);
	fs.stat(pathname,function(err,stats){
		if (err){
			resp.writeHead(404);
			resp.write("Bad request 404\n");
			resp.end();
		}
		else if (stats.isFile()){
			var type = mime.lookup(pathname);
			console.log("Static file type "+ type );
			resp.setHeader('Content-Type',type);
			resp.statusCode = 200;
			var file = fs.createReadStream(pathname);
			file.on("error",function(err){
				console.log("file error " + err);
			});
			file.on("open",function(){	
				file.pipe(resp);	
			});
		}
		else {
			resp.writeHead(403);
			resp.write("Directory access is forbidden");
			resp.end();
		}
			
	});
	
	
}

exports.start = start;
exports.upload = upload;
exports.defaultPage = _default;
exports.show = show;
exports.staticResource = staticResource;
exports.upload = upload;


