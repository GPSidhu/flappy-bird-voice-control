const http = require('http')
const fs = require('fs')
const port = 3002;
const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.writeHead(200, { 'content-type': 'text/html' })
        fs.createReadStream('index.html').pipe(res)
        res.end()
    }  
    else if (req.url === '/index.js') {
        res.writeHead(200, { 'content-type': 'text/javascript' })
        fs.createReadStream('index.js').pipe(res)
        res.end()
    } else if (req.url === './worker.js') {
        res.writeHead(200, { 'content-type': 'text/javascript' })
        fs.createReadStream('worker.js').pipe(res)
        res.end()
    }
});
server.listen(port);

console.log(`Listening on ${port}...`);