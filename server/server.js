import express from "express";
import cors from "cors";
import { db } from "./db.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ message: "Welcome to the Guestbook!" });
});

app.get("/messages", (req, res) => {
  const result = db.query("SELECT * FROM messages");
  res.send(result.rows);
});

app.post("/messages", (req, res) => {
  const { name, message } = req.body;

  if (!name || !message) {
    return res.send({ error: "Name and message are required" });
  }

  const result = db.query(
    "INSERT INTO messages (name, message) VALUES ($1, $2) RETURNING *",
    [name, message]
  );

  res.send(result.rows[0]);
});

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
