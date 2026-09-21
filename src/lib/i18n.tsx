"use client";

/**
 * i18n.tsx — نظام اللغة الثنائي (عربي / إنجليزي)
 * - اللغة الافتراضية عربي (ar) واتجاه RTL
 * - بتتخزن في localStorage بمفتاح wt_lang
 * - التبديل بيحدث lang/dir على مستوى <html> فورًا + بيبعت حدث
 *   wt-lang-changed عشان أي مكوّن تاني يتزامن في نفس الضغطة
 * - layout.tsx فيه سكريبت مبكر بيقرا نفس المفتاح قبل الرسم عشان
 *   مفيش وميض (anti-flash)
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Lang = "ar" | "en";

export const LANG_STORAGE_KEY = "wt_lang";
export const LANG_EVENT = "wt-lang-changed";

interface LangContextValue {
  lang: Lang;
  dir: "rtl" | "ltr";
  setLang: (l: Lang) => void;
  /** اختيار النص حسب اللغة الحالية */
  t: (ar: string, en: string) => string;
}

const LangContext = createContext<LangContextValue>({
  lang: "ar",
  dir: "rtl",
  setLang: () => {},
  t: (ar) => ar,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ar");

  // استرجاع اللغة المحفوظة أول ما الكلاينت يشتغل
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(LANG_STORAGE_KEY);
      if (saved === "ar" || saved === "en") setLangState(saved);
    } catch {
      /* التخزين ممكن يكون مقفول — نتجاهل */
    }
  }, []);

  // تزامن lang/dir على مستوى <html>
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  // مزامنة مع أي مكوّن تاني بيبعت حدث تغيير اللغة
  useEffect(() => {
    const onLangChanged = (e: Event) => {
      const v = (e as CustomEvent<Lang>).detail;
      if (v === "ar" || v === "en") setLangState(v);
    };
    window.addEventListener(LANG_EVENT, onLangChanged);
    return () => window.removeEventListener(LANG_EVENT, onLangChanged);
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem(LANG_STORAGE_KEY, l);
    } catch {
      /* تجاهل */
    }
    document.documentElement.lang = l;
    document.documentElement.dir = l === "ar" ? "rtl" : "ltr";
    try {
      window.dispatchEvent(new CustomEvent<Lang>(LANG_EVENT, { detail: l }));
    } catch {
      /* تجاهل */
    }
  }, []);

  const t = useCallback(
    (ar: string, en: string) => (lang === "en" ? en : ar),
    [lang]
  );

  const dir: "rtl" | "ltr" = lang === "ar" ? "rtl" : "ltr";

  return (
    <LangContext.Provider value={{ lang, dir, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang(): LangContextValue {
  return useContext(LangContext);
}
