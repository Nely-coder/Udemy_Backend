import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;
env.config();

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let items = [
  // { id: 1, title: "Buy milk" },
  // { id: 2, title: "Finish homework" },
];

db.query("SELECT * FROM items", (err, res) => {
  if (err) {
    console.log("Error executing query", err.stack);
  } else {
    items = res.rows;
  }
  db.end();
});

app.get("/", (req, res) => {
  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  });
});

app.post("/add", (req, res) => {
  const item = req.body.newItem;
  items.push({ title: item });
  res.redirect("/");
});

app.post("/edit", async (req, res) => {
  const updatedId = req.body["updatedItemId"];
  const updatedItem = req.body["updatedItemTitle"];

  await db.query("UPDATE items SET title = $1 WHERE id = $2", [
    updatedItem,
    updatedId,
  ]);
  res.redirect("/");
});

app.post("/delete", (req, res) => {});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
