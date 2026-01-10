import express from "express";
import "dotenv/config";
import connectDB from "./database/db.js";
import userRoute from "./routes/userRoutes.js";
import productRoute from "./routes/productRoute.js";
import cartRoute from "./routes/cartRoute.js";
import orderRoute from "./routes/orderRoute.js";
import cors from "cors";

const app = express();

const PORT = process.env.PORT || 3000;

// middleware
app.use(express.json());
app.use(
  cors({
    // origin: "http://localhost:5173",
    origin:"https://i-cart-olive.vercel.app",
    credentials: true,
  })
);

app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/cart", cartRoute);
app.use("/api/v1/orders", orderRoute);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is listening on port ${PORT}`);
});
