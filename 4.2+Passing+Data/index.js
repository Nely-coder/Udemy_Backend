import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  let command = "<h1>Write your name here: </h1>"
  res.render("index.ejs", {response: command});
});

app.post("/submit", (req, res) => {
  let nameLength = req.body.fName.length + req.body.lName.length;
  let command = `<h1>There are ${nameLength} letters in your name!</h1>`;

  res.render("index.ejs", {response: command})
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
