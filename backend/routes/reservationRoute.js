import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
  createReservation,
  getMyReservations,
  cancelReservation,
} from "../controllers/reservationController.js";

const reservationRouter = express.Router();

// all reservation routes require login
reservationRouter.post("/", authMiddleware, createReservation);
reservationRouter.get("/my", authMiddleware, getMyReservations);
reservationRouter.patch("/:id/cancel", authMiddleware, cancelReservation);

export default reservationRouter;
