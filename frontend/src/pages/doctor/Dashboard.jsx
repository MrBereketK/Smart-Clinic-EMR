import { useState } from "react";
import Badge from "../../components/ui/Badge";
import Avatar from "../../components/ui/Avatar";
import SectionHeader from "../../components/ui/SectionHeader";

const vitals = [
  { label: "Blood Pressure", value: "120/80", note: "mmHg · normal" },
  { label: "Heart Rate", value: "72", note: "bpm · resting" },
  { label: "Temperature", value: "36.8°", note: "°C · normal" },
  { label: "SpO₂", value: "98%", note: "on room air" },
];

const visits = [
  { date: "Today", provider: "Dr. Morgan", note: "Presents with persistent cough × 5 days." },
  { date: "Jun 02", provider: "Dr. Ngozi", note: "Follow-up on seasonal allergy management." },
  { date: "Mar 14", provider: "Dr. Osei", note: "Annual physical — all vitals within range." },
  { date: "Nov 20", provider: "Dr. Ngozi", note: "Prescribed Amoxicillin for sinusitis." },
];

const medications = [
  "Amoxicillin 500mg",
  "Amlodipine 5mg",
  "Sumatriptan 50mg",
  "Metformin 850mg",
  "Atorvastatin 20mg",
];

const recentRx = [
  { id: "RX-7781", medication: "Amoxicillin 500mg", dosage: "1 cap · 3× daily", status: "Active" },
  { id: "RX-7782", medication: "Cetirizine 10mg", dosage: "1 tab · at night", status: "Active" },
  { id: "RX-7783", medication: "Salbutamol inhaler", dosage: "2 puffs · as needed", status: "Renew" },
];

const textareaClass =
  "w-full rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-sm text-slate-800 placeholder-slate-400 transition-colors focus:border-primary-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-100";

