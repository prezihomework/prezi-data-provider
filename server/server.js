var restify = require("restify"),
	  fs = require("fs");

var PREZIS_DIR 	= "../data/";
var prezis = new Array();

//--------------------------------------------
//  INITIALIZATION 
//--------------------------------------------

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

function initialize(){
  readPrezis();
};

initialize();

var	server = restify.createServer({
    name: "PreziDataProvider",
    version: '1.0.0'
});

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});

server.use(restify.queryParser());

//--------------------------------------------
//  COMMON API 
//--------------------------------------------

server.pre(function(req, res, next) {
	console.log("REQUEST: "+req.method +" "+req.url);
  	return next();
});

server.on('after', function (request, response, route, error) {
	console.log("RESPONSE: "+response.statusCode);
});

//--------------------------------------------
//  PREZIS APIs
//--------------------------------------------

// return list of prezis
// can be filtered by title parameter 
server.get("/prezis",function(req, res, next){
  res.contentType = "application/json";

  if(req.params.title === undefined){
    res.send(prezis);
  } else {
    result = findPreziByTitle(prezis, req.params.title);
    res.send(result);
  }

  return next();
});

// return prezis sorted by the date of creation
server.get("/prezis/sortByDate",function(req, res, next){
  res.contentType = "application/json";
  res.send(sortPreziByDate(prezis));
  return next();
});

//--------------------------------------------
//  HELPER METHODS
//--------------------------------------------

function findPreziByTitle(arr, title) {
    var out = new Array();
    var i;

    for(i = 0; i < arr.length; i++) {
        if(arr[i]["title"] == title){
          out.push(arr[i]);
        }
    }

    return out;
}

function sortPreziByDate(prezi_arr) {
    var sorted = prezi_arr.sort(function(a,b) { 
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime() 
    });

    var out = new Array();
    var i;
    for(i = 0; i < sorted.length; i++) {
        out.push(sorted[i]);
    }

    return out;
}
