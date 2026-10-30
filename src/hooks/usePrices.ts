import { useState, useEffect } from "react";
import { getPrices, type Price } from "../api/getPrices";
import { loadPrices, savePrices } from "../utils/priceStorage";

export type Region = "DK1" | "DK2";

// Если API не ответил, пробуем снова через 30 минут
const RETRY_MS = 30 * 60 * 1000;

export function usePrices(region: Region, date: Date = new Date()) {
  const [prices, setPrices] = useState<Price[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let timer: number | undefined;

    async function load() {
      // Сначала смотрим в сохранённые данные: быстрее и работает без интернета
      const saved = loadPrices(region, date);
      if (saved) {
        setPrices(saved);
        setError(null);
        setLoading(false);
        return;
      }

      try {
        const data = await getPrices(region, date);
        savePrices(region, date, data);
        setPrices(data);
        setError(null);
      } catch {
        setError("Kunne ikke hente priser");
        timer = window.setTimeout(load, RETRY_MS);
      } finally {
        setLoading(false);
      }
    }

    setLoading(true);
    load();

    // При смене региона или уходе со страницы отменяем отложенный повтор
    return () => window.clearTimeout(timer);
  }, [region, date.toDateString()]);

  return { prices, isLoading, error };
}
