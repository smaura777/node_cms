var exec = require("child_process").exec;
var fs = require("fs");
var util = require('util');
var querystring = require("querystring"),
  formidable = require("formidable"),
  mime = require("mime"),
  im = require('imagemagick'),
  url = require('url');
  
var mongodb = require('mongodb');
var server = new mongodb.Server("127.0.0.1", 27017, {});
var server2 = new mongodb.Server("127.0.0.1", 27017, {});
 
 var connection = new mongodb.Db('test', server, {w:1});
 var connection2 = new mongodb.Db('Notes', server2, {w:1}); 
  
  /**
  var mongoClient = require('mongodb').MongoClient,
   mongoServer = require('mongodb').Server;
  **/

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
	
	
    
     
      connection.open(function (error, client) {
      if (error) throw error;
      var collection = new mongodb.Collection(client, 'Accounts');
      collection.find({}, {limit:10}).toArray(function(err, docs) {
        console.log("Will print results if any "); 
        console.log(" "+ docs.length); 
        console.log("============================================================="); 
        console.dir(docs);
        
        			
        resp.writeHead(200,{"Content-Type":"text/html"});
     	pageHeaderStart(resp);
     	pageInlineCSS(resp);
    	pageHeaderEnd(resp);
     	resp.write("<div class=\"main\">\
       	<div id=\"main_menu\">\
       	  <ul class=\"menu_set\"> <li><span>home</span></li> <li><span>upload</span></li> <li><span>misc</span></li> </ul></div>");
     		
     		resp.write("<table>");
     		docs.forEach(function(el){
     			resp.write("<tr><td>"+el._id+"</td><td>"+el.username+"</td> <td>"+el.email+"</td> <td>"+el.password+"</td></tr>   ");
     		});	
     		
     		resp.write("</table>");
     	
     	      resp.write("<div class=\"comment_form\">\
     			    	<form action=\"/upload\" method=\"POST\" enctype=\"multipart/form-data\">\
     			    		<div><textarea placeholder=\"What\'s up? \" name=\"comment_data\" rows=\"5\" cols=\"60\"></textarea></div>\
     			    		<div><input type=\"file\" name=\"media_asset\" accept=\"image/gif, image/jpeg, image/psd, application/zip, image/tiff, application/pdf, image/png\"></div>\
     			    		<div><input type=\"submit\" value=\"post\"></div>\
     			    	</form>\
     			   </div>\
     		     </div>");  		   
     pageEnd(resp);
     resp.end();
     connection.close();   
        
        
      });
    });
     
     /**
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
     **/
     
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

exports.notes =  function (resp,req){
			 
 connection2.open(function (error, client) {
      if (error) throw error;
      var collection = new mongodb.Collection(client, 'notes_collection');
      collection.find({} ).toArray(function(err, docs) {
        console.log("Will print results if any "); 
        console.log(" "+ docs.length); 
        console.log("============================================================="); 
        console.dir(docs);
        
        			
        resp.writeHead(200,{"Content-Type":"text/html"});
     	pageHeaderStart(resp);
     	pageInlineCSS(resp);
    	pageHeaderEnd(resp);
     	resp.write("<div class=\"main\">\
       	<div id=\"main_menu\">\
       	  <ul class=\"menu_set\"> <li><span>home</span></li> <li><span>upload</span></li> <li><span>misc</span></li> </ul></div>");
     		
     		resp.write("<table>");
     		docs.forEach(function(el){
     			resp.write("<tr><td>"+el._id+"</td><td>"+el.desc+"</td> <td>"+el.category+"</td> <td> <form method=\"post\" action=\"/note/delete\" >\
     			<input type=\"hidden\" name=\"note_id\" value=\""+el._id+"\"><input type=\"submit\" value=\"delete\"> \
     			</form> </td> <td> <span><a href=\"/note/edit?id="+el._id+"\">edit</a></span> </td> </tr>   ");
     		});	
     		
     		resp.write("</table>");
     	    resp.write("<div class=\"add_note\"> <form method=\"post\" action=\"/note/add\" > <div> <input type=\"text\" size=\"100\" name=\"new_note\">  </div> \
     	      <div><input type=\"submit\" value=\"Add note\" ></div> </form>  </div> ");  	
     	      
     	     resp.write("</div>"); 	
     	      	   
            pageEnd(resp);
            resp.end(); 
             connection2.close();     
        });
      
   });
}

exports.add_note =   function (resp,req){
	 
	  if (req.method.toLowerCase() == 'post'){
	    var form = new formidable.IncomingForm();
	    
	     form.parse(req,function(err,fields,files){
	      if (err) {
	      	   console.log("error ......");
	      }
	      else {   
	         console.log( "add notes : " +  util.inspect(fields));
	         if (fields.new_note !== "" ){
	         	console.log("data is posted ....");
	         	
	         	  connection2.open(function (error, client) {
     			    if (error) throw error;
     			    var collection = new mongodb.Collection(client, 'notes_collection');
     			     collection.insert({desc:fields.new_note, category:"online"}, {safe: true}, function(err,objects){
     			       if (err) console.warn(err.message);
     			       connection2.close();
     			        resp.writeHead(301,{"Location":"/notes"});
     			        resp.end();
     			        
     			     } );
     			  });
                   
	         }
	      }
	    
	   });
	 }
	 
	
}

