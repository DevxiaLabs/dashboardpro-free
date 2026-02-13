export interface FileItem {
  id: string;
  name: string;
  type: "folder" | "image" | "document" | "spreadsheet" | "video" | "audio" | "archive" | "code" | "other";
  size?: number; // bytes
  modified: string;
  shared?: boolean;
  starred?: boolean;
  parentId?: string;
}

export const files: FileItem[] = [
  // Root folders
  { id: "f1", name: "Documents", type: "folder", modified: "2026-02-10", starred: true },
  { id: "f2", name: "Images", type: "folder", modified: "2026-02-08" },
  { id: "f3", name: "Projects", type: "folder", modified: "2026-02-12", starred: true },
  { id: "f4", name: "Archives", type: "folder", modified: "2026-01-15" },

  // Root files
  { id: "r1", name: "README.md", type: "code", size: 4200, modified: "2026-02-11", starred: true },
  { id: "r2", name: "budget-2026.xlsx", type: "spreadsheet", size: 245000, modified: "2026-02-09", shared: true },
  { id: "r3", name: "presentation.pdf", type: "document", size: 8500000, modified: "2026-02-07" },
  { id: "r4", name: "meeting-notes.docx", type: "document", size: 52000, modified: "2026-02-12" },
  { id: "r5", name: "logo-final.svg", type: "image", size: 18000, modified: "2026-02-06" },
  { id: "r6", name: "demo-video.mp4", type: "video", size: 125000000, modified: "2026-01-28", shared: true },
  { id: "r7", name: "podcast-ep12.mp3", type: "audio", size: 45000000, modified: "2026-02-01" },
  { id: "r8", name: "backup-jan.zip", type: "archive", size: 320000000, modified: "2026-01-31" },
  { id: "r9", name: "analytics-report.pdf", type: "document", size: 1200000, modified: "2026-02-05", starred: true },
  { id: "r10", name: "index.tsx", type: "code", size: 3800, modified: "2026-02-11" },
  { id: "r11", name: "styles.css", type: "code", size: 12400, modified: "2026-02-10" },
  { id: "r12", name: "team-photo.jpg", type: "image", size: 4500000, modified: "2026-02-03", shared: true },
];
