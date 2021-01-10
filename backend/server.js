import express from "express";
import data from "./data.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./routers/userRouter.js";
dotenv.config();

const app = express();
mongoose.connect("mongodb://localhost/amazona", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.use("/api/users", userRouter);
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

app.get("/api/products", (req, res) => {
  res.send(data.products);
});

app.get("/api/products/:id", (req, res) => {
  const product = data.products.find((x) => x._id === req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
});

app.get("/", (req, res) => {
  res.send("Server is ready");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`process.env.PORT: ${process.env.PORT}`);
  console.log(`Serve at http://localhost:${PORT}`);
});
