const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const route = require("./routes/route");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));

app.use(route);

app.listen(3000, err => {
    err ? console.log("Error in app listen"):  console.log("Server is running...");
})