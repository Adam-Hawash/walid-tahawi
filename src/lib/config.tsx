"use client";

/**
 * config.tsx — طبقة الكونفج القادم من صفحة الأدمن
 * - أول ما الصفحة تفتح بيجيب /api/config مرة واحدة (خريطة مسطحة
 *   فيها DEFAULTS + أي تعديلات محفوظة في الداتابيز)
 * - الرسم مش بيتأخر: القيم الافتراضية بتظهر فورًا والتعديلات بتبدل مكانها
 * - useSiteConfig() بيدي المكونات دالتين:
 *     tr(key, fallback) → نص ثنائي حسب اللغة الحالية (key_ar / key_en)
 *     val(key, fallback) → قيمة واحدة (رقم / لينك / معرف فيديو)
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useLang, type Lang } from "./i18n";
import type { Bi } from "./content";

export type ConfigMap = Record<string, string>;

interface ConfigContextValue {
  /** خريطة الكونفج الخام (فاضية لحد ما الـ GET يرجع) */
  cfg: ConfigMap;
  /** هل اتحمّل الكونفج من السيرفر؟ */
  ready: boolean;
}

const ConfigContext = createContext<ConfigContextValue>({
  cfg: {},
  ready: false,
});

export function ConfigProvider({ children }: { children: ReactNode }) {
  const [cfg, setCfg] = useState<ConfigMap>({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let alive = true;
    fetch("/api/config")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!alive || !data || typeof data !== "object" || Array.isArray(data))
          return;
        // لو السيرفر رجّع خطأ بصفحة HTML أو حاجة غير متوقعة نتجاهلها
        if (typeof (data as Record<string, unknown>).error === "string") return;
        const map: ConfigMap = {};
        for (const [k, v] of Object.entries(data as Record<string, unknown>)) {
          if (typeof v === "string") map[k] = v;
        }
        setCfg(map);
        setReady(true);
      })
      .catch(() => {
        /* فشل التحميل مش مشكلة — القيم الافتراضية شغالة */
      });
    return () => {
      alive = false;
    };
  }, []);

  const value = useMemo(() => ({ cfg, ready }), [cfg, ready]);

  return (
    <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>
  );
}

export function useRawConfig(): ConfigContextValue {
  return useContext(ConfigContext);
}

/**
 * الهوك اللي بيستهلكه المكونات — بيدي tr/val جاهزين باللغة الحالية
 * والمفاتيح بتتعرف تلقائيًا: tr('hero_title', obj) بيقرا
 * hero_title_ar أو hero_title_en حسب اللغة
 */
export function useSiteConfig() {
  const { cfg } = useContext(ConfigContext);
  const { lang } = useLang();

  const pick = useCallback(
    (base: string, lang: Lang): string | undefined => {
      const v = cfg[`${base}_${lang}`];
      return v && v.trim().length > 0 ? v : undefined;
    },
    [cfg]
  );

  /** نص ثنائي: قيمة الأدمن لو موجودة، وإلا الافتراضي من SITE_CONTENT */
  const tr = useCallback(
    (base: string, fallback: Bi): string => {
      const v = pick(base, lang);
      return v ?? fallback[lang];
    },
    [pick, lang]
  );

  /** قيمة واحدة (رقم/لينك): قيمة الأدمن لو مش فاضية، وإلا الافتراضي */
  const val = useCallback(
    (key: string, fallback: string): string => {
      const v = cfg[key];
      return v && v.trim().length > 0 ? v : fallback;
    },
    [cfg]
  );

  return { cfg, tr, val, lang };
}
