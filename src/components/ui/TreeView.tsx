"use client";

import { useState, useCallback } from "react";
import {
  ChevronRight,
  ChevronDown,
  Folder,
  FolderOpen,
  File,
  FileText,
  FileCode,
  Image as ImageIcon,
  Film,
  Music,
} from "lucide-react";

export interface TreeNode {
  id: string;
  label: string;
  icon?: React.ReactNode;
  children?: TreeNode[];
  /** If not provided, auto-detected from children presence */
  isFolder?: boolean;
}

interface TreeViewProps {
  data: TreeNode[];
  onSelect?: (node: TreeNode) => void;
  defaultExpanded?: string[];
  selectedId?: string;
}

interface TreeItemProps {
  node: TreeNode;
  depth: number;
  expanded: Set<string>;
  selectedId?: string;
  onToggle: (id: string) => void;
  onSelect?: (node: TreeNode) => void;
}

function getFileIcon(label: string) {
  const ext = label.split(".").pop()?.toLowerCase();
  switch (ext) {
    case "ts":
    case "tsx":
    case "js":
    case "jsx":
    case "py":
    case "go":
    case "rs":
      return <FileCode className="h-4 w-4 text-blue-500" />;
    case "md":
    case "txt":
    case "doc":
    case "pdf":
      return <FileText className="h-4 w-4 text-orange-500" />;
    case "png":
    case "jpg":
    case "svg":
    case "gif":
    case "webp":
      return <ImageIcon className="h-4 w-4 text-green-500" />;
    case "mp4":
    case "mov":
    case "webm":
      return <Film className="h-4 w-4 text-purple-500" />;
    case "mp3":
    case "wav":
    case "ogg":
      return <Music className="h-4 w-4 text-pink-500" />;
    default:
      return <File className="h-4 w-4 text-gray-400" />;
  }
}

function TreeItem({
  node,
  depth,
  expanded,
  selectedId,
  onToggle,
  onSelect,
}: TreeItemProps) {
  const isFolder = node.isFolder ?? (node.children && node.children.length > 0);
  const isOpen = expanded.has(node.id);
  const isSelected = selectedId === node.id;

  const icon =
    node.icon ??
    (isFolder
      ? isOpen
        ? <FolderOpen className="h-4 w-4 text-primary-500" />
        : <Folder className="h-4 w-4 text-primary-400" />
      : getFileIcon(node.label));

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          if (isFolder) onToggle(node.id);
          onSelect?.(node);
        }}
        className={`w-full flex items-center gap-1.5 py-1 px-2 rounded-md text-sm transition-colors ${
          isSelected
            ? "bg-primary-50 dark:bg-primary-500/10 text-primary-700 dark:text-primary-400"
            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50"
        }`}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
      >
        {isFolder ? (
          isOpen ? (
            <ChevronDown className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
          ) : (
            <ChevronRight className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
          )
        ) : (
          <span className="w-3.5 flex-shrink-0" />
        )}
        <span className="flex-shrink-0">{icon}</span>
        <span className="truncate">{node.label}</span>
      </button>

      {isFolder && isOpen && node.children && (
        <div>
          {node.children.map((child) => (
            <TreeItem
              key={child.id}
              node={child}
              depth={depth + 1}
              expanded={expanded}
              selectedId={selectedId}
              onToggle={onToggle}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function TreeView({
  data,
  onSelect,
  defaultExpanded = [],
  selectedId: controlledSelectedId,
}: TreeViewProps) {
  const [expanded, setExpanded] = useState<Set<string>>(
    () => new Set(defaultExpanded)
  );
  const [internalSelected, setInternalSelected] = useState<string | undefined>();
  const selectedId = controlledSelectedId ?? internalSelected;

  const handleToggle = useCallback((id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const handleSelect = useCallback(
    (node: TreeNode) => {
      setInternalSelected(node.id);
      onSelect?.(node);
    },
    [onSelect]
  );

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-2 space-y-0.5">
      {data.map((node) => (
        <TreeItem
          key={node.id}
          node={node}
          depth={0}
          expanded={expanded}
          selectedId={selectedId}
          onToggle={handleToggle}
          onSelect={handleSelect}
        />
      ))}
    </div>
  );
}
