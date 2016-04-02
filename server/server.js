var restify = require("restify"),
	  fs = require("fs");

var PREZIS_DIR 	= "../data/";
var prezis = new Array();

function readPrezis(){
	console.log("Reading prezis");
	fs.readdir(PREZIS_DIR, function(error, files){
    if (error != null){
      console.log(error);
    }else{
      files.forEach(function(file){
          var extension = file.substring(file.lastIndexOf("."));
          if (extension == ".json") {
            var path = PREZIS_DIR+file;
            var content = fs.readFileSync(path,"utf-8");
            prezis = JSON.parse(content);
          }
      });
    }
  });
}

readPrezis();

var	server = restify.createServer({
    name: "PreziDataProvider",
    version: '1.0.0'
});

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});

server.use(restify.queryParser());

server.pre(function(req, res, next) {
	console.log("REQUEST: "+req.method +" "+req.url);
  	return next();
});

server.on('after', function (request, response, route, error) {
	console.log("RESPONSE: "+response.statusCode);
});

server.get("/prezis",function(req, res, next){
  res.contentType = "application/json";
  res.send(prezis);
  return next();
});
