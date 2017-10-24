
const http= require('http');
const fs = require('fs');
const path= require('path');


const hostname = 'localhost';
const port = 3000;

const server=http.createServer((req , res) => {
    console.log('Request for '+ req.url + ' by method '+ req.method);

    if(req.method=='GET'){
        var fileURL;
        if(req.url == '/') fileURL = '/index.html';
        else fileURL = req.url;

        var filePath= path.resolve('./public'+fileURL)
        const fileExt =path.extname(filePath);
        if(fileExt == '.html'){
            fs.exists(filePath, (exists) =>{
                if(!exists){
                 res.setStatusCode=404;
                 res.setHeader('content-Type', 'text/html');
                 res.end('<html><body><h1>Error 404: '+fileURL +' not found</h1></body></html>');
                 return;
            }
            res.statusCode =200;
            res.setHeader('content-Type', 'text/html');
            // reads the file from the path converts into byte stream and
            // pipes into response object
            fs.createReadStream(filePath).pipe(res);
            });
        }
        else{
            res.setStatusCode=404;
            res.setHeader('content-Type', 'text/html');
            res.end('<html><body><h1>Error 404: '+fileURL +' not an HTML file</h1></body></html>');

        }
    }else{
        res.setStatusCode=404;
        res.setHeader('content-Type', 'text/html');
        res.end('<html><body><h1>Error 404: '+req.method +' not supported</h1></body></html>');

    }

})

server.listen(port , hostname,() => {
    console.log(`server is running at http://${hostname}:${port}`)

});
