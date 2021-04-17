const fs = require('fs'),
    request = require('request');

const downloadImage = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
      uri = encodeURI(uri);
    // console.log('content-type:', res.headers['content-type']);
    // console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};


// download('https://www.google.com/images/srpr/logo3w.png', 'google.png', function(){
//   console.log('done');
// });

module.exports = {
    downloadImage
}