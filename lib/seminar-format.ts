// Seminar dates are shown in Indonesian Western time (WIB), where the
// seminars and their audience are.
const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "Asia/Jakarta",
});

export function formatSeminarDate(iso?: string | null) {
  if (!iso) return null;
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? null : dateFormat.format(date);
}

// "16 Nov 2026 · 10m" — skips whichever parts are missing.
export function seminarMeta(seminarDate?: string | null, duration?: string | null) {
  return [formatSeminarDate(seminarDate), duration].filter(Boolean).join(" · ") || null;
}
