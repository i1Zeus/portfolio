"use client";

import { projects } from "@/data";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { BiTerminal } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { useLocale } from "./LocaleContext";

interface LogEntry {
  type: "input" | "output" | "error";
  text: string;
}

export default function TerminalOverlay() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const router = useRouter();
  const { dict, locale, switchLocale } = useLocale();

  const [logs, setLogs] = useState<LogEntry[]>([
    {
      type: "output",
      text: dict.terminal.welcome,
    },
  ]);

  const logsEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Update initial welcome message if language changes
  useEffect(() => {
    setLogs((prev) => {
      if (prev.length === 1 && prev[0].type === "output") {
        return [{ type: "output", text: dict.terminal.welcome }];
      }
      return prev;
    });
  }, [dict]);

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
      50
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
      case "مساعدة":
        outputText = dict.terminal.helpText;
        break;

      case "about":
      case "عني":
        outputText = dict.terminal.aboutText;
        break;

      case "skills":
      case "مهارات":
        outputText = dict.terminal.skillsText;
        break;

      case "projects":
      case "مشاريع":
        outputText = `${dict.terminal.projectsHeading}\n-------------------------------------------\n${projects
          .map((p) => {
            const pTitle = dict.projects.items[p.id]?.title || p.title;
            const pDes = dict.projects.items[p.id]?.des || p.des;
            return `[${p.id}] ${pTitle} - ${pDes.substring(0, 80)}...`;
          })
          .join("\n")}\n\n${dict.terminal.projectUsageHint}`;
        break;

      case "project":
      case "مشروع": {
        const idStr = args[0];
        if (!idStr) {
          outputText =
            locale === "ar"
              ? "خطأ: يرجى تحديد معرف المشروع. الاستخدام: project <id> (مثال: project 0)"
              : "Error: Please specify a project ID. Usage: project <id> (e.g., project 0)";
          isError = true;
          break;
        }
        const idNum = parseInt(idStr, 10);
        const match = projects.find((p) => p.id === idNum);
        if (!match) {
          outputText =
            locale === "ar"
              ? `خطأ: لم يتم العثور على مشروع بالمعرف ${idNum}. اكتب 'projects' لعرض المعرفات المتاحة.`
              : `Error: Project with ID ${idNum} not found. Type 'projects' to list valid IDs.`;
          isError = true;
          break;
        }
        const matchTitle = dict.projects.items[idNum]?.title || match.title;
        outputText =
          locale === "ar"
            ? `جارٍ التوجيه إلى صفحة المشروع '${matchTitle}'...`
            : `Redirecting you to the project page for '${matchTitle}'...`;
        setTimeout(() => {
          setIsOpen(false);
          router.push(`/${locale}/project/${idNum}`);
        }, 800);
        break;
      }

      case "lang":
      case "language":
      case "لغة": {
        const target = args[0]?.toLowerCase();
        if (target === "en" || target === "ar") {
          switchLocale(target);
          outputText =
            target === "ar"
              ? "تم تبديل اللغة إلى العربية بنجاح."
              : "Language switched to English successfully.";
        } else {
          outputText = "Usage: lang <en|ar>";
          isError = true;
        }
        break;
      }

      case "qr":
      case "nfc":
        outputText =
          locale === "ar"
            ? "جارٍ التوجيه إلى بطاقة NFC الذكية ومحفظة الروابط..."
            : "Redirecting to Hussein's NFC Smart Wallet & Digital Business Card (/qr)...";
        setTimeout(() => {
          setIsOpen(false);
          router.push(`/${locale}/qr`);
        }, 800);
        break;

      case "contact":
      case "تواصل":
        outputText = dict.terminal.contactText;
        break;

      case "clear":
      case "مسح":
        setLogs([]);
        setInputVal("");
        return;

      case "exit":
      case "close":
      case "خروج":
        setIsOpen(false);
        setInputVal("");
        return;

      default:
        outputText = dict.terminal.cmdNotFound.replace("{command}", command);
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
      const commandsList = [
        "help",
        "about",
        "skills",
        "projects",
        "project",
        "lang",
        "qr",
        "nfc",
        "contact",
        "clear",
        "exit",
      ];
      const match = commandsList.find((c) =>
        c.startsWith(inputVal.toLowerCase())
      );
      if (match) {
        setInputVal(match);
      }
    }
  };

  return (
    <>
      {/* Floating terminal action button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-5 end-5 z-[4999] flex h-11 w-11 items-center justify-center border border-line-strong bg-ink/80 text-paper/80 backdrop-blur-md hover:bg-paper hover:text-ink active:scale-95 transition-colors duration-300 select-none cursor-pointer"
          title={dict.terminal.buttonTitle}
        >
          <BiTerminal className="size-5" />
        </button>
      )}

      {/* Fullscreen CLI Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[9999] flex flex-col justify-between bg-black/95 backdrop-blur-md font-mono text-sm md:text-base text-emerald-400 select-none overflow-hidden"
          onClick={() => inputRef.current?.focus()}
        >
          <div className="flex items-center justify-between border-b border-emerald-950 px-6 py-4 bg-[#0a0f0d]/90 relative z-20">
            <div className="flex items-center gap-3">
              <BiTerminal className="size-5 text-emerald-500" />
              <span className="text-xs uppercase tracking-wider text-emerald-500 font-semibold">
                {dict.terminal.headerTitle}
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs text-emerald-600">
              <span className="hidden sm:inline">{dict.terminal.hotkeyHint}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
                className="hover:text-emerald-300 p-1 transition-colors"
                title={locale === "ar" ? "إغلاق (exit)" : "Close (exit)"}
                aria-label={locale === "ar" ? "إغلاق نافذة الأوامر" : "Close terminal"}
              >
                <IoClose className="size-5" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3 scrollbar-thin scrollbar-thumb-emerald-900 scrollbar-track-transparent">
            {logs.map((log, index) => (
              <div key={index} className="leading-relaxed">
                {log.type === "input" ? (
                  <div className="flex items-center gap-2 text-emerald-300">
                    <span className="text-emerald-500 font-bold">$</span>
                    <span>{log.text}</span>
                  </div>
                ) : (
                  <pre
                    className={`whitespace-pre-wrap font-mono ${
                      log.type === "error"
                        ? "text-rose-400"
                        : "text-emerald-400/90"
                    }`}
                  >
                    {log.text}
                  </pre>
                )}
              </div>
            ))}
            <div ref={logsEndRef} />
          </div>

          <div className="flex items-center gap-2 border-t border-emerald-950 bg-[#060a08]/90 px-6 py-3 relative z-20">
            <span className="text-emerald-500 font-bold text-lg select-none">
              $
            </span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={locale === "ar" ? "اكتب أمراً هنا (مثال: 'help')..." : "Type a command (e.g., 'help', 'about', 'projects')..."}
              className="flex-1 bg-transparent text-emerald-300 placeholder-emerald-800 outline-none font-mono text-sm md:text-base caret-emerald-400"
              autoFocus
            />
          </div>
        </div>
      )}
    </>
  );
}
