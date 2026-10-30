import type { Price } from "../api/getPrices";
import { withVat } from "../utils/prices";

// Custom hook: берёт цены из API и считает всё, что нужно для показа:
// values — цены по часам (с НДС или без, по настройке), в том же порядке, что и prices;
// min / max — самая низкая и самая высокая цена дня (для кругов и для цвета строк).
export function usePriceStats(prices: Price[], includeVat: boolean) {
  const values = prices.map((p) => withVat(p.DKK_per_kWh, includeVat));
  // ...values (spread) разворачивает массив в аргументы: Math.min(1, 2, 3)
  const min = Math.min(...values);
  const max = Math.max(...values);

  return { values, min, max };
}
