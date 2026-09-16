import cors from "cors";
import express from "express";
import "dotenv/config";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoute.js";
const app = express();
const port = process.env.PORT || 4000;

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

// connect db
connectDB();

// route
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send("API WORKING");
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
