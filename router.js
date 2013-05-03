function route(handle,pathname) {
	if ( typeof handle[pathname] === 'function'){
		console.log("About to route a request for " + pathname);
		handle[pathname]();
	}
	else {
		console.log("No route for " + pathname);
	}
  
}

exports.route = route;