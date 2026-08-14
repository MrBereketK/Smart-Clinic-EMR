import { useState } from "react";
import Badge from "../../components/ui/Badge";
import Avatar from "../../components/ui/Avatar";
import StatCard from "../../components/ui/StatCard";
import SectionHeader from "../../components/ui/SectionHeader";

const queue = [
  { id: "P-1021", name: "Amara Okafor", time: "08:00", provider: "Dr. Adewale", status: "In progress" },
  { id: "P-1022", name: "Tunde Bakare", time: "08:20", provider: "Dr. Ngozi", status: "In progress" },
  { id: "P-1023", name: "Sofia Mendes", time: "08:40", provider: "Dr. Adewale", status: "Waiting" },
  { id: "P-1024", name: "Kwame Boateng", time: "09:00", provider: "Dr. Osei", status: "Waiting" },
  { id: "P-1025", name: "Li Wei", time: "09:15", provider: "Dr. Ngozi", status: "Checked in" },
  { id: "P-1026", name: "Maria Santos", time: "09:30", provider: "Dr. Osei", status: "Waiting" },
  { id: "P-1027", name: "David Osei", time: "09:45", provider: "Dr. Adewale", status: "Waiting" },
];

const statusTone = {
  "In progress": "green",
  Waiting: "amber",
  "Checked in": "sky",
};

const steps = ["Patient", "Details", "Confirm"];

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 transition-colors focus:border-primary-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-100";

