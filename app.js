const express = require('express');
const https = require('https');
const bodyParser = require("body-parser");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));


app.get("/", function(req, res) {
  res.sendFile(__dirname + "/html.html")
});

app.post("/", function(req, res) {
  const cityName = req.body.CityName;
  const unit = "metric";
  const key = "appid";
  // https url api of another server
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&" + key + "=90b8349438f02c354b9e1b4858813326&units=" + unit;
  https.get(url, function(response) {
    // response of gained data from another server
    response.on("data", function(data) {
      // changing the data format into json format
      const wether = JSON.parse(data);
      const temp = wether.main.temp;

      //console.log(temp+"temp");
      const description = wether.weather[0].description;

      //console.log(description);
      const icons = wether.weather[0].icon;
      const imageurl = "http://openweathermap.org/img/wn/" + icons + "@2x.png"

      // country name from the json.parse()
      const country = wether.name;
      // printing the information about Temperature
      res.write("<h1>The Temperature of " + country + " is " + temp + " degree celsius.</h1>");
      res.write("<img src=" + imageurl + "><br><u>fig(i)</u>");
      res.write("<p>The Description of Temperature in fig(i) <u>" + description + "</u>.</p>");
      res.send();
    });
    // status of the api code
    console.log(response.statusCode);
  });
});


app.listen(5000, function() {
  console.log("Your server is connected to port 5000.");
});
