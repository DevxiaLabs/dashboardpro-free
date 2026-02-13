"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { CalendarSkeleton } from "@/components/ui/Skeleton";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  X,
  Clock,
  Palette,
  CalendarDays,
  CalendarIcon,
} from "lucide-react";
import { calendarEvents as initialEvents } from "@/data/events";
import type { CalendarEvent } from "@/types";
import { EmptyState } from "@/components/EmptyState";

// Color configuration for events
const EVENT_COLORS: Record<
  CalendarEvent["color"],
  { bg: string; text: string; dot: string; border: string }
> = {
  blue: {
    bg: "bg-blue-100 dark:bg-blue-900/40",
    text: "text-blue-700 dark:text-blue-300",
    dot: "bg-blue-500",
    border: "border-blue-300 dark:border-blue-700",
  },
  green: {
    bg: "bg-emerald-100 dark:bg-emerald-900/40",
    text: "text-emerald-700 dark:text-emerald-300",
    dot: "bg-emerald-500",
    border: "border-emerald-300 dark:border-emerald-700",
  },
  red: {
    bg: "bg-rose-100 dark:bg-rose-900/40",
    text: "text-rose-700 dark:text-rose-300",
    dot: "bg-rose-500",
    border: "border-rose-300 dark:border-rose-700",
  },
  yellow: {
    bg: "bg-amber-100 dark:bg-amber-900/40",
    text: "text-amber-700 dark:text-amber-300",
    dot: "bg-amber-500",
    border: "border-amber-300 dark:border-amber-700",
  },
  purple: {
    bg: "bg-purple-100 dark:bg-purple-900/40",
    text: "text-purple-700 dark:text-purple-300",
    dot: "bg-purple-500",
    border: "border-purple-300 dark:border-purple-700",
  },
  pink: {
    bg: "bg-pink-100 dark:bg-pink-900/40",
    text: "text-pink-700 dark:text-pink-300",
    dot: "bg-pink-500",
    border: "border-pink-300 dark:border-pink-700",
  },
};

const COLOR_OPTIONS: CalendarEvent["color"][] = [
  "blue",
  "green",
  "red",
  "yellow",
  "purple",
  "pink",
];

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