export default function Dashboard() {
  const [soap, setSoap] = useState({ s: "", o: "", a: "", p: "" });
  const [rxSearch, setRxSearch] = useState("");
  const [selectedRx, setSelectedRx] = useState("");
  const [dosage, setDosage] = useState("");

  const updateSoap = (field) => (event) =>
    setSoap((previous) => ({ ...previous, [field]: event.target.value }));

  const filteredMeds = medications.filter((medication) =>
    medication.toLowerCase().includes(rxSearch.toLowerCase())
  );

  const handleIssue = () => {
    window.alert(
      selectedRx
        ? `Prescription issued: ${selectedRx}${dosage ? ` — ${dosage}` : ""}`
        : "Please select a medication first."
    );
  };

  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-primary-700 via-primary-600 to-sky-500 text-white shadow-lg shadow-primary-600/20">
        <div className="flex flex-wrap items-center gap-4 px-5 py-5 sm:px-6">
          <Avatar name="Amara Okafor" className="h-14 w-14 text-lg ring-4 ring-white/20" />
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-primary-100">
              Currently selected patient
            </p>
            <h2 className="text-xl font-bold tracking-tight">Amara Okafor</h2>
            <p className="text-sm text-primary-100">
              MRN P-1021 · Female · 34 years · Last visit today
            </p>
          </div>
          <div className="ml-auto flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold backdrop-blur">
              <span className="text-primary-100">Age</span> 34
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold backdrop-blur">
              <span className="text-primary-100">Blood type</span> O+
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500 px-3 py-1.5 text-xs font-bold shadow-md">
              ⚠ Allergy: Penicillin
            </span>
          </div>
        </div>
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-2xl bg-white p-5 shadow-sm shadow-slate-200/50 ring-1 ring-slate-200/70 sm:p-6">
            <SectionHeader
              title="Vitals & Recent History"
              subtitle="Current vitals recorded at 08:05"
              action={
                <button
                  type="button"
                  className="rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-50"
                >
                  View full history
                </button>
              }
            />

            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {vitals.map((vital) => (
                <div
                  key={vital.label}
                  className="rounded-xl bg-sky-50/80 p-3.5 ring-1 ring-sky-100"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                    {vital.label}
                  </p>
                  <p className="mt-1 text-xl font-bold tabular-nums tracking-tight text-slate-900">
                    {vital.value}
                  </p>
                  <p className="mt-0.5 text-[11px] text-emerald-600">{vital.note}</p>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Visit timeline
              </p>
              <ol className="relative ml-1.5 space-y-5 border-l-2 border-slate-100 pl-6">
                {visits.map((visit) => (
                  <li key={visit.date} className="relative">
                    <span className="absolute -left-[31px] top-0.5 flex h-3 w-3">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-primary-200 opacity-70" />
                      <span className="relative inline-flex h-3 w-3 rounded-full border-2 border-white bg-primary-500" />
                    </span>
                    <div className="flex flex-wrap items-baseline gap-x-2">
                      <p className="text-sm font-semibold text-slate-800">{visit.date}</p>
                      <p className="text-xs text-slate-400">{visit.provider}</p>
                    </div>
                    <p className="mt-0.5 text-sm text-slate-600">{visit.note}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm shadow-slate-200/50 ring-1 ring-slate-200/70 sm:p-6">
            <SectionHeader
              title="Encounter Notes"
              subtitle="SOAP documentation for Amara Okafor"
            />
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="soap-s" className="mb-1.5 block text-xs font-bold text-slate-600">
                  S — Subjective
                </label>
                <textarea
                  id="soap-s"
                  rows={4}
                  value={soap.s}
                  onChange={updateSoap("s")}
                  placeholder="Patient reports 5-day cough, worse at night…"
                  className={textareaClass}
                />
              </div>
              <div>
                <label htmlFor="soap-o" className="mb-1.5 block text-xs font-bold text-slate-600">
                  O — Objective
                </label>
                <textarea
                  id="soap-o"
                  rows={4}
                  value={soap.o}
                  onChange={updateSoap("o")}
                  placeholder="Temp 36.8°C, HR 72, clear lung fields…"
                  className={textareaClass}
                />
              </div>
              <div>
                <label htmlFor="soap-a" className="mb-1.5 block text-xs font-bold text-slate-600">
                  A — Assessment
                </label>
                <textarea
                  id="soap-a"
                  rows={4}
                  value={soap.a}
                  onChange={updateSoap("a")}
                  placeholder="Upper respiratory tract infection…"
                  className={textareaClass}
                />
              </div>
              <div>
                <label htmlFor="soap-p" className="mb-1.5 block text-xs font-bold text-slate-600">
                  P — Plan
                </label>
                <textarea
                  id="soap-p"
                  rows={4}
                  value={soap.p}
                  onChange={updateSoap("p")}
                  placeholder="Continue antibiotics, return if worsening…"
                  className={textareaClass}
                />
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                Auto-saved as draft
              </div>
              <button
                type="button"
                className="rounded-xl bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-700"
              >
                Save notes
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm shadow-slate-200/50 ring-1 ring-slate-200/70 sm:p-6">
          <SectionHeader title="Prescriptions & Orders" subtitle="Issue new or renew existing" />

          <div className="relative mt-5">
            <svg
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
            <input
              type="search"
              value={rxSearch}
              onChange={(event) => setRxSearch(event.target.value)}
              placeholder="Search medications…"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm placeholder-slate-400 focus:border-primary-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-100"
            />
            {rxSearch && filteredMeds.length > 0 && (
              <ul className="absolute z-10 mt-2 w-full overflow-hidden rounded-xl bg-white shadow-xl ring-1 ring-slate-200">
                {filteredMeds.map((medication) => (
                  <li key={medication}>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedRx(medication);
                        setRxSearch("");
                      }}
                      className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-slate-700 transition-colors hover:bg-sky-50"
                    >
                      <svg className="h-4 w-4 text-primary-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>
                      {medication}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {selectedRx && (
            <div className="mt-4 flex items-center justify-between rounded-xl bg-primary-50 px-3.5 py-2.5 ring-1 ring-primary-100">
              <span className="text-sm font-semibold text-primary-700">{selectedRx}</span>
              <button
                type="button"
                onClick={() => setSelectedRx("")}
                className="text-xs font-semibold text-primary-500 hover:text-primary-700"
              >
                Clear
              </button>
            </div>
          )}

          <div className="mt-4">
            <label htmlFor="dosage" className="mb-1.5 block text-xs font-semibold text-slate-600">
              Dosage
            </label>
            <input
              id="dosage"
              value={dosage}
              onChange={(event) => setDosage(event.target.value)}
              placeholder="e.g. 1 capsule, 3× daily"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm placeholder-slate-400 focus:border-primary-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-100"
            />
          </div>

          <button
            type="button"
            onClick={handleIssue}
            className="mt-4 w-full rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 py-3 text-sm font-bold text-white shadow-md shadow-primary-600/25 transition-all hover:from-primary-700 hover:to-primary-600"
          >
            Issue Prescription
          </button>

          <div className="mt-6">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Recent prescriptions
            </p>
            <ul className="space-y-2.5">
              {recentRx.map((rx) => (
                <li
                  key={rx.id}
                  className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 px-3.5 py-3 ring-1 ring-slate-100"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-800">{rx.medication}</p>
                    <p className="text-xs text-slate-500">{rx.dosage} · {rx.id}</p>
                  </div>
                  <Badge tone={rx.status === "Active" ? "green" : "amber"}>{rx.status}</Badge>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
