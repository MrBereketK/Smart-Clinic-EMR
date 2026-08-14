import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "./ui/Avatar";

const notifications = [
  {
    id: 1,
    tone: "bg-amber-400",
    title: "Queue alert",
    body: "Patient P-1023 has been waiting 25 minutes.",
    time: "2 min ago",
  },
  {
    id: 2,
    tone: "bg-sky-400",
    title: "New appointment",
    body: "Amara Okafor booked 09:30 with Dr. Adewale.",
    time: "14 min ago",
  },
  {
    id: 3,
    tone: "bg-emerald-400",
    title: "System update",
    body: "Nightly data backup completed successfully.",
    time: "1 hr ago",
  },
];

export default function Header({ crumbs, onMenuClick, userName }) {
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-slate-200/80 bg-white/85 px-4 backdrop-blur sm:px-6">
      <button
        type="button"
        onClick={onMenuClick}
        className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 lg:hidden"
        aria-label="Open sidebar"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>

      <nav className="hidden items-center gap-1.5 text-sm sm:flex" aria-label="Breadcrumb">
        {crumbs.map((crumb, index) => (
          <Fragment key={index}>
            {index > 0 && <span className="text-slate-300">/</span>}
            {crumb.to ? (
              <Link
                to={crumb.to}
                className="font-medium text-slate-500 transition-colors hover:text-primary-600"
              >
                {crumb.label}
              </Link>
            ) : (
              <span className="font-semibold text-slate-800">{crumb.label}</span>
            )}
          </Fragment>
        ))}
      </nav>

      <div className="relative mx-auto hidden w-full max-w-md md:block">
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
          placeholder="Search patients, records, providers…"
          className="w-full rounded-full border border-slate-200 bg-slate-50 py-2 pl-10 pr-12 text-sm text-slate-800 placeholder-slate-400 transition-colors focus:border-primary-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-100"
        />
        <kbd className="pointer-events-none absolute right-3.5 top-1/2 hidden -translate-y-1/2 rounded-md border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 sm:block">
          ⌘K
        </kbd>
      </div>

      <div className="ml-auto flex items-center gap-2 sm:gap-3 md:ml-0">
        <div className="relative">
          <button
            type="button"
            onClick={() => setNotifOpen((open) => !open)}
            className="relative rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-100"
            aria-label="Notifications"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
              />
            </svg>
            <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white ring-2 ring-white">
              3
            </span>
          </button>

          {notifOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setNotifOpen(false)}
                aria-hidden="true"
              />
              <div className="absolute right-0 z-20 mt-2 w-80 origin-top-right rounded-2xl bg-white p-2 shadow-xl ring-1 ring-slate-200">
                <div className="flex items-center justify-between px-3 py-2">
                  <p className="text-sm font-bold text-slate-900">Notifications</p>
                  <span className="text-xs font-medium text-primary-600">Mark all read</span>
                </div>
                <ul className="divide-y divide-slate-100">
                  {notifications.map((notification) => (
                    <li key={notification.id} className="flex gap-3 rounded-xl px-3 py-3 hover:bg-slate-50">
                      <span
                        className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${notification.tone}`}
                      />
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-800">
                          {notification.title}
                        </p>
                        <p className="text-xs text-slate-500">{notification.body}</p>
                        <p className="mt-0.5 text-[11px] text-slate-400">{notification.time}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>

        <div className="hidden items-center gap-2 border-l border-slate-200 pl-3 sm:flex">
          <Avatar name={userName} />
          <div className="hidden leading-tight lg:block">
            <p className="text-sm font-semibold text-slate-800">{userName}</p>
            <p className="text-xs text-slate-400">Online</p>
          </div>
        </div>
      </div>
    </header>
  );
}
