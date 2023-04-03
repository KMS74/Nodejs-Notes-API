// setup server
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const noteRoute = require("./routes/noteRoute");

const app = express();
const PORT = 3000;

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/v1", noteRoute);

app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});
