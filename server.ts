const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dummyData = require("./json/YMHPage1.json");

const host = "localhost";
const port = 8080;
const app = express();
const corsOptions = {
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

//middlewares and endpoints...
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(urlencodedParser); //attach body-parser middleware
app.use(bodyParser.json()); //parse json data

// GET ALL data
app.get("/", (req, resp) => {
    resp.status(200);
    resp.type("json");
    resp.send(dummyData);
});

app.listen(port, host, () => {
    console.log(`Server hosted at http://${host}:${port} `);
});
