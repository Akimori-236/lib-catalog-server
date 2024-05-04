const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dummyData = require("../json/YMHPage1.json");
const mongodb = require("../services/mongodb.js");

const app = express();
const corsOptions = {
    origin: [
        "http://localhost:5173",
        "http://localhost:8081",
        "http://localhost:8082",
    ],
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

//middlewares and endpoints...
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(urlencodedParser); //attach body-parser middleware
app.use(bodyParser.json()); //parse json data

// GET test
app.get("/serverhealth", (req, resp) => {
    console.log(req.url);
    resp.status(200).json({ isRunning: true });
});

app.get("/dbhealth", (req, resp) => {
    console.log(req.url);
    mongodb.isUp((isUp) => {
        if (isUp) {
            resp.status(200).json({ isHealthy: isUp });
        } else {
            resp.status(500).json({ isHealthy: isUp });
        }
        console.log(isUp);
    });
});

app.get("/api/dummy", (req, resp) => {
    console.log(req.url);
    let limit = parseInt(req.query.limit);
    let offset = parseInt(req.query.offset);

    if (isNaN(limit) || limit < 1) {
        limit = 10;
    }
    if (isNaN(offset) || offset < 0) {
        offset = 0;
    }
    console.log(limit, offset);
    var slicedData = dummyData.slice(offset, offset + limit);
    resp.status(200).json(slicedData);
});

// GET data
app.get("/api", (req, resp) => {
    console.log(req.url);
    let limit = parseInt(req.query.limit);
    let offset = parseInt(req.query.offset);

    if (isNaN(limit) || limit < 1) {
        limit = 10;
    }
    if (isNaN(offset) || offset < 0) {
        offset = 0;
    }
    console.log(limit, offset);
    mongodb.getLimited(limit, offset, (err, results) => {
        if (err) {
            resp.status(500).json({ error: "Internal Server Error" });
        } else {
            resp.status(200).type("application/json").send(results);
        }
    });
});

app.get("/api/total", (req, resp) => {
    console.log(req.url);
    mongodb.getTotalCount((err, count) => {
        if (err) {
            resp.status(500).json({ error: "Internal Server Error" });
        } else {
            resp.status(200).type("application/json").send({ total: count });
        }
    });
});

module.exports = app;
