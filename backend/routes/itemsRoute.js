import express from "express";
import fs from "fs";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import {
  createItems,
  deleteItems,
  getItems,
} from "../controllers/itemsController.js";

const itemRouter = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, "../uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

itemRouter.post("/", upload.single("image"), createItems);
itemRouter.get("/", getItems);
itemRouter.delete("/:id", deleteItems);

export default itemRouter;
