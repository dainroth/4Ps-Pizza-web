import reservationModal from "../modals/reservationModal.js";

// 1. Create a reservation (logged-in user only)
export const createReservation = async (req, res) => {
  try {
    const { venue, guests, date, time, serviceType } = req.body;

    if (!venue || !guests || !date || !time || !serviceType) {
      return res.status(400).json({
        success: false,
        message: "Please fill in venue, guests, date, time, and service type.",
      });
    }

    const reservation = await reservationModal.create({
      user: req.user._id,
      venue,
      guests,
      date,
      time,
      serviceType,
    });

    return res.status(201).json({ success: true, reservation });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

// 2. Get the logged-in user's own reservations
export const getMyReservations = async (req, res) => {
  try {
    const reservations = await reservationModal
      .find({ user: req.user._id })
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, reservations });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// 3. Cancel a reservation (only if it belongs to the logged-in user)
export const cancelReservation = async (req, res) => {
  try {
    const { id } = req.params;

    const reservation = await reservationModal.findOne({
      _id: id,
      user: req.user._id,
    });

    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: "Reservation not found.",
      });
    }

    reservation.status = "cancelled";
    await reservation.save();

    return res.status(200).json({ success: true, reservation });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};
