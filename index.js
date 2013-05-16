var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var formidable = require('formidable'),
    http = require('http'),
    util = require('util');

/**
http.createServer(function(req, res) {
  if (req.url == '/upload' && req.method.toLowerCase() == 'post') {    
     var form = new formidable.IncomingForm();
      form.uploadDir = '/tmp';
      console.log("Hello there 2 ...");
    
    form.parse(req, function(err, fields, files) {
  	  console.log("Hello there 3 ...");		
      res.writeHead(200, {'content-type': 'text/plain'});
      res.write('received upload:\n\n');
      res.write("files +++++  "+ files.upload.size +"\n\n");
      res.end(util.inspect({fields: fields, files: files}));
    });
     console.log("Hello there 4 ...");		
    return;
  }

  // show a file upload form
  res.writeHead(200, {'content-type': 'text/html'});
  res.end(
    '<form action="/upload" enctype="multipart/form-data" method="post">'+
    '<input type="text" name="title"><br>'+
    '<input type="file" name="upload" multiple="multiple"><br>'+
    '<input type="submit" value="Upload">'+
    '</form>'
  );
}).listen(8080);

**/



var handle = {};
handle["/"] = requestHandlers.defaultPage;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/show"] = requestHandlers.show;

server.start(router.route,handle);