export default function Dashboard() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    type: "walk-in",
    firstName: "",
    lastName: "",
    phone: "",
    provider: "Dr. Adewale",
    reason: "",
    time: "10:00",
  });

  const update = (field) => (event) =>
    setForm((previous) => ({ ...previous, [field]: event.target.value }));

  const canContinue =
    step === 0
      ? form.firstName.trim() && form.lastName.trim() && form.phone.trim()
      : step === 1
        ? form.reason.trim() && form.time
        : true;

  const handleNext = () => setStep((current) => Math.min(current + 1, steps.length - 1));
  const handleBack = () => setStep((current) => Math.max(current - 1, 0));

  const handleConfirm = () => {
    window.alert(
      `Appointment booked for ${form.firstName} ${form.lastName} with ${form.provider} at ${form.time}.`
    );
    setStep(0);
    setForm({
      type: "walk-in",
      firstName: "",
      lastName: "",
      phone: "",
      provider: "Dr. Adewale",
      reason: "",
      time: "10:00",
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard
          label="Total Checked-In"
          value="128"
          trend="+12%"
          tone="sky"
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
              />
            </svg>
          }
        />
        <StatCard
          label="Waiting in Queue"
          value="14"
          trend="-3%"
          trendDirection="down"
          tone="amber"
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          }
        />
        <StatCard
          label="Available Doctors"
          value="6"
          trend="+2%"
          tone="emerald"
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 3h11.25a1.5 1.5 0 0 1 1.5 1.5v9.75m0 0v.75a2.25 2.25 0 0 1-2.25 2.25H6.75a2.25 2.25 0 0 1-2.25-2.25v-.75m10.5 0h.008M20.25 12.75h-3.75M6.75 15.75h.008M21 8.25h-3.75m0-1.5 1.5 1.5-1.5 1.5M12 6.75l-1.5 1.5 1.5 1.5"
              />
            </svg>
          }
        />
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-3">
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm shadow-slate-200/50 ring-1 ring-slate-200/70 lg:col-span-2">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4 sm:px-6">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              <div>
                <h2 className="text-lg font-bold tracking-tight text-slate-900">Live Patient Queue</h2>
                <p className="text-xs text-slate-500">Updated just now · {queue.length} active</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="search"
                placeholder="Filter queue…"
                className="w-40 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm placeholder-slate-400 focus:border-primary-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-100"
              />
              <button
                type="button"
                className="rounded-xl border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
              >
                View all
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-100 text-left text-sm">
              <thead className="bg-slate-50/70">
                <tr>
                  <th className="px-5 py-3 font-semibold text-slate-500 sm:px-6">Patient</th>
                  <th className="px-5 py-3 font-semibold text-slate-500 sm:px-6">ID</th>
                  <th className="px-5 py-3 font-semibold text-slate-500 sm:px-6">Appt Time</th>
                  <th className="px-5 py-3 font-semibold text-slate-500 sm:px-6">Provider</th>
                  <th className="px-5 py-3 font-semibold text-slate-500 sm:px-6">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {queue.map((patient) => (
                  <tr key={patient.id} className="transition-colors hover:bg-sky-50/60">
                    <td className="px-5 py-3.5 sm:px-6">
                      <div className="flex items-center gap-3">
                        <Avatar name={patient.name} />
                        <div>
                          <p className="font-semibold text-slate-800">{patient.name}</p>
                          <p className="text-xs text-slate-400">{patient.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 font-mono text-xs text-slate-500 sm:px-6">
                      {patient.id}
                    </td>
                    <td className="px-5 py-3.5 tabular-nums text-slate-600 sm:px-6">
                      {patient.time}
                    </td>
                    <td className="px-5 py-3.5 text-slate-600 sm:px-6">{patient.provider}</td>
                    <td className="px-5 py-3.5 sm:px-6">
                      <Badge tone={statusTone[patient.status] || "slate"}>{patient.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm shadow-slate-200/50 ring-1 ring-slate-200/70 sm:p-6">
          <SectionHeader
            title="Quick Action"
            subtitle="Register a walk-in or book an appointment in seconds"
          />

          <div className="mt-5 flex items-center gap-1.5">
            {steps.map((label, index) => (
              <div key={label} className="flex flex-1 items-center gap-1.5">
                <div
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                    index < step
                      ? "bg-primary-600 text-white"
                      : index === step
                        ? "bg-primary-50 text-primary-700 ring-2 ring-primary-500"
                        : "bg-slate-100 text-slate-400"
                  }`}
                >
                  {index < step ? (
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-0.5 flex-1 rounded-full ${
                      index < step ? "bg-primary-500" : "bg-slate-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="mt-2 flex justify-between px-1 text-[11px] font-medium text-slate-400">
            <span>Patient</span>
            <span>Details</span>
            <span>Confirm</span>
          </div>

          <div className="mt-5">
            {step === 0 && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2 rounded-xl bg-slate-50 p-1">
                  {[
                    { value: "walk-in", label: "Walk-in" },
                    { value: "scheduled", label: "Scheduled" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setForm((previous) => ({ ...previous, type: option.value }))}
                      className={`rounded-lg px-3 py-2 text-sm font-semibold transition-all ${
                        form.type === option.value
                          ? "bg-white text-primary-700 shadow-sm ring-1 ring-slate-200"
                          : "text-slate-500 hover:text-slate-700"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
                <div>
                  <label htmlFor="firstName" className="mb-1.5 block text-xs font-semibold text-slate-600">
                    First name
                  </label>
                  <input id="firstName" value={form.firstName} onChange={update("firstName")} placeholder="e.g. Adaeze" className={inputClass} />
                </div>
                <div>
                  <label htmlFor="lastName" className="mb-1.5 block text-xs font-semibold text-slate-600">
                    Last name
                  </label>
                  <input id="lastName" value={form.lastName} onChange={update("lastName")} placeholder="e.g. Obi" className={inputClass} />
                </div>
                <div>
                  <label htmlFor="phone" className="mb-1.5 block text-xs font-semibold text-slate-600">
                    Phone number
                  </label>
                  <input id="phone" type="tel" value={form.phone} onChange={update("phone")} placeholder="+234 800 000 0000" className={inputClass} />
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="provider" className="mb-1.5 block text-xs font-semibold text-slate-600">
                    Provider
                  </label>
                  <select id="provider" value={form.provider} onChange={update("provider")} className={inputClass}>
                    <option>Dr. Adewale</option>
                    <option>Dr. Ngozi</option>
                    <option>Dr. Osei</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="reason" className="mb-1.5 block text-xs font-semibold text-slate-600">
                    Reason for visit
                  </label>
                  <input id="reason" value={form.reason} onChange={update("reason")} placeholder="e.g. Routine check-up" className={inputClass} />
                </div>
                <div>
                  <label htmlFor="time" className="mb-1.5 block text-xs font-semibold text-slate-600">
                    Appointment time
                  </label>
                  <select id="time" value={form.time} onChange={update("time")} className={inputClass}>
                    <option>10:00</option>
                    <option>10:30</option>
                    <option>11:00</option>
                    <option>11:30</option>
                  </select>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-3 rounded-xl bg-sky-50/70 p-4 ring-1 ring-sky-100">
                {[
                  ["Patient", `${form.firstName} ${form.lastName}`],
                  ["Type", form.type === "walk-in" ? "Walk-in" : "Scheduled"],
                  ["Phone", form.phone],
                  ["Provider", form.provider],
                  ["Reason", form.reason || "—"],
                  ["Time", form.time],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-start justify-between gap-3 text-sm">
                    <span className="text-slate-500">{label}</span>
                    <span className="text-right font-semibold text-slate-800">{value}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-5 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleBack}
                disabled={step === 0}
                className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-500 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Back
              </button>
              {step < steps.length - 1 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!canContinue}
                  className="rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Continue
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleConfirm}
                  className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700"
                >
                  Confirm booking
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
