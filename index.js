const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const path = require("path");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DBConnection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

app.get("/api/test", () => {
  console.log("test is successfull");
});

app.use(cors({ origin: ["https://clothingshop-ds.herokuapp.com"] }));
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);

app.use(express.static(path.join(__dirname, "/client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build", "index.html"));
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running!");
});
