"use client";

import { projects } from "@/data";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { BiTerminal } from "react-icons/bi";
import { IoClose } from "react-icons/io5";

interface LogEntry {
  type: "input" | "output" | "error";
  text: string;
}

export default function TerminalOverlay() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      type: "output",
      text: "Hussein's Portfolio CLI [Version 2.0.0]\n(c) 2026 Hussein. All rights reserved.\n\nType 'help' to view available commands.",
    },
  ]);

  const router = useRouter();
  const logsEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Toggle terminal via global hotkey (Ctrl + ` or Ctrl + \)
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey && e.key === "`") || (e.ctrlKey && e.key === "\\")) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, []);

  // Auto scroll to bottom
  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs, isOpen]);

  // Focus input on terminal click
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    // Save history
    const newHistory = [trimmed, ...history.filter((h) => h !== trimmed)].slice(
      0,
      50,
    );
    setHistory(newHistory);
    setHistoryIndex(-1);

    const newLogs = [...logs, { type: "input" as const, text: trimmed }];

    const parts = trimmed.split(" ");
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    let outputText = "";
    let isError = false;

    switch (command) {
      case "help":
        outputText = `Available Commands:
  help      - Show this help directory
  about     - Learn more about Hussein
  skills    - List tech stack & proficiencies
  projects  - List all projects and their IDs
  project   - View project details. Usage: project <id> (e.g. project 0)
  contact   - Display contact details & social networks
  clear     - Clear terminal buffer
  exit      - Close terminal overlay`;
        break;

      case "about":
        outputText = `About Hussein:
-------------------------------------------
I am a dedicated full-stack developer and UI/UX engineer with a passion for constructing premium, highly interactive web applications. Specializing in the Next.js ecosystem, I design, code, and deploy solutions from the ground up, prioritizing client collaboration and system reliability.`;
        break;

      case "skills":
        outputText = `Skills & Technologies:
-------------------------------------------
- Frontend: React.js, Next.js, TypeScript, Tailwind CSS, Framer Motion
- Backend: PHP/Laravel, Node.js (Express), Serverless Handlers
- Databases: PostgreSQL, MySQL, MongoDB, Redis
- Core Competencies: System Architecture, UX/UI Design, Full-Stack Dev`;
        break;

      case "projects":
        outputText = `Portfolio Projects:
-------------------------------------------
${projects
  .map((p) => `[${p.id}] ${p.title} - ${p.des.substring(0, 80)}...`)
  .join("\n")}

Type 'project <id>' to view the interactive detail page.`;
        break;

      case "project": {
        const idStr = args[0];
        if (!idStr) {
          outputText =
            "Error: Please specify a project ID. Usage: project <id> (e.g., project 0)";
          isError = true;
          break;
        }
        const idNum = parseInt(idStr, 10);
        const match = projects.find((p) => p.id === idNum);
        if (!match) {
          outputText = `Error: Project with ID ${idStr} not found. Type 'projects' to view all.`;
          isError = true;
          break;
        }
        outputText = `Redirecting you to the project page for '${match.title}'...`;
        setTimeout(() => {
          setIsOpen(false);
          router.push(`/project/${idNum}`);
        }, 1000);
        break;
      }

      case "contact":
        outputText = `Contact Details & Socials:
-------------------------------------------
- GitHub:   https://github.com/i1Zeus
- LinkedIn: https://www.linkedin.com/in/i1zeus
- X:        https://x.com/i1Zeus
- Instagram: https://www.instagram.com/hxg.1

Reach out for client collaborations or full-time opportunities!`;
        break;

      case "clear":
        setLogs([]);
        setInputVal("");
        return;

      case "exit":
      case "close":
        setIsOpen(false);
        setInputVal("");
        return;

      default:
        outputText = `Command not recognized: '${command}'. Type 'help' to see list of commands.`;
        isError = true;
    }

    setLogs([
      ...newLogs,
      { type: isError ? "error" : "output", text: outputText },
    ]);
    setInputVal("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(inputVal);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIdx = historyIndex + 1;
      if (nextIdx < history.length) {
        setHistoryIndex(nextIdx);
        setInputVal(history[nextIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextIdx = historyIndex - 1;
      if (nextIdx >= 0) {
        setHistoryIndex(nextIdx);
        setInputVal(history[nextIdx]);
      } else {
        setHistoryIndex(-1);
        setInputVal("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      // Auto-complete suggestions
      const commandsList = [
        "help",
        "about",
        "skills",
        "projects",
        "project",
        "contact",
        "clear",
        "exit",
      ];
      const match = commandsList.find((c) =>
        c.startsWith(inputVal.toLowerCase()),
      );
      if (match) {
        setInputVal(match);
      }
    }
  };

  return (
    <>
      {/* Floating terminal action button (hidden when terminal is open) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-[4999] flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 backdrop-blur-md shadow-lg shadow-emerald-500/10 hover:bg-emerald-500 hover:text-black hover:scale-105 active:scale-95 transition-all duration-300 select-none cursor-pointer"
          title="Open Developer Terminal (Ctrl + `)"
        >
          <BiTerminal className="size-7 animate-pulse" />
        </button>
      )}

      {/* Fullscreen CLI Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[9999] flex flex-col justify-between bg-black/95 backdrop-blur-md font-mono text-sm md:text-base text-emerald-400 select-none overflow-hidden"
          onClick={() => inputRef.current?.focus()}
        >
          {/* CRT Scanline Filter overlay effect */}
          <div className="absolute inset-0 pointer-events-none z-[10000] bg-scanlines opacity-[0.05]" />
          <div className="absolute inset-0 pointer-events-none z-[10000] animate-flicker bg-black/10 opacity-[0.03]" />

          {/* Terminal Header */}
          <div className="flex items-center justify-between border-b border-emerald-950 px-6 py-4 bg-[#0a0f0d]/90 relative z-20">
            <div className="flex items-center gap-3">
              <BiTerminal className="size-5 text-emerald-500" />
              <span className="text-xs uppercase tracking-wider text-emerald-500 font-semibold">
                Developer Command Prompt (CLI)
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs text-emerald-600">
              <span className="hidden sm:inline">Hotkey: Ctrl + `</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
                className="p-1 rounded-full border border-emerald-900/40 hover:bg-emerald-950/60 hover:text-white transition-all cursor-pointer"
                aria-label="Close Terminal"
              >
                <IoClose size={18} />
              </button>
            </div>
          </div>

          {/* Logs Output Screen */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4 custom-scrollbar relative z-20">
            {logs.map((log, index) => (
              <div
                key={index}
                className="whitespace-pre-wrap leading-relaxed select-text"
              >
                {log.type === "input" ? (
                  <div className="flex items-start text-emerald-300">
                    <span className="text-emerald-500 mr-2 shrink-0">
                      izeus@portfolio:~$
                    </span>
                    <span>{log.text}</span>
                  </div>
                ) : (
                  <div
                    className={
                      log.type === "error"
                        ? "text-rose-400 pl-4 border-l border-rose-800/40 font-light"
                        : "text-emerald-400/90 pl-4 border-l border-emerald-950 font-light"
                    }
                  >
                    {log.text}
                  </div>
                )}
              </div>
            ))}
            <div ref={logsEndRef} />
          </div>

          {/* Terminal Input Prompt */}
          <div className="border-t border-emerald-950 px-6 py-4 bg-[#050706]/95 flex items-center relative z-20">
            <span className="text-emerald-500 mr-2 shrink-0 select-none">
              izeus@portfolio:~$
            </span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-none outline-none focus:ring-0 p-0 text-emerald-300 placeholder-emerald-800 caret-emerald-400 font-mono"
              placeholder="Type command here... (Tab to autocomplete)"
              autoComplete="off"
              autoCapitalize="none"
              spellCheck="false"
            />
          </div>
        </div>
      )}

      {/* Scanline and flicker animation style tags inline for neatness */}
      <style jsx global>{`
        .bg-scanlines {
          background:
            linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%),
            linear-gradient(
              90deg,
              rgba(255, 0, 0, 0.06),
              rgba(0, 255, 0, 0.02),
              rgba(0, 0, 255, 0.06)
            );
          background-size:
            100% 4px,
            6px 100%;
        }
        @keyframes flicker {
          0% {
            opacity: 0.15;
          }
          50% {
            opacity: 0.12;
          }
          100% {
            opacity: 0.15;
          }
        }
        .animate-flicker {
          animation: flicker 0.15s infinite;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #064e3b;
          border-radius: 9999px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #059669;
        }
      `}</style>
    </>
  );
}
