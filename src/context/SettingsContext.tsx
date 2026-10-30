// createContext   — создаёт «канал», по которому данные доступны любому компоненту внутри
// useContext      — читает данные из этого канала
// useState        — хранит значения в памяти компонента (как в Dog App и в usePrices)
// useEffect       — выполняет побочное действие (у нас: запись в localStorage)
// ReactNode       — тип для «всего, что можно отрисовать» (нужен для children)
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
// type-импорт: берём только тип "DK1" | "DK2", в итоговый JS он не попадёт
import type { Region } from "../hooks/usePrices";

// Описание того, ЧТО лежит в Context: два значения и две функции для их изменения.
// TypeScript по этому типу подсказывает поля и ловит опечатки на страницах.
type Settings = {
  region: Region;                          // выбранный регион: DK1 (Vest) или DK2 (Øst)
  includeVat: boolean;                     // true = показывать цены с НДС
  setRegion: (region: Region) => void;     // функция: поменять регион
  setIncludeVat: (value: boolean) => void; // функция: включить/выключить НДС
  lowestPriceAlarm: boolean;               // true = пользователь хочет alarm о самой низкой цене дня
  setLowestPriceAlarm: (value: boolean) => void;
};

// Создаём сам Context. Начальное значение null означает «провайдера ещё нет»:
// так мы поймаем ошибку, если кто-то вызовет useSettings вне SettingsProvider.
const SettingsContext = createContext<Settings | null>(null);

// Ключ, под которым настройки лежат в localStorage (как FAVORITES_KEY в Dog App)
const STORAGE_KEY = "elpriser-settings";

// Читает сохранённые настройки при запуске приложения.
// localStorage хранит только строки, поэтому разбираем её через JSON.parse.
function loadSaved() {
  try {
    // ?? "{}" — если в localStorage ничего нет (null), берём пустой объект.
    // Это тот же ?? (nullish coalescing) из твоей программы.
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
  } catch {
    // Если строка повреждена и JSON.parse упал, приложение не ломается:
    // просто начинаем с пустых настроек.
    return {};
  }
}

// Provider — компонент-«раздатчик». Он хранит state и отдаёт его всем вложенным компонентам.
// children — это всё, что мы положили внутрь <SettingsProvider>...</SettingsProvider>
// (в main.tsx это <App />), поэтому тип ReactNode.
export function SettingsProvider({ children }: { children: ReactNode }) {
  // Достаём сохранённое значение один раз при создании провайдера
  const saved = loadSaved();

  // Начальное значение state: то, что сохранено, а если нет — значение по умолчанию.
  // saved.region ?? "DK2"      → если region не сохранён, берём DK2 (Øst)
  // saved.includeVat ?? false  → если НДС не сохранён, по умолчанию выключен
  const [region, setRegion] = useState<Region>(saved.region ?? "DK2");
  const [includeVat, setIncludeVat] = useState<boolean>(saved.includeVat ?? false);
  const [lowestPriceAlarm, setLowestPriceAlarm] = useState<boolean>(saved.lowestPriceAlarm ?? false);

  // Каждый раз, когда region или includeVat меняется, записываем обе настройки в localStorage.
  // Массив [region, includeVat] — зависимости: эффект срабатывает только при их изменении.
  // JSON.stringify превращает объект в строку, потому что localStorage хранит строки.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ region, includeVat, lowestPriceAlarm }));
  }, [region, includeVat, lowestPriceAlarm]);

  return (
    // value — то, что получат все страницы. Двойные {{ }}: внешние — это JSX,
    // внутренние — обычный объект JavaScript (сокращённая запись: region = region: region).
    <SettingsContext.Provider value={{ region, includeVat, setRegion, setIncludeVat, lowestPriceAlarm, setLowestPriceAlarm }}>
      {children}
    </SettingsContext.Provider>
  );
}

// Custom hook: удобная обёртка над useContext.
// Страница пишет const { region } = useSettings() и не думает про детали Context.
export function useSettings() {
  const context = useContext(SettingsContext);

  // Если провайдера нет выше по дереву, context будет null.
  // Мы сразу бросаем понятную ошибку, а не ловим странное «cannot read property of null».
  if (!context) {
    throw new Error("useSettings must be used inside SettingsProvider");
  }

  // Благодаря проверке выше TypeScript теперь знает: тут точно Settings, а не null
  return context;
}