import type { CalendarEvent } from "@/types";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function makeDate(year: number, monthIndex: number, day: number) {
  return `${year}-${pad(monthIndex + 1)}-${pad(day)}`;
}

function clampDay(day: number, daysInMonth: number) {
  return Math.min(day, daysInMonth);
}

// Generate 5-8 realistic events for the CURRENT month
function generateCurrentMonthEvents(): CalendarEvent[] {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth(); // 0-indexed
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const picks = [3, 7, 12, 15, 19, 22, 27]; // spread across the month
  const d = (n: number) => clampDay(n, daysInMonth);

  const base: Omit<CalendarEvent, "id">[] = [
    {
      title: "Weekly Team Standup",
      date: makeDate(year, month, d(3)),
      startTime: "09:00",
      endTime: "09:30",
      color: "blue",
      description: "Quick sync on priorities, blockers, and progress.",
    },
    {
      title: "Sprint Planning",
      date: makeDate(year, month, d(7)),
      startTime: "10:00",
      endTime: "11:30",
      color: "purple",
      description: "Define goals, scope stories, and assign owners for the next sprint.",
    },
    {
      title: "Design Review: Analytics UX",
      date: makeDate(year, month, d(12)),
      startTime: "14:00",
      endTime: "15:00",
      color: "green",
      description: "Review charts and empty states for Analytics with Design.",
    },
    {
      title: "Client Demo (ACME)",
      date: makeDate(year, month, d(15)),
      startTime: "16:00",
      endTime: "17:00",
      color: "red",
      description: "Walk through latest build; gather feedback and next steps.",
    },
    {
      title: "Team Lunch",
      date: makeDate(year, month, d(19)),
      startTime: "12:30",
      endTime: "13:30",
      color: "yellow",
      description: "Monthly team lunch — La Trattoria (Mesa for 8 reserved).",
    },
    {
      title: "Code Review Session",
      date: makeDate(year, month, d(22)),
      startTime: "09:30",
      endTime: "10:30",
      color: "green",
      description: "Group review: calendar feature + settings refactor.",
    },
    {
      title: "Release Deadline",
      date: makeDate(year, month, d(27)),
      startTime: "09:00",
      endTime: "10:00",
      color: "pink",
      description: "Cut release branch, finalize changelog, prepare announcement.",
    },
  ];

  return base.map((e, i) => ({ ...e, id: `evt_${String(i + 1).padStart(3, "0")}` }));
}

export const calendarEvents: CalendarEvent[] = generateCurrentMonthEvents();

