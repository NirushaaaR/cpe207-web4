const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 5500;

const server = http.createServer( (req, res) => {

    let getfile = "";
    switch (req.url){
        case '/':
            getfile = 'index.html';
            break;
        case '/contact':
            getfile = 'contact.html';
            break;
        case '/gallery':
            getfile = 'gallery.html';
            break;
        default:
            getfile = req.url;
    }

    let filepath = path.join(
        __dirname,
        'public',
        getfile
    );

    let extname = path.extname(filepath);

  // initial content type
  let contentType = 'text/html';
  switch (extname) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.json':
      contentType = 'application/json';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.jpg':
      contentType = 'image/jpg';
      break;
  }

    fs.readFile(filepath, (err,content) => {
        if(err){
            // manage error
            if (err.code == 'ENOENT') {  // Page not found
                fs.readFile(path.join(__dirname, 'public', '404.html'), 
                (err, content) => {
                  res.writeHead(200, { 'Content-Type': 'text/html' });
                  res.end(content, 'utf8');
                })
              } else {
                // Some server errors: 500
                res.writeHead(500);
                res.end('Server error: ' + err.code);
              }
        }else{
            // Success request
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf8');
        }
    });

});

server.listen(PORT, () => {
    console.log('Server is running on port ', PORT);
});