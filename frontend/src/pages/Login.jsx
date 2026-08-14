import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    window.alert(`Mock login submitted for ${email}`);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-sky-50 via-white to-primary-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl shadow-sky-100 ring-1 ring-slate-200">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 to-primary-700 text-lg font-bold text-white shadow-lg shadow-primary-600/30">
            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">codeAfar Smart Clinic</h1>
          <p className="mt-1 text-sm text-slate-500">Sign in to your workspace</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@clinic.com"
              className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••"
              className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-primary-600 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
          >
            Sign in
          </button>
        </form>

        <div className="mt-6 rounded-xl bg-sky-50/70 p-4 text-xs text-slate-500 ring-1 ring-sky-100">
          <p className="mb-2 font-semibold text-slate-600">Demo workspaces</p>
          <p className="space-y-1">
            <span className="mr-2">Receptionist</span>
            <Link to="/receptionist" className="text-primary-600 hover:underline">
              /receptionist
            </Link>
          </p>
          <p className="space-y-1">
            <span className="mr-2">Doctor</span>
            <Link to="/doctor" className="text-primary-600 hover:underline">
              /doctor
            </Link>
          </p>
          <p className="space-y-1">
            <span className="mr-2">Admin</span>
            <Link to="/admin" className="text-primary-600 hover:underline">
              /admin
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
