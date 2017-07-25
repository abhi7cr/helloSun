var express = require('express'),
    path = require('path'),
    fs = require('fs'),
    https = require('https'),
    http = require('http');

var app = express();
var staticRoot = __dirname + '/dist';
//app.set('port', (process.env.PORT || 1234));
app.use(express.static(staticRoot));
app.use(express.static(__dirname+'/node_modules'));
app.use(function(req, res, next){
    // if the request is not html then move along
    var accept = req.accepts('html', 'json', 'xml');
    if(accept !== 'html'){
        return next();
    }

    // if the request has a '.' assume that it's for a file, move along
    var ext = path.extname(req.path);
    if (ext !== ''){
        return next();
    }
    fs.createReadStream(staticRoot + '/index.html').pipe(res);
});


var options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('appcert.pem')
};

https.createServer(options, app).listen(443);
http.createServer(app).listen(1234);

// app.listen(app.get('port'), function() {
//     console.log('app running on port', app.get('port'));
// });
