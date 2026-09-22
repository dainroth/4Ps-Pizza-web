import { Route, Routes } from "react-router-dom";
import SiteLayout from "./layout/sitLayout";
import Home from "./pages/home";
import Vision from "./pages/version";
import Menu from "./pages/menu";
import Visit from "./pages/visit";
import Reserve from "./pages/reserve";
import Login from "./pages/login";
import Signup from "./pages/signUp";
import { AuthProvider } from "./context/authContext";
import ProtectedRoute from "./components/protectedRoute";
import MyReservations from "./pages/myReservations";
import NotFound from "./pages/not-found";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/vision" element={<Vision />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/visit" element={<Visit />} />
          <Route
            path="/reserve"
            element={
              <ProtectedRoute>
                <Reserve />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-reservations"
            element={
              <ProtectedRoute>
                <MyReservations />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
