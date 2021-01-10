import express from "express";
import data from "./data.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.get("/api/products", (req, res) => {
  res.send(data.products);
});

app.get("/", (req, res) => {
  res.send("Server is ready");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`process.env.PORT: ${process.env.PORT}`);
  console.log(`Serve at http://localhost:${PORT}`);
});
