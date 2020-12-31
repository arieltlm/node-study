// web服务

// ajax-->api -->web server(nodejs)

const http = require('http');

const server = http.createServer((req, res) => {
    res.end('hello world!');
})

server.listen(3000,'127.0.0.1',() => {
    console.log('服务启动成功')
})