import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./components/DashboardLayout";
import Login from "./pages/Login";
import ComingSoon from "./pages/ComingSoon";
import ReceptionistDashboard from "./pages/receptionist/Dashboard";
import DoctorDashboard from "./pages/doctor/Dashboard";
import AdminDashboard from "./pages/admin/Dashboard";
import {
  receptionistLinks,
  doctorLinks,
  adminLinks,
} from "./config/navigation";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          element={
            <DashboardLayout role="receptionist" title="Receptionist" links={receptionistLinks} />
          }
        >
          <Route path="/receptionist" element={<ReceptionistDashboard />} />
          <Route path="/receptionist/patients" element={<ComingSoon title="Patients" />} />
          <Route path="/receptionist/appointments" element={<ComingSoon title="Appointments" />} />
          <Route path="/receptionist/settings" element={<ComingSoon title="Settings" />} />
        </Route>

        <Route
          element={<DashboardLayout role="doctor" title="Doctor" links={doctorLinks} />}
        >
          <Route path="/doctor" element={<DoctorDashboard />} />
          <Route path="/doctor/patients" element={<ComingSoon title="Patients" />} />
          <Route path="/doctor/appointments" element={<ComingSoon title="Appointments" />} />
          <Route path="/doctor/settings" element={<ComingSoon title="Settings" />} />
        </Route>

        <Route element={<DashboardLayout role="admin" title="Admin" links={adminLinks} />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/patients" element={<ComingSoon title="Patients" />} />
          <Route path="/admin/appointments" element={<ComingSoon title="Appointments" />} />
          <Route path="/admin/settings" element={<ComingSoon title="Settings" />} />
        </Route>

        <Route path="/" element={<Navigate to="/receptionist" replace />} />
        <Route path="*" element={<Navigate to="/receptionist" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
