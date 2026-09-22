import cors from "cors";
import express from "express";
import "dotenv/config";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoute.js";

import path from "path";
import { fileURLToPath } from "url";
import itemRouter from "./routes/itemsRoute.js";
import reservationRouter from "./routes/reservationRoute.js";

const app = express();
const port = process.env.PORT || 4000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// middleware
app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigin = ["http://localhost:5173", "http://localhost:5174"];
      if (!origin || allowedOrigin.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// route
app.use("/api/user", userRouter);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/items", itemRouter);
app.use("/api/reservations", reservationRouter);

app.get("/", (req, res) => {
  res.send("API WORKING");
});

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server started on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("DB connection failed:", err.message);
    process.exit(1);
  });
