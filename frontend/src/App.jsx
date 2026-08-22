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
import keycloak from "./services/keycloak"; // Import Keycloak for the smart redirect

// --- SMART GATEWAY ---
// This checks the user's roles and drops them into their correct workspace automatically
const RootRedirect = () => {
  if (keycloak.hasRealmRole("admin")) return <Navigate to="/admin" replace />;
  if (keycloak.hasRealmRole("doctor")) return <Navigate to="/doctor" replace />;
  if (keycloak.hasRealmRole("receptionist"))
    return <Navigate to="/receptionist" replace />;

  // Safety net: If a user logs in but has zero roles assigned in Keycloak
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-50">
      <div className="rounded-lg bg-white p-8 shadow-lg text-center max-w-md">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100 mb-4">
          <svg
            className="h-6 w-6 text-yellow-600"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          No Workspace Assigned
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Your account has been authenticated, but you do not have a designated
          role (Admin, Doctor, or Receptionist) assigned yet.
        </p>
        <button
          onClick={() => keycloak.logout()}
          className="w-full rounded-md bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700"
        >
          Sign out
        </button>
      </div>
    </div>
  );
};

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

        {/* Smart Gateway Catch-alls */}
        <Route path="/" element={<RootRedirect />} />
        <Route path="*" element={<RootRedirect />} />
      </Routes>
    </BrowserRouter>
  );
}
