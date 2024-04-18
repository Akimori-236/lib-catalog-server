const http = require("http");
const hostname = "localhost";
const port = 3000;

const server = http.createServer((req, res) => {
    const method = req.method;
    const url = req.url;

    console.log(`${method} ${url}`)

    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.end("<html><body>Welcome to Node JS!</body></html>");
});

server.listen(port, hostname, () => {
    console.log(
        `Server started and accessible via http://${hostname}:${port}/`
    );
});
