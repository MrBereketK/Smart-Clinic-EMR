import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./components/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute"; // Import our bouncer
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

        {/* 1. Receptionist Workspace (Guarded) */}
        <Route
          element={
            <ProtectedRoute allowedRole="receptionist">
              <DashboardLayout
                role="receptionist"
                title="Receptionist"
                links={receptionistLinks}
              />
            </ProtectedRoute>
          }
        >
          <Route path="/receptionist" element={<ReceptionistDashboard />} />
          <Route
            path="/receptionist/patients"
            element={<ComingSoon title="Patients" />}
          />
          <Route
            path="/receptionist/appointments"
            element={<ComingSoon title="Appointments" />}
          />
          <Route
            path="/receptionist/settings"
            element={<ComingSoon title="Settings" />}
          />
        </Route>

        {/* 2. Doctor Workspace (Guarded) */}
        <Route
          element={
            <ProtectedRoute allowedRole="doctor">
              <DashboardLayout
                role="doctor"
                title="Doctor"
                links={doctorLinks}
              />
            </ProtectedRoute>
          }
        >
          <Route path="/doctor" element={<DoctorDashboard />} />
          <Route
            path="/doctor/patients"
            element={<ComingSoon title="Patients" />}
          />
          <Route
            path="/doctor/appointments"
            element={<ComingSoon title="Appointments" />}
          />
          <Route
            path="/doctor/settings"
            element={<ComingSoon title="Settings" />}
          />
        </Route>

        {/* 3. Admin Workspace (Guarded) */}
        <Route
          element={
            <ProtectedRoute allowedRole="admin">
              <DashboardLayout role="admin" title="Admin" links={adminLinks} />
            </ProtectedRoute>
          }
        >
          <Route path="/admin" element={<AdminDashboard />} />
          <Route
            path="/admin/patients"
            element={<ComingSoon title="Patients" />}
          />
          <Route
            path="/admin/appointments"
            element={<ComingSoon title="Appointments" />}
          />
          <Route
            path="/admin/settings"
            element={<ComingSoon title="Settings" />}
          />
        </Route>

        <Route path="/" element={<Navigate to="/receptionist" replace />} />
        <Route path="*" element={<Navigate to="/receptionist" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
