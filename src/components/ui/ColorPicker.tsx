"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Pipette, Check, Copy } from "lucide-react";

interface ColorPickerProps {
  value?: string;
  defaultValue?: string;
  onChange?: (color: string) => void;
  presets?: string[];
  label?: string;
  showInput?: boolean;
}

const DEFAULT_PRESETS = [
  "#ef4444", "#f97316", "#f59e0b", "#eab308",
  "#84cc16", "#22c55e", "#14b8a6", "#06b6d4",
  "#3b82f6", "#6366f1", "#8b5cf6", "#a855f7",
  "#d946ef", "#ec4899", "#f43f5e", "#64748b",
  "#000000", "#ffffff",
];

function hexToHSL(hex: string): { h: number; s: number; l: number } {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0, s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return { h: h * 360, s: s * 100, l: l * 100 };
}

function hslToHex(h: number, s: number, l: number): string {
  s /= 100; l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

export default function ColorPicker({
  value: controlledValue,
  defaultValue = "#3b82f6",
  onChange,
  presets = DEFAULT_PRESETS,
  label,
  showInput = true,
}: ColorPickerProps) {
  const [internalColor, setInternalColor] = useState(defaultValue);
  const color = controlledValue ?? internalColor;
  const [copied, setCopied] = useState(false);
  const [dragging, setDragging] = useState<"hue" | "saturation" | null>(null);
  const satRef = useRef<HTMLDivElement>(null);
  const hueRef = useRef<HTMLDivElement>(null);

  const hsl = hexToHSL(color);

  const setColor = useCallback(
    (c: string) => {
      if (!controlledValue) setInternalColor(c);
      onChange?.(c);
    },
    [controlledValue, onChange]
  );

  const handleSaturationMove = useCallback(
    (clientX: number, clientY: number) => {
      const rect = satRef.current?.getBoundingClientRect();
      if (!rect) return;
      const s = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
      const l = Math.max(0, Math.min(100, 100 - ((clientY - rect.top) / rect.height) * 100));
      // Convert SV to SL approximation
      const v = l / 100;
      const sv = s / 100;
      const ll = v * (1 - sv / 2);
      const ss = ll === 0 || ll === 1 ? 0 : (v - ll) / Math.min(ll, 1 - ll);
      setColor(hslToHex(hsl.h, ss * 100, ll * 100));
    },
    [hsl.h, setColor]
  );

  const handleHueMove = useCallback(
    (clientX: number) => {
      const rect = hueRef.current?.getBoundingClientRect();
      if (!rect) return;
      const h = Math.max(0, Math.min(360, ((clientX - rect.left) / rect.width) * 360));
      setColor(hslToHex(h, hsl.s, hsl.l));
    },
    [hsl.s, hsl.l, setColor]
  );

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: MouseEvent) => {
      if (dragging === "saturation") handleSaturationMove(e.clientX, e.clientY);
      else handleHueMove(e.clientX);
    };
    const onUp = () => setDragging(null);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [dragging, handleSaturationMove, handleHueMove]);

  const copyColor = useCallback(() => {
    navigator.clipboard?.writeText(color);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [color]);

  // Saturation/Value thumb position (approximate)
  const v = (hsl.l / 100) + (hsl.s / 100) * Math.min(hsl.l / 100, 1 - hsl.l / 100);
  const sv = v === 0 ? 0 : 2 * (1 - hsl.l / 100 / v);
  const thumbX = (sv * 100) || 0;
  const thumbY = 100 - (v * 100) || 0;

  return (
    <div className="space-y-3">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}

      <div className="w-full max-w-xs space-y-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
        {/* Saturation/Brightness area */}
        <div
          ref={satRef}
          className="relative h-40 w-full rounded-lg cursor-crosshair select-none overflow-hidden"
          style={{
            background: `linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, hsl(${hsl.h}, 100%, 50%))`,
          }}
          onMouseDown={(e) => {
            setDragging("saturation");
            handleSaturationMove(e.clientX, e.clientY);
          }}
        >
          <div
            className="absolute w-4 h-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-md pointer-events-none"
            style={{
              left: `${thumbX}%`,
              top: `${thumbY}%`,
              backgroundColor: color,
            }}
          />
        </div>

        {/* Hue slider */}
        <div
          ref={hueRef}
          className="relative h-3 w-full rounded-full cursor-pointer select-none"
          style={{
            background:
              "linear-gradient(to right, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)",
          }}
          onMouseDown={(e) => {
            setDragging("hue");
            handleHueMove(e.clientX);
          }}
        >
          <div
            className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-white shadow-md pointer-events-none"
            style={{
              left: `${(hsl.h / 360) * 100}%`,
              backgroundColor: `hsl(${hsl.h}, 100%, 50%)`,
            }}
          />
        </div>

        {/* Color preview + hex input */}
        {showInput && (
          <div className="flex items-center gap-2">
            <div
              className="w-9 h-9 rounded-lg border border-gray-200 dark:border-gray-600 flex-shrink-0"
              style={{ backgroundColor: color }}
            />
            <input
              type="text"
              value={color}
              onChange={(e) => {
                const v = e.target.value;
                if (/^#[0-9a-fA-F]{6}$/.test(v)) setColor(v);
                else if (!controlledValue) setInternalColor(v);
              }}
              className="flex-1 px-3 py-1.5 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 font-mono focus:outline-none focus:ring-2 focus:ring-primary-500"
              maxLength={7}
            />
            <button
              onClick={copyColor}
              className="p-1.5 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              title="Copy hex"
            >
              {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            </button>
          </div>
        )}

        {/* Presets */}
        {presets.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {presets.map((preset) => (
              <button
                key={preset}
                onClick={() => setColor(preset)}
                className={`w-6 h-6 rounded-md border transition-transform hover:scale-110 ${
                  color.toLowerCase() === preset.toLowerCase()
                    ? "border-primary-500 ring-2 ring-primary-500/30 scale-110"
                    : "border-gray-200 dark:border-gray-600"
                }`}
                style={{ backgroundColor: preset }}
                title={preset}
                aria-label={`Select color ${preset}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
