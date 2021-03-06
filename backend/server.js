import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import userRouter from "./routers/userRouter.js";
import productRouter from "./routers/productRouter.js";
import orderRouter from "./routers/orderRouter.js";
import uploadRouter from "./routers/uploadRouter.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/amazona", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.use("/api/uploads", uploadRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});
app.get("/api/config/google", (req, res) => {
  res.send(process.env.GOOGLE_API_KEY || "");
});

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
  const x = 0;
  if (x === 1) {
    next();
  }
});

app.use(express.static(path.join(__dirname, "../frontend/build")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  // production
  app.get("*", (req, res) => {
    console.log("production");
    res.sendFile(path.join(__dirname, "..", "/frontend/build/index.html"));
  });
}
// build mode
app.get("*", (req, res) => {
  console.log("build");
  res.sendFile(path.join(__dirname, "..", "/frontend/build/index.html"));
});

app.get("/", (req, res) => {
  res.send("Server is ready");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`process.env.PORT: ${process.env.PORT}`);
  console.log(`Serve at http://localhost:${PORT}`);
});
