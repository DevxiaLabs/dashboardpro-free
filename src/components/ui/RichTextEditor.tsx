"use client";

import { useCallback, useRef, useState } from "react";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link,
  Image as ImageIcon,
  Code,
  Heading1,
  Heading2,
  Quote,
  Undo,
  Redo,
  Type,
} from "lucide-react";

interface RichTextEditorProps {
  defaultValue?: string;
  placeholder?: string;
  onChange?: (html: string) => void;
  minHeight?: string;
}

interface ToolbarButton {
  icon: React.ReactNode;
  command: string;
  value?: string;
  label: string;
  group?: string;
}

function ToolbarBtn({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      aria-label={label}
      className={`p-1.5 rounded-md transition-colors ${
        active
          ? "bg-primary-100 dark:bg-primary-500/20 text-primary-700 dark:text-primary-400"
          : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-200"
      }`}
    >
      {icon}
    </button>
  );
}

function Separator() {
  return (
    <div className="w-px h-5 bg-gray-200 dark:bg-gray-600 mx-1" />
  );
}

export default function RichTextEditor({
  defaultValue = "",
  placeholder = "Start writing...",
  onChange,
  minHeight = "200px",
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isEmpty, setIsEmpty] = useState(!defaultValue);
  const [, setForceRender] = useState(0);

  const exec = useCallback(
    (command: string, value?: string) => {
      document.execCommand(command, false, value);
      editorRef.current?.focus();
      setForceRender((n) => n + 1);
    },
    []
  );

  const isActive = useCallback((command: string) => {
    try {
      return document.queryCommandState(command);
    } catch {
      return false;
    }
  }, []);

  const handleInput = useCallback(() => {
    const html = editorRef.current?.innerHTML || "";
    const text = editorRef.current?.textContent || "";
    setIsEmpty(!text.trim());
    onChange?.(html);
  }, [onChange]);

  const handleLink = useCallback(() => {
    const url = prompt("Enter URL:");
    if (url) exec("createLink", url);
  }, [exec]);

  const handleImage = useCallback(() => {
    const url = prompt("Enter image URL:");
    if (url) exec("insertImage", url);
  }, [exec]);

  const iconSize = 16;

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-800">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 p-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
        <ToolbarBtn
          icon={<Undo size={iconSize} />}
          label="Undo"
          onClick={() => exec("undo")}
        />
        <ToolbarBtn
          icon={<Redo size={iconSize} />}
          label="Redo"
          onClick={() => exec("redo")}
        />

        <Separator />

        <ToolbarBtn
          icon={<Type size={iconSize} />}
          label="Normal text"
          onClick={() => exec("formatBlock", "p")}
        />
        <ToolbarBtn
          icon={<Heading1 size={iconSize} />}
          label="Heading 1"
          onClick={() => exec("formatBlock", "h1")}
        />
        <ToolbarBtn
          icon={<Heading2 size={iconSize} />}
          label="Heading 2"
          onClick={() => exec("formatBlock", "h2")}
        />
        <ToolbarBtn
          icon={<Quote size={iconSize} />}
          label="Blockquote"
          active={isActive("formatBlock")}
          onClick={() => exec("formatBlock", "blockquote")}
        />

        <Separator />

        <ToolbarBtn
          icon={<Bold size={iconSize} />}
          label="Bold"
          active={isActive("bold")}
          onClick={() => exec("bold")}
        />
        <ToolbarBtn
          icon={<Italic size={iconSize} />}
          label="Italic"
          active={isActive("italic")}
          onClick={() => exec("italic")}
        />
        <ToolbarBtn
          icon={<Underline size={iconSize} />}
          label="Underline"
          active={isActive("underline")}
          onClick={() => exec("underline")}
        />
        <ToolbarBtn
          icon={<Strikethrough size={iconSize} />}
          label="Strikethrough"
          active={isActive("strikeThrough")}
          onClick={() => exec("strikeThrough")}
        />
        <ToolbarBtn
          icon={<Code size={iconSize} />}
          label="Inline code"
          onClick={() => {
            const sel = window.getSelection();
            if (sel && sel.rangeCount > 0) {
              const range = sel.getRangeAt(0);
              const code = document.createElement("code");
              code.className =
                "px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-sm font-mono text-primary-700 dark:text-primary-400";
              range.surroundContents(code);
              handleInput();
            }
          }}
        />

        <Separator />

        <ToolbarBtn
          icon={<List size={iconSize} />}
          label="Bullet list"
          active={isActive("insertUnorderedList")}
          onClick={() => exec("insertUnorderedList")}
        />
        <ToolbarBtn
          icon={<ListOrdered size={iconSize} />}
          label="Numbered list"
          active={isActive("insertOrderedList")}
          onClick={() => exec("insertOrderedList")}
        />

        <Separator />

        <ToolbarBtn
          icon={<AlignLeft size={iconSize} />}
          label="Align left"
          active={isActive("justifyLeft")}
          onClick={() => exec("justifyLeft")}
        />
        <ToolbarBtn
          icon={<AlignCenter size={iconSize} />}
          label="Align center"
          active={isActive("justifyCenter")}
          onClick={() => exec("justifyCenter")}
        />
        <ToolbarBtn
          icon={<AlignRight size={iconSize} />}
          label="Align right"
          active={isActive("justifyRight")}
          onClick={() => exec("justifyRight")}
        />

        <Separator />

        <ToolbarBtn
          icon={<Link size={iconSize} />}
          label="Insert link"
          onClick={handleLink}
        />
        <ToolbarBtn
          icon={<ImageIcon size={iconSize} />}
          label="Insert image"
          onClick={handleImage}
        />
      </div>

      {/* Editor area */}
      <div className="relative">
        {isEmpty && (
          <div className="absolute top-0 left-0 p-4 text-gray-400 dark:text-gray-500 pointer-events-none select-none">
            {placeholder}
          </div>
        )}
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          onInput={handleInput}
          onMouseUp={() => setForceRender((n) => n + 1)}
          onKeyUp={() => setForceRender((n) => n + 1)}
          dangerouslySetInnerHTML={{ __html: defaultValue }}
          className="p-4 outline-none text-sm text-gray-800 dark:text-gray-200 [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mb-2 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mb-2 [&_blockquote]:border-l-4 [&_blockquote]:border-primary-300 [&_blockquote]:dark:border-primary-600 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-gray-500 [&_ul]:list-disc [&_ul]:ml-5 [&_ol]:list-decimal [&_ol]:ml-5 [&_a]:text-primary-600 [&_a]:underline [&_img]:max-w-full [&_img]:rounded-lg [&_img]:my-2"
          style={{ minHeight }}
        />
      </div>
    </div>
  );
}
