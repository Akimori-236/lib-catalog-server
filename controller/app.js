const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dummyData = require("../json/YMHPage1.json");
const mongodb = require("../services/mongodb.js");

const app = express();
const corsOptions = {
    origin:  ["http://localhost:5173", "http://localhost:8081", "http://localhost:8082"],
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

//middlewares and endpoints...
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(urlencodedParser); //attach body-parser middleware
app.use(bodyParser.json()); //parse json data

// GET test
app.get("/serverhealth", (req, resp) => {
    resp.status(200).json({ isRunning: true });
});

app.get("/dbhealth", (req, resp) => {
    mongodb.test((err) => {
        if (err) {
            resp.status(500).json({ error: "Internal Server Error" });
        } else {
            resp.status(200).json({ message: "ok" });
        }
    });
});

app.get("/api/dummy", (req, resp) => {
    resp.status(200).json(dummyData);
});

// GET yamaha data
app.get("/api/", (req, resp) => {
    var limit = req.query.limit;
    var offset = req.query.offset;
    mongodb.getLimited(limit, offset, (err, results) => {
        if (err) {
            resp.status(500).json({ error: "Internal Server Error" });
        } else {
            resp.status(200).json(results);
        }
    });
});

module.exports = app;
