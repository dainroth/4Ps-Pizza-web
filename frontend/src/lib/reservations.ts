import api from "./api";

export interface ReservationPayload {
  venue: string;
  guests: number;
  date: string;
  time: string;
  serviceType: string;
}

export interface Reservation {
  _id: string;
  venue: string;
  guests: number;
  date: string;
  time: string;
  serviceType: string;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: string;
}

export interface ReservationResponse {
  success: boolean;
  reservation?: Reservation;
  message?: string;
}

export interface ReservationListResponse {
  success: boolean;
  reservations?: Reservation[];
  message?: string;
}

export async function createReservation(
  payload: ReservationPayload,
): Promise<ReservationResponse> {
  const res = await api.post<ReservationResponse>("/reservations", payload);
  return res.data;
}

export async function getMyReservations(): Promise<ReservationListResponse> {
  const res = await api.get<ReservationListResponse>("/reservations/my");
  return res.data;
}

export async function cancelReservation(
  id: string,
): Promise<ReservationResponse> {
  const res = await api.patch<ReservationResponse>(
    `/reservations/${id}/cancel`,
  );
  return res.data;
}
