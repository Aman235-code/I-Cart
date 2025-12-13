import express from "express";
import "dotenv/config";
import connectDB from "./database/db.js";

const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is listening on port ${PORT}`);
});
