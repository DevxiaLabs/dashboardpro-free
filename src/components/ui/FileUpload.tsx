"use client";

import { useCallback, useRef, useState } from "react";
import { Upload, X, File, Image as ImageIcon } from "lucide-react";

interface FileUploadProps {
  label?: string;
  accept?: string;
  maxSize?: number;
  multiple?: boolean;
  helperText?: string;
  onChange?: (files: File[]) => void;
}

interface FileEntry {
  file: File;
  id: string;
  preview?: string;
  progress: number;
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function FileUpload({
  label = "Upload files",
  accept,
  maxSize,
  multiple = true,
  helperText,
  onChange,
}: FileUploadProps) {
  const [entries, setEntries] = useState<FileEntry[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const processFiles = useCallback(
    (fileList: FileList | File[]) => {
      setError(null);
      const incoming = Array.from(fileList);
      const valid: FileEntry[] = [];

      for (const file of incoming) {
        if (maxSize && file.size > maxSize) {
          setError(`"${file.name}" exceeds ${formatSize(maxSize)} limit`);
          continue;
        }
        const entry: FileEntry = {
          file,
          id: `${file.name}-${Date.now()}-${Math.random()}`,
          progress: 0,
        };
        if (file.type.startsWith("image/")) {
          entry.preview = URL.createObjectURL(file);
        }
        valid.push(entry);
      }

      setEntries((prev) => {
        const next = multiple ? [...prev, ...valid] : valid.slice(0, 1);
        onChange?.(next.map((e) => e.file));
        return next;
      });

      // Mock upload progress
      for (const entry of valid) {
        let progress = 0;
        const interval = setInterval(() => {
          progress += Math.random() * 30 + 10;
          if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
          }
          setEntries((prev) =>
            prev.map((e) =>
              e.id === entry.id ? { ...e, progress: Math.min(progress, 100) } : e
            )
          );
        }, 200 + Math.random() * 300);
      }
    },
    [maxSize, multiple, onChange]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      if (e.dataTransfer.files.length) processFiles(e.dataTransfer.files);
    },
    [processFiles]
  );

  const removeEntry = useCallback(
    (id: string) => {
      setEntries((prev) => {
        const entry = prev.find((e) => e.id === id);
        if (entry?.preview) URL.revokeObjectURL(entry.preview);
        const next = prev.filter((e) => e.id !== id);
        onChange?.(next.map((e) => e.file));
        return next;
      });
    },
    [onChange]
  );

  return (
    <div className="space-y-3">
      {/* Drop zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`
          relative cursor-pointer rounded-xl border-2 border-dashed p-8
          flex flex-col items-center justify-center gap-3 transition-all
          ${
            dragOver
              ? "border-primary-500 bg-primary-50 dark:bg-primary-500/10"
              : "border-gray-300 dark:border-gray-600 hover:border-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800/50"
          }
        `}
      >
        <div
          className={`rounded-full p-3 transition-colors ${
            dragOver
              ? "bg-primary-100 dark:bg-primary-500/20 text-primary-600"
              : "bg-gray-100 dark:bg-gray-700 text-gray-400"
          }`}
        >
          <Upload className="h-6 w-6" />
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Drag & drop or{" "}
            <span className="text-primary-600 font-medium">browse</span>
          </p>
        </div>
        {helperText && (
          <p className="text-xs text-gray-400 dark:text-gray-500">
            {helperText}
          </p>
        )}
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.length) processFiles(e.target.files);
            e.target.value = "";
          }}
        />
      </div>

      {/* Error */}
      {error && (
        <p className="text-sm text-danger-600 dark:text-danger-500">{error}</p>
      )}

      {/* File list */}
      {entries.length > 0 && (
        <ul className="space-y-2">
          {entries.map((entry) => (
            <li
              key={entry.id}
              className="flex items-center gap-3 rounded-lg border border-gray-200 dark:border-gray-700 p-3 bg-white dark:bg-gray-800"
            >
              {/* Thumbnail or icon */}
              {entry.preview ? (
                <img
                  src={entry.preview}
                  alt={entry.file.name}
                  className="h-10 w-10 rounded-md object-cover flex-shrink-0"
                />
              ) : (
                <div className="h-10 w-10 rounded-md bg-gray-100 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
                  <File className="h-5 w-5 text-gray-400" />
                </div>
              )}

              {/* Info + progress */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-200 truncate">
                  {entry.file.name}
                </p>
                <p className="text-xs text-gray-400">
                  {formatSize(entry.file.size)}
                  {entry.progress < 100 && ` — ${Math.round(entry.progress)}%`}
                </p>
                {entry.progress < 100 && (
                  <div className="mt-1 h-1 w-full rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary-500 transition-all duration-300"
                      style={{ width: `${entry.progress}%` }}
                    />
                  </div>
                )}
              </div>

              {/* Remove */}
              <button
                onClick={() => removeEntry(entry.id)}
                className="flex-shrink-0 p-1 rounded-md text-gray-400 hover:text-danger-600 hover:bg-danger-50 dark:hover:bg-danger-500/10 transition-colors"
                aria-label={`Remove ${entry.file.name}`}
              >
                <X className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
