require("dotenv").config();
const app = require("./controller/app");
const host = "0.0.0.0";
const port = 8080;

app.listen(port, host, () => {
    console.log(`Server hosted at http://${host}:${port} `);
});
