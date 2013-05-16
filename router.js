function route(handle,pathname,resp,req) {
	if ( typeof handle[pathname] === 'function'){
		console.log("About to route a request for " + pathname);
		handle[pathname](resp,req);
	}
	else {
		console.log("No route for " + pathname);
		resp.writeHead(404,{"Content-Type":"text/plain"});
		resp.write("<H1>404</H1>");
		resp.end();
	}
  
}

exports.route = route;