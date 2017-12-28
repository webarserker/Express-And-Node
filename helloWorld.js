const http = require('http')
const path = require('path')
const fs = require('fs')

var reslove = (__path) => path.join(__dirname, __path)

function serverStaticFile(res, path, contentType, responseCode) {

    if (!responseCode) responseCode = 200

    fs.readFile(path, function (err, data) {
        if (err) {
            res.writeHead(500, {'Context-Type': 'text/plain'})
            res.end('500 -Internal Error')
        } else {
            res.writeHead(responseCode, {'Context-Type': 'text/html'})
            res.end(data)
        }
    })

}

var app = http.createServer(function (req, res) {

    var url = req.url.replace(/\/?(?:\?.*)?$/, '')

    switch (url) {
        case '':
            serverStaticFile(res, reslove('/public/home.html'), 'text/html')
            break
        case '/about':
            serverStaticFile(res, reslove('/public/about.html'), 'text/html')
            break
        default:
            serverStaticFile(res, reslove('/public/404.html'), 'text/html', 404)
            break
    }

})

app.listen(3000)
