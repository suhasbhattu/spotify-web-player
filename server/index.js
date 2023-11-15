const express = require("express");
const cors = require("cors");
const auth = require("./auth");
const user = require("./user");

const app = express();
const port = 5000;

app.use(cors());
app.use("/auth", auth);
app.use("/user", user);

app.get("/", (req, res) => {
  res.send("<h1>Welcome to Spotify Web Player !!</h1>");
});

app.listen(port, () => {
  console.log(
    `Spotify web player app is listening on port ${port}. Press Ctrl-C to terminate...`
  );
});
