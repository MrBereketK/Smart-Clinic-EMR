import { Navigate } from "react-router-dom";
import keycloak from "../services/keycloak";

export default function ProtectedRoute({ children, allowedRole }) {
  // 1. If the user somehow bypassed the main.jsx check, force a login
  if (!keycloak.authenticated) {
    keycloak.login();
    return null;
  }

  // 2. Check if the user's token contains the specific role required for this route
  // Note: keycloak.hasRealmRole() checks the roles array inside the JWT
  const hasRole = keycloak.hasRealmRole(allowedRole);

  if (!hasRole) {
    // 3. If they don't have the role, render a hard "Access Denied" screen
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-50">
        <div className="rounded-lg bg-white p-8 shadow-lg text-center max-w-md">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 mb-4">
            <svg
              className="h-6 w-6 text-red-600"
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
            Zero-Trust Enforcement
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Your current role does not have authorization to access the{" "}
            <span className="font-semibold text-gray-800">{allowedRole}</span>{" "}
            workspace.
          </p>
          <button
            onClick={() => keycloak.logout()}
            className="w-full rounded-md bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700"
          >
            Sign out and switch accounts
          </button>
        </div>
      </div>
    );
  }

  // 4. If they pass the check, render the actual dashboard
  return children;
}