exports.remove_note = function (resp,req){
 		console.log("Delete funct");
 		var objectID = require("mongodb").ObjectID;

	 if (req.method.toLowerCase() == 'post'){
	    var form = new formidable.IncomingForm();
	    
	     form.parse(req,function(err,fields,files){
	      if (err) {
	      	   console.log("error ......");
	      }
	      else {   
	         console.log( "remove notes : " +  util.inspect(fields));
	         if (fields.note_id !== "" ){
	             console.log("Delete funct 2 ");
	         	
	         	  connection2.open(function (error, client) {
     			    if (error) throw error;
     			    var collection = new mongodb.Collection(client, 'notes_collection');
     			     collection.remove({_id:objectID(fields.note_id)}, function(err,objects){
     			       if (err) console.warn(err.message);
     			       connection2.close();
     			        resp.writeHead(301,{"Location":"/notes"});
     			        resp.end();
     			     } );
     			  });
                   
	         }
	      }
	    
	   });
	 }
	 
}


exports.edit_note = function(resp,req) {
	var objectID = require("mongodb").ObjectID;

	  //console.log("Request to edit : " + util.inspect(req));
	   console.log("Request to edit : " + util.inspect(url.parse(req.url))  );
	   
	
	  var req_id = '';
	  
	   
	   if (url.parse(req.url).query){
	        console.log("Fine query... ");
	   		if (url.parse(req.url).query.split("=").length > 1){
	   		      console.log("Fine query... > 1 "); 
	   		      console.log("ID == " + url.parse(req.url).query.split("=")[1] ); 
	   		    req_id = url.parse(req.url).query.split("=")[1];	
	   		}
	   		else {
	   		   console.log("Missing request parameter in  : " + req.url ); 
	   		   resp.end(); 
	   	       return ;
	   		}
	   }
	   else {
	         console.log("Bad request - missing query   : " + req.url ); 
	       resp.end(); 
	   	   return ;
	   }
	   
	
	  if (req_id) {
	      console.log("REQ+ID = TRUE "); 
	  	connection2.open(function (error, client) {
      		if (error) throw error;
      		var collection = new mongodb.Collection(client, 'notes_collection');
        	collection.find({_id: objectID(req_id)} ).toArray(function(err, docs) {
        		console.dir(docs);
        		resp.writeHead(200,{"Content-Type":"text/html"});
     			pageHeaderStart(resp);
     			pageInlineCSS(resp);
    			pageHeaderEnd(resp);
     			resp.write("<div class=\"main\">\
       			<div id=\"main_menu\">\
       	  		<ul class=\"menu_set\"> <li><span>home</span></li> <li><span>upload</span></li> <li><span>misc</span></li> </ul></div>");
     		
     			
     			docs.forEach(function(el){
     				resp.write("<div><form method=\"post\" action=\"/note/update\" >\
     				<input type=\"hidden\" name=\"note_id\" value=\""+el._id+"\">\
     				<div>\
     					<input type=\"text\" name=\"note_desc\" value=\""+el.desc+"\">\
     				</div>\
     				<div>\
     					<input type=\"text\" name=\"note_category\" value=\""+el.category+"\">\
     				</div>\
     				<input type=\"submit\" value=\"update\">\
     				</form></div>");
     			});	
     		
     		
     	    	
  
            resp.write("</div>"); 	
     	      	   
            pageEnd(resp);
            resp.end(); 
             connection2.close();     
        });
      
     });

    }
    else {
    	resp.end();
    	return;
    }
 
}


exports.update_note = function (resp,req){
	  var objectID = require("mongodb").ObjectID;
	   if (req.method.toLowerCase() == 'post'){
	    var form = new formidable.IncomingForm();
	    
	     form.parse(req,function(err,fields,files){
	      if (err) {
	      	   console.log("error ......");
	      	   resp.end(); 
	      }
	      else {   
	         console.log( "update notes : " +  util.inspect(fields));
	         if ( (fields.note_id !== "") && (fields.note_desc !== "") && (fields.note_category !== "") ){
	         	console.log("data is posted ....");
	         	
	         	  connection2.open(function (error, client) {
     			    if (error) throw error;
     			     var collection = new mongodb.Collection(client, 'notes_collection');
     			     collection.update( {_id: objectID(fields.note_id)}, {$set: {desc:fields.note_desc, category:fields.note_category}}, {safe: true}, function(err){
     			       if (err) console.warn(err.message);
     			       connection2.close();
     			       resp.writeHead(301,{"Location":"/notes"});
     			       resp.end();
     			        
     			      });
     			  });
                   
	         }
	         else {
	         	console.log("Missing fields");
	         	resp.end();
	         }
	      }
	    
	   });
	 }

}


exports.start = start;
exports.upload = upload;
exports.defaultPage = _default;
exports.show = show;
exports.staticResource = staticResource;
exports.upload = upload;


