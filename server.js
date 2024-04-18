const express = require("express");
const bodyParser = require("body-parser");
const host = "localhost";
const port = 8080;

const app = express();

var dummyData = [
    {
        userID: 1,
        name: "John",
        email: "john@gmail.com",
        age: "20",
        password: "abc123",
    },
];

//middlewares and endpoints...
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(urlencodedParser); //attach body-parser middleware
app.use(bodyParser.json()); //parse json data

// GET ALL users
app.get("/", (req, resp) => {
    resp.status(200);
    resp.type("json");
    resp.send(dummyData);
});

// GET user by ID
app.get("/user/:id", (req, resp) => {
    //retrieve request param
    var id = req.params.id;
    console.info(`Searching for user #${id}`);

    var found = false;
    var foundUser = "";
    for (var i = 0; i < dummyData.length; i++) {
        var jsonUser = dummyData[i];
        if (jsonUser.userID == id) {
            found = true;
            foundUser = jsonUser;
            break;
        }
    }

    //return the response
    if (found) {
        resp.status(200);
        resp.type("json");
        resp.send(foundUser);
    } else {
        resp.status(404);
        resp.type("json");
        resp.send(`{"Message":"User not found"}`);
    }
});

// POST new user
app.post("/user", (req, resp) => {
        //retrieve req data
        var name = req.body.name;
        var email = req.body.email;
        var age = req.body.age;
        var password = req.body.password;

        var maxID = dummyData[dummyData.length - 1].userID;
        var newID = maxID + 1;
        // construct user
        var userJSON = {
            userID: newID,
            name: name,
            email: email,
            age: age,
            password: password,
        };
        // add user to list
        dummyData.push(userJSON);

        //generate response
        resp.status(201);
        resp.send("Success");
});

app.listen(port, host, () => {
    console.log(`Server hosted at http://${host}:${port} `);
});
