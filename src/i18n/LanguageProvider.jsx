import { useCallback, useEffect, useMemo, useState } from "react";
import { LOCALES, dictionary } from "./dictionary";
import { LanguageContext } from "./useI18n";

const STORAGE_KEY = "aperture.lang";
const DEFAULT_LANG = "en";

function readStoredLang() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored && LOCALES[stored] ? stored : DEFAULT_LANG;
  } catch {
    return DEFAULT_LANG;
  }
}

export default function LanguageProvider({ children }) {
  const [lang, setLang] = useState(readStoredLang);
  const dir = LOCALES[lang].dir;


  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = dir;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      void 0;
    }
  }, [lang, dir]);

  const t = useCallback(
    (key, vars) => {
      const raw = dictionary[lang]?.[key] ?? dictionary.en[key] ?? key;
      if (!vars) return raw;
      return Object.entries(vars).reduce(
        (out, [name, value]) => out.replaceAll(`{${name}}`, String(value)),
        raw
      );
    },
    [lang]
  );

  const formatNumber = useCallback(
    (value, options) =>
      new Intl.NumberFormat(LOCALES[lang].intl, options).format(value),
    [lang]
  );

  const value = useMemo(
    () => ({
      lang,
      dir,
      isRtl: dir === "rtl",
      setLang,
      toggleLang: () => setLang((prev) => (prev === "en" ? "fa" : "en")),
      t,
      formatNumber,
      locales: LOCALES,
    }),
    [lang, dir, t, formatNumber]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
