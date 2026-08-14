const baseLinks = (base) => [
  { label: "Dashboard", path: base },
  { label: "Patients", path: `${base}/patients` },
  { label: "Appointments", path: `${base}/appointments`, badge: 3 },
  { label: "Settings", path: `${base}/settings` },
];

export const receptionistLinks = baseLinks("/receptionist");
export const doctorLinks = baseLinks("/doctor");
export const adminLinks = baseLinks("/admin");
