import { useState } from "react";
import Avatar from "../../components/ui/Avatar";
import Badge from "../../components/ui/Badge";
import StatCard from "../../components/ui/StatCard";
import Toggle from "../../components/ui/Toggle";
import SectionHeader from "../../components/ui/SectionHeader";

const auditLogs = [
  { id: 1, user: "Dr. Ngozi Chukwu", action: "Downloaded patient record P-1022", timestamp: "09:04:12", ip: "192.168.1.24", risk: "Medium" },
  { id: 2, user: "System", action: "Daily backup completed", timestamp: "08:00:00", ip: "127.0.0.1", risk: "Low" },
  { id: 3, user: "Adaeze Uche", action: "Created appointment for P-1025", timestamp: "08:47:31", ip: "192.168.1.31", risk: "Low" },
  { id: 4, user: "Chioma Johnson", action: "Exported lab results (CSV)", timestamp: "08:21:55", ip: "10.0.0.12", risk: "Medium" },
  { id: 5, user: "Kwame Osei", action: "Granted role 'Nurse' to user jchioma", timestamp: "07:59:18", ip: "192.168.1.2", risk: "Low" },
  { id: 6, user: "Unknown", action: "Failed login ×5 (brute-force pattern)", timestamp: "07:44:09", ip: "45.155.204.9", risk: "High" },
  { id: 7, user: "Dr. Tunde Bakare", action: "Updated medication for P-1021", timestamp: "07:30:44", ip: "192.168.1.15", risk: "Low" },
  { id: 8, user: "Samuel Adebayo", action: "Exported patient list (PDF)", timestamp: "07:12:03", ip: "192.168.1.40", risk: "High" },
  { id: 9, user: "Adaeze Uche", action: "Rescheduled appointment P-1023", timestamp: "06:58:27", ip: "192.168.1.31", risk: "Low" },
  { id: 10, user: "System", action: "Password reset requested (jchioma)", timestamp: "06:45:51", ip: "127.0.0.1", risk: "Low" },
];

const riskTone = { High: "red", Medium: "amber", Low: "green" };

const initialStaff = [
  { id: 1, name: "Dr. Ngozi Chukwu", role: "Doctor", access: true, reset: false },
  { id: 2, name: "Adaeze Uche", role: "Receptionist", access: true, reset: false },
  { id: 3, name: "Kwame Osei", role: "Administrator", access: true, reset: false },
  { id: 4, name: "Dr. Tunde Bakare", role: "Doctor", access: true, reset: true },
  { id: 5, name: "Chioma Johnson", role: "Nurse", access: false, reset: false },
  { id: 6, name: "Samuel Adebayo", role: "Lab Technician", access: true, reset: false },
];

const roleTone = { Doctor: "blue", Receptionist: "sky", Administrator: "red", Nurse: "green", "Lab Technician": "amber" };

const PAGE_SIZE = 5;

export default function Dashboard() {
  const [page, setPage] = useState(0);
  const [staff, setStaff] = useState(initialStaff);

  const totalPages = Math.ceil(auditLogs.length / PAGE_SIZE);
  const rows = auditLogs.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  const toggleStaff = (id, field) =>
    setStaff((previous) =>
      previous.map((person) =>
        person.id === id ? { ...person, [field]: !person[field] } : person
      )
    );

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard
          label="Active Sessions"
          value="23"
          trend="+2%"
          tone="sky"
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
            </svg>
          }
        />
        <StatCard
          label="Failed Logins (24h)"
          value="4"
          trend="-18%"
          trendDirection="down"
          trendTone="bg-emerald-50 text-emerald-600"
          tone="red"
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
            </svg>
          }
        />
        <StatCard
          label="System Uptime"
          value="99.98%"
          trend="+0.01%"
          subtitle="last 90 days"
          tone="emerald"
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
            </svg>
          }
        />
      </div>

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm shadow-slate-200/50 ring-1 ring-slate-200/70">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4 sm:px-6">
          <SectionHeader
            title="Security Audit Log"
            subtitle="Events flagged by the Gasha Mapper risk engine"
            action={<Badge tone="red">{auditLogs.filter((log) => log.risk === "High").length} flagged</Badge>}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100 text-left text-sm">
            <thead className="bg-slate-50/70">
              <tr>
                <th className="px-5 py-3 font-semibold text-slate-500 sm:px-6">Timestamp</th>
                <th className="px-5 py-3 font-semibold text-slate-500 sm:px-6">User</th>
                <th className="px-5 py-3 font-semibold text-slate-500 sm:px-6">Action</th>
                <th className="px-5 py-3 font-semibold text-slate-500 sm:px-6">IP Address</th>
                <th className="px-5 py-3 font-semibold text-slate-500 sm:px-6">Risk Level</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((log) => (
                <tr key={log.id} className="transition-colors hover:bg-sky-50/60">
                  <td className="px-5 py-3.5 font-mono text-xs text-slate-500 sm:px-6">
                    {log.timestamp}
                  </td>
                  <td className="px-5 py-3.5 font-medium text-slate-800 sm:px-6">{log.user}</td>
                  <td className="px-5 py-3.5 text-slate-600 sm:px-6">{log.action}</td>
                  <td className="px-5 py-3.5 font-mono text-xs text-slate-500 sm:px-6">{log.ip}</td>
                  <td className="px-5 py-3.5 sm:px-6">
                    <Badge tone={riskTone[log.risk]}>{log.risk}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-slate-100 px-5 py-3 sm:px-6">
          <p className="text-xs text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-700">
              {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, auditLogs.length)}
            </span>{" "}
            of {auditLogs.length} events
          </p>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setPage((current) => Math.max(0, current - 1))}
              disabled={page === 0}
              className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Prev
            </button>
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setPage(index)}
                className={`h-7 w-7 rounded-lg text-xs font-semibold transition-colors ${
                  index === page
                    ? "bg-primary-600 text-white shadow-sm"
                    : "text-slate-500 hover:bg-slate-100"
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setPage((current) => Math.min(totalPages - 1, current + 1))}
              disabled={page === totalPages - 1}
              className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-5 shadow-sm shadow-slate-200/50 ring-1 ring-slate-200/70 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <SectionHeader
            title="User Management"
            subtitle="Revoke access or force password resets in one click"
          />
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-700"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Invite Staff
          </button>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {staff.map((person) => (
            <div
              key={person.id}
              className={`rounded-2xl border p-5 transition-all ${
                person.access ? "border-slate-200 bg-white" : "border-slate-200 bg-slate-50 opacity-70"
              }`}
            >
              <div className="flex items-center gap-3">
                <Avatar name={person.name} />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-slate-800">{person.name}</p>
                  <Badge tone={roleTone[person.role]} className="mt-1">
                    {person.role}
                  </Badge>
                </div>
              </div>

              <div className="mt-4 space-y-3 border-t border-slate-100 pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-700">Access</p>
                    <p className="text-xs text-slate-400">
                      {person.access ? "Active workspace access" : "Access revoked"}
                    </p>
                  </div>
                  <Toggle
                    checked={person.access}
                    onChange={() => toggleStaff(person.id, "access")}
                    label={`Toggle access for ${person.name}`}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-700">Password reset</p>
                    <p className="text-xs text-slate-400">
                      {person.reset ? "Reset required at next login" : "No reset pending"}
                    </p>
                  </div>
                  <Toggle
                    checked={person.reset}
                    onChange={() => toggleStaff(person.id, "reset")}
                    label={`Require password reset for ${person.name}`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
