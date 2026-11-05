"use client";

import { useEffect, useRef, useState } from "react";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";

const LANGUAGES = [
  { label: "English", code: "" },
  { label: "Deutsch", code: "de" },
  { label: "Français", code: "fr" },
  { label: "Italiano", code: "it" },
  { label: "Русский", code: "ru" },
  { label: "中文", code: "zh-CN" },
  { label: "العربية", code: "ar" },
];

/** Read the active language code from the googtrans cookie, e.g. /en/de → "de" */
function getActiveLang() {
  if (typeof document === "undefined") return "";
  const match = document.cookie.match(/googtrans=\/en\/([^;]+)/);
  return match ? match[1] : "";
}

export default function LanguageSwitcher({ mobile = false }) {
  const [open, setOpen] = useState(false);
  const [activeLang, setActiveLang] = useState("");
  const ref = useRef(null);

  // Read cookie on mount (client-only)
  useEffect(() => {
    setActiveLang(getActiveLang());
  }, []);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  function selectLanguage(code) {
    setOpen(false);

    // Switching back to English: clear the cookie and reload so the original
    // DOM is fully restored (Google Translate cannot un-translate in-place).
    if (code === "") {
      // Remove the googtrans cookie on both the current path and root
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=" + location.hostname;
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=." + location.hostname;
      window.location.reload();
      return;
    }

    const select = document.querySelector("select.goog-te-combo");
    if (!select) return;
    select.value = code;
    select.dispatchEvent(new Event("change"));
    setActiveLang(code);
  }

  const currentLabel =
    LANGUAGES.find((l) => l.code === activeLang)?.label ?? "English";

  return (
    <div ref={ref} className="relative">
      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-[14px] font-semibold transition-colors",
          mobile
            ? "w-full text-brand-ink hover:bg-brand-sky hover:text-brand-blue"
            : "text-white/90 hover:text-white"
        )}
      >
        <Globe className="size-[15px] shrink-0" aria-hidden="true" />
        <span>{currentLabel}</span>
      </button>

      {/* Dropdown panel */}
      {open && (
        <ul
          role="listbox"
          aria-label="Select language"
          className={cn(
            "absolute right-0 top-full z-50 min-w-[160px] rounded-xl bg-white shadow-lg border border-gray-100 py-2 mt-1",
            mobile && "left-0 right-auto"
          )}
        >
          {LANGUAGES.map(({ label, code }) => {
            const isActive = code === activeLang;
            return (
              <li key={code} role="option" aria-selected={isActive}>
                <button
                  type="button"
                  onClick={() => selectLanguage(code)}
                  className={cn(
                    "block w-full px-4 py-2 text-left text-[13.5px] font-medium text-brand-ink/80 hover:bg-brand-sky hover:text-brand-blue",
                    isActive && "text-brand-blue font-semibold"
                  )}
                >
                  {label}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