function formatDateString(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function formatEventDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function isToday(year: number, month: number, day: number): boolean {
  const today = new Date();
  return (
    today.getFullYear() === year &&
    today.getMonth() === month &&
    today.getDate() === day
  );
}

// Inline calendar date picker component
function InlineDatePicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (dateStr: string) => void;
}) {
  // Parse the value to get initial year/month
  const parsedDate = value ? new Date(value + "T00:00:00") : new Date();
  const [pickerYear, setPickerYear] = useState(parsedDate.getFullYear());
  const [pickerMonth, setPickerMonth] = useState(parsedDate.getMonth());

  const pickerDaysInMonth = getDaysInMonth(pickerYear, pickerMonth);
  const pickerFirstDay = getFirstDayOfMonth(pickerYear, pickerMonth);
  const pickerPrevMonthDays = getDaysInMonth(
    pickerMonth === 0 ? pickerYear - 1 : pickerYear,
    pickerMonth === 0 ? 11 : pickerMonth - 1
  );

  const handlePickerPrevMonth = () => {
    setPickerMonth((prev) => {
      if (prev === 0) {
        setPickerYear((y) => y - 1);
        return 11;
      }
      return prev - 1;
    });
  };

  const handlePickerNextMonth = () => {
    setPickerMonth((prev) => {
      if (prev === 11) {
        setPickerYear((y) => y + 1);
        return 0;
      }
      return prev + 1;
    });
  };

  // Build picker grid cells
  const pickerCells = useMemo(() => {
    const cells: Array<{
      day: number;
      month: number;
      year: number;
      isCurrentMonth: boolean;
      dateStr: string;
    }> = [];

    // Previous month trailing days
    for (let i = pickerFirstDay - 1; i >= 0; i--) {
      const day = pickerPrevMonthDays - i;
      const prevM = pickerMonth === 0 ? 11 : pickerMonth - 1;
      const prevY = pickerMonth === 0 ? pickerYear - 1 : pickerYear;
      cells.push({
        day,
        month: prevM,
        year: prevY,
        isCurrentMonth: false,
        dateStr: formatDateString(prevY, prevM, day),
      });
    }

    // Current month days
    for (let day = 1; day <= pickerDaysInMonth; day++) {
      cells.push({
        day,
        month: pickerMonth,
        year: pickerYear,
        isCurrentMonth: true,
        dateStr: formatDateString(pickerYear, pickerMonth, day),
      });
    }

    // Next month leading days to fill grid
    const totalCells = Math.ceil(cells.length / 7) * 7;
    const remaining = totalCells - cells.length;
    for (let day = 1; day <= remaining; day++) {
      const nextM = pickerMonth === 11 ? 0 : pickerMonth + 1;
      const nextY = pickerMonth === 11 ? pickerYear + 1 : pickerYear;
      cells.push({
        day,
        month: nextM,
        year: nextY,
        isCurrentMonth: false,
        dateStr: formatDateString(nextY, nextM, day),
      });
    }

    return cells;
  }, [pickerYear, pickerMonth, pickerDaysInMonth, pickerFirstDay, pickerPrevMonthDays]);

  const todayStr = formatDateString(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate()
  );

  return (
    <div className="border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden bg-white dark:bg-gray-900">
      {/* Month navigation header */}
      <div className="flex items-center justify-between px-3 py-2 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-600">
        <button
          type="button"
          onClick={handlePickerPrevMonth}
          className="p-1 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label="Previous month"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
          {MONTH_NAMES[pickerMonth]} {pickerYear}
        </span>
        <button
          type="button"
          onClick={handlePickerNextMonth}
          className="p-1 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label="Next month"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Day name headers */}
      <div className="grid grid-cols-7 border-b border-gray-100 dark:border-gray-700">
        {DAY_NAMES.map((d) => (
          <div
            key={d}
            className="py-1.5 text-center text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase"
          >
            {d}
          </div>
        ))}
      </div>

      {/* Date grid */}
      <div className="grid grid-cols-7 p-1 gap-0.5">
        {pickerCells.map((cell, idx) => {
          const isSelected = cell.dateStr === value;
          const isTodayCell = cell.dateStr === todayStr;

          return (
            <button
              key={`picker-${idx}`}
              type="button"
              onClick={() => onChange(cell.dateStr)}
              className={`
                w-full aspect-square flex items-center justify-center text-xs rounded-md transition-all
                ${
                  isSelected
                    ? "bg-primary-600 text-white font-bold shadow-sm"
                    : isTodayCell && cell.isCurrentMonth
                      ? "bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-semibold"
                      : cell.isCurrentMonth
                        ? "text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 font-medium"
                        : "text-gray-300 dark:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
                }
              `}
              aria-label={`Select ${cell.dateStr}`}
              aria-pressed={isSelected}
            >
              {cell.day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: Omit<CalendarEvent, "id">) => void;
  selectedDate: string;
}

function CreateEventModal({
  isOpen,
  onClose,
  onSave,
  selectedDate,
}: CreateEventModalProps) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(selectedDate);
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("10:00");
  const [color, setColor] = useState<CalendarEvent["color"]>("blue");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Reset form when opening with a new date
  useMemo(() => {
    if (isOpen) {
      setDate(selectedDate);
      setTitle("");
      setStartTime("09:00");
      setEndTime("10:00");
      setColor("blue");
      setDescription("");
      setErrors({});
    }
  }, [isOpen, selectedDate]);

  const handleSave = () => {
    const newErrors: Record<string, string> = {};
    if (!title.trim()) {
      newErrors.title = "Title is required";
    }
    if (!date) {
      newErrors.date = "Date is required";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave({
      title: title.trim(),
      date,
      startTime: startTime || undefined,
      endTime: endTime || undefined,
      color,
      description: description.trim() || undefined,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto py-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md mx-4 overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Create Event
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4">
          {/* Title */}
          <div>
            <label htmlFor="event-title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Event Title *
            </label>
            <input
              id="event-title"
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errors.title) setErrors((prev) => ({ ...prev, title: "" }));
              }}
              placeholder="Enter event title"
              className={`w-full px-3 py-2 rounded-lg border ${
                errors.title
                  ? "border-rose-500 focus:ring-rose-500"
                  : "border-gray-300 dark:border-gray-600 focus:ring-primary-500"
              } bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 transition-colors`}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-rose-500">{errors.title}</p>
            )}
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <CalendarIcon className="w-4 h-4 inline mr-1" />
              Date
            </label>
            <InlineDatePicker
              value={date}
              onChange={(dateStr) => {
                setDate(dateStr);
                if (errors.date) setErrors((prev) => ({ ...prev, date: "" }));
              }}
            />
            {errors.date && (
              <p className="mt-1 text-sm text-rose-500">{errors.date}</p>
            )}
          </div>

          {/* Time */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="event-start-time" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                <Clock className="w-4 h-4 inline mr-1" />
                Start Time
              </label>
              <input
                id="event-start-time"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
              />
            </div>
            <div>
              <label htmlFor="event-end-time" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                <Clock className="w-4 h-4 inline mr-1" />
                End Time
              </label>
              <input
                id="event-end-time"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
              />
            </div>
          </div>

          {/* Color picker */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Palette className="w-4 h-4 inline mr-1" />
              Color
            </label>
            <div className="flex gap-2">
              {COLOR_OPTIONS.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`w-8 h-8 rounded-full ${EVENT_COLORS[c].dot} transition-all ${
                    color === c
                      ? "ring-2 ring-offset-2 ring-gray-400 dark:ring-offset-gray-800 scale-110"
                      : "hover:scale-110"
                  }`}
                  title={c}
                />
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="event-description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              id="event-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional description..."
              rows={2}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors resize-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-5 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors"
          >
            Create Event
          </button>
        </div>
      </div>
    </div>
  );
}

interface EventDetailModalProps {
  isOpen: boolean;
  event: CalendarEvent | null;
  onClose: () => void;
  onDelete: (id: string) => void;
  onEdit: (event: CalendarEvent) => void;
}

function EventDetailModal({
  isOpen,
  event,
  onClose,
  onDelete,
  onEdit,
}: EventDetailModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editStartTime, setEditStartTime] = useState("");
  const [editEndTime, setEditEndTime] = useState("");
  const [editColor, setEditColor] = useState<CalendarEvent["color"]>("blue");

  useMemo(() => {
    if (event && isOpen) {
      setEditTitle(event.title);
      setEditDescription(event.description || "");
      setEditStartTime(event.startTime || "");
      setEditEndTime(event.endTime || "");
      setEditColor(event.color);
      setIsEditing(false);
    }
  }, [event, isOpen]);

  if (!isOpen || !event) return null;

  const colorStyle = EVENT_COLORS[event.color];

  const handleSaveEdit = () => {
    onEdit({
      ...event,
      title: editTitle.trim(),
      description: editDescription.trim() || undefined,
      startTime: editStartTime || undefined,
      endTime: editEndTime || undefined,
      color: editColor,
    });
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto py-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md mx-4 overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Colored header bar */}
        <div className={`h-2 ${colorStyle.dot}`} />

        <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-700">
          {isEditing ? (
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="text-lg font-semibold text-gray-900 dark:text-gray-100 bg-transparent border-b-2 border-primary-500 focus:outline-none w-full mr-2"
              aria-label="Edit event title"
            />
          ) : (
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {event.title}
            </h2>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex-shrink-0"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-3">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <CalendarDays className="w-4 h-4" />
            <span>{formatEventDate(event.date)}</span>
          </div>
          {(event.startTime || event.endTime) && (
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Clock className="w-4 h-4" />
              <span>
                {isEditing ? (
                  <span className="flex gap-2">
                    <input
                      type="time"
                      value={editStartTime}
                      onChange={(e) => setEditStartTime(e.target.value)}
                      className="px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-sm"
                      aria-label="Edit start time"
                    />
                    <span className="text-gray-400">-</span>
                    <input
                      type="time"
                      value={editEndTime}
                      onChange={(e) => setEditEndTime(e.target.value)}
                      className="px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-sm"
                      aria-label="Edit end time"
                    />
                  </span>
                ) : (
                  <>
                    {event.startTime} {event.endTime ? `– ${event.endTime}` : ""}
                  </>
                )}
              </span>
            </div>
          )}
          {isEditing ? (
            <>
              <div>
                <label htmlFor="edit-event-description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  id="edit-event-description"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Color
                </label>
                <div className="flex gap-2">
                  {COLOR_OPTIONS.map((c) => (
                    <button
                      key={c}
                      onClick={() => setEditColor(c)}
                      className={`w-7 h-7 rounded-full ${EVENT_COLORS[c].dot} transition-all ${
                        editColor === c
                          ? "ring-2 ring-offset-2 ring-gray-400 dark:ring-offset-gray-800 scale-110"
                          : "hover:scale-110"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </>
          ) : (
            event.description && (
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {event.description}
              </p>
            )
          )}
        </div>

        <div className="flex items-center justify-between p-5 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={() => {
              onDelete(event.id);
              onClose();
            }}
            className="px-3 py-2 text-sm font-medium text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg transition-colors"
          >
            Delete
          </button>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors"
                >
                  Save
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors"
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CalendarPage() {
  const [isLoading, setIsLoading] = useState(true);
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [events, setEvents] = useState<CalendarEvent[]>(() =>
    initialEvents.map((e) => ({ ...e }))
  );

  // Create event modal
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  // Event detail modal
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);
  const prevMonthDays = getDaysInMonth(
    currentMonth === 0 ? currentYear - 1 : currentYear,
    currentMonth === 0 ? 11 : currentMonth - 1
  );

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Build event lookup map for the current month
  const eventsByDate = useMemo(() => {
    const map: Record<string, CalendarEvent[]> = {};
    events.forEach((event) => {
      if (!map[event.date]) {
        map[event.date] = [];
      }
      map[event.date].push(event);
    });
    return map;
  }, [events]);

  const handlePrevMonth = useCallback(() => {
    setCurrentMonth((prev) => {
      if (prev === 0) {
        setCurrentYear((y) => y - 1);
        return 11;
      }
      return prev - 1;
    });
  }, []);

  const handleNextMonth = useCallback(() => {
    setCurrentMonth((prev) => {
      if (prev === 11) {
        setCurrentYear((y) => y + 1);
        return 0;
      }
      return prev + 1;
    });
  }, []);

  const handleToday = useCallback(() => {
    setCurrentYear(today.getFullYear());
    setCurrentMonth(today.getMonth());
  }, [today]);

  const handleDateClick = useCallback(
    (year: number, month: number, day: number) => {
      const dateStr = formatDateString(year, month, day);
      setSelectedDate(dateStr);
      setShowCreateModal(true);
    },
    []
  );

  const handleEventClick = useCallback(
    (event: CalendarEvent, e: React.MouseEvent) => {
      e.stopPropagation();
      setSelectedEvent(event);
      setShowDetailModal(true);
    },
    []
  );

  const handleCreateEvent = useCallback(
    (eventData: Omit<CalendarEvent, "id">) => {
      const newEvent: CalendarEvent = {
        ...eventData,
        id: `evt_${Date.now()}`,
      };
      setEvents((prev) => [...prev, newEvent]);
      setShowCreateModal(false);
    },
    []
  );

  const handleDeleteEvent = useCallback((id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const handleEditEvent = useCallback((updatedEvent: CalendarEvent) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === updatedEvent.id ? updatedEvent : e))
    );
    setSelectedEvent(updatedEvent);
  }, []);

  // Build calendar grid cells
  const calendarCells = useMemo(() => {
    const cells: Array<{
      day: number;
      month: number;
      year: number;
      isCurrentMonth: boolean;
      isToday: boolean;
      dateStr: string;
    }> = [];

    // Previous month trailing days
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      const day = prevMonthDays - i;
      const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
      const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
      cells.push({
        day,
        month: prevMonth,
        year: prevYear,
        isCurrentMonth: false,
        isToday: isToday(prevYear, prevMonth, day),
        dateStr: formatDateString(prevYear, prevMonth, day),
      });
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      cells.push({
        day,
        month: currentMonth,
        year: currentYear,
        isCurrentMonth: true,
        isToday: isToday(currentYear, currentMonth, day),
        dateStr: formatDateString(currentYear, currentMonth, day),
      });
    }

    // Next month leading days (fill to complete 6 rows)
    const totalCells = Math.ceil(cells.length / 7) * 7;
    const remaining = totalCells - cells.length;
    for (let day = 1; day <= remaining; day++) {
      const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
      const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;
      cells.push({
        day,
        month: nextMonth,
        year: nextYear,
        isCurrentMonth: false,
        isToday: isToday(nextYear, nextMonth, day),
        dateStr: formatDateString(nextYear, nextMonth, day),
      });
    }

    return cells;
  }, [currentYear, currentMonth, daysInMonth, firstDayOfMonth, prevMonthDays]);

  // Count events this month
  const monthEventCount = useMemo(() => {
    const prefix = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}`;
    return events.filter((e) => e.date.startsWith(prefix)).length;
  }, [events, currentYear, currentMonth]);

  if (isLoading) return <CalendarSkeleton />;

  return (
    <div className="p-4 sm:p-6 pt-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Calendar
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {monthEventCount} event{monthEventCount !== 1 ? "s" : ""} this month
          </p>
        </div>

        <button
          onClick={() => {
            const dateStr = formatDateString(
              currentYear,
              currentMonth,
              today.getDate()
            );
            setSelectedDate(dateStr);
            setShowCreateModal(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add Event
        </button>
      </div>

      {/* Calendar card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-none border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Month navigation */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrevMonth}
              className="p-2 rounded-lg text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Previous month"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 min-w-[180px] text-center">
              {MONTH_NAMES[currentMonth]} {currentYear}
            </h2>
            <button
              onClick={handleNextMonth}
              className="p-2 rounded-lg text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Next month"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <button
            onClick={handleToday}
            className="px-3 py-1.5 text-sm font-medium text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors border border-primary-200 dark:border-primary-800"
          >
            Today
          </button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 border-b border-gray-200 dark:border-gray-700">
          {DAY_NAMES.map((day) => (
            <div
              key={day}
              className="px-2 py-3 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider"
            >
              {day}
            </div>
          ))}
        </div>

        {monthEventCount === 0 ? (
          <EmptyState
            icon={<CalendarDays className="w-8 h-8" />}
            title="No events this month"
            description="Stay on top of your schedule by adding your first event."
            cta={{
              label: "Add your first event",
              onClick: () => {
                const dateStr = formatDateString(currentYear, currentMonth, new Date().getDate());
                setSelectedDate(dateStr);
                setShowCreateModal(true);
              },
            }}
            className="py-24"
          />
        ) : (
          <>
            {/* Calendar grid */}
            <div className="grid grid-cols-7">
              {calendarCells.map((cell, index) => {
                const cellEvents = eventsByDate[cell.dateStr] || [];
                const maxVisible = 3;
                const visibleEvents = cellEvents.slice(0, maxVisible);
                const moreCount = cellEvents.length - maxVisible;

                return (
                  <div
                    key={`${cell.dateStr}-${index}`}
                    onClick={() =>
                      handleDateClick(cell.year, cell.month, cell.day)
                    }
                    className={`
                      min-h-[100px] sm:min-h-[120px] p-1.5 sm:p-2 border-b border-r border-gray-100 dark:border-gray-700/50
                      cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors
                      ${!cell.isCurrentMonth ? "bg-gray-50/50 dark:bg-gray-900/30" : ""}
                    `}
                  >
                    {/* Day number */}
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className={`
                          inline-flex items-center justify-center w-7 h-7 text-sm rounded-full
                          ${
                            cell.isToday
                              ? "bg-primary-600 text-white font-bold"
                              : cell.isCurrentMonth
                                ? "text-gray-900 dark:text-gray-100 font-medium"
                                : "text-gray-400 dark:text-gray-600"
                          }
                        `}
                      >
                        {cell.day}
                      </span>
                    </div>

                    {/* Events */}
                    <div className="space-y-0.5">
                      {visibleEvents.map((event) => {
                        const colors = EVENT_COLORS[event.color];
                        return (
                          <button
                            key={event.id}
                            onClick={(e) => handleEventClick(event, e)}
                            className={`
                              w-full text-left px-1.5 py-0.5 rounded text-[11px] sm:text-xs font-medium truncate
                              ${colors.bg} ${colors.text} hover:opacity-80 transition-opacity
                            `}
                            title={`${event.title}${event.startTime ? ` • ${event.startTime}` : ""}`}
                          >
                            <span className={`inline-block w-1.5 h-1.5 rounded-full ${colors.dot} mr-1`} />
                            {event.title}
                          </button>
                        );
                      })}
                      {moreCount > 0 && (
                        <div className="text-[11px] text-gray-500 dark:text-gray-400 px-1.5 font-medium">
                          +{moreCount} more
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* Create Event Modal */}
      <CreateEventModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSave={handleCreateEvent}
        selectedDate={selectedDate}
      />

      {/* Event Detail Modal */}
      <EventDetailModal
        isOpen={showDetailModal}
        event={selectedEvent}
        onClose={() => {
          setShowDetailModal(false);
          setSelectedEvent(null);
        }}
        onDelete={handleDeleteEvent}
        onEdit={handleEditEvent}
      />
    </div>
  );
}
