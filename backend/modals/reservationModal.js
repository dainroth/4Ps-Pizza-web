import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    venue: {
      type: String,
      required: true,
      trim: true,
    },
    guests: {
      type: Number,
      required: true,
      min: 1,
    },
    date: {
      type: String, // e.g. "2026-09-21"
      required: true,
    },
    time: {
      type: String, // e.g. "19:30"
      required: true,
    },
    serviceType: {
      type: String,
      enum: ["Inside", "Outside", "Pizza Counter", "Semi-Private"],
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true },
);

const reservationModal =
  mongoose.models.reservation ||
  mongoose.model("reservation", reservationSchema);

export default reservationModal;
