var http = require('http');

var handlers = [];

handlers['/'] = function(request, response) {
  response.write('Great to have you here!'); //write a response to the client
  response.end(); //end the response
}

handlers['/answers'] = function(request, response) {
  response.write('Return some answers please!'); //write a response to the client
  response.end(); //end the response
}

handlers['/about'] = function(request, response) {
  response.write('Explain the request handlers cycle!'); //write a response to the client
  response.end(); //end the response
}

//create a server object:
http.createServer(function (request, response) {
  if (handlers[request.url]) {
    handlers[request.url](request, response);
  } else {
    response.write('Hello we dont know! ' + request.url + ' is not known ...'); //write a response to the client
    response.end(); //end the response
  }
}).listen(8080); //the server object listens on port 8080