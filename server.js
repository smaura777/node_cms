var http = require("http");
var url = require("url");
function start(){
http.createServer(function(req,resp){
    //console.log(req.headers); 
    var pathname = url.parse(req.url).pathname;
    console.log("Request for "+pathname+" received");
	resp.writeHead(200,{"Content-Type":"text/html"});
	resp.write("<!DOCTYPE html><html><head><title>Node</title></head>"+
	"<body><div style='width:500px;margin:50px auto 0 auto; background-color:#fff;outline:1px solid #000; ' >");
	resp.write("<div><p>Hello Node.js World</p></div>");
	resp.write("<div><p>Received request from "+req.headers['user-agent']+"</p></div>");
	resp.write("</div></body></html>");
	resp.end();
}).listen(8084,function(){
console.log("Connection receive for note service ");
});

}

exports.start =  start;

 