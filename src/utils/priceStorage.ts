import type { Price } from "../api/getPrices";

// Ключ вида "prices-DK2-2026-10-29": отдельная запись на регион и день
function makeKey(region: string, date: Date) {
  return `prices-${region}-${date.toLocaleDateString("sv-SE")}`;
}

export function savePrices(region: string, date: Date, prices: Price[]) {
  localStorage.setItem(makeKey(region, date), JSON.stringify(prices));
}

export function loadPrices(region: string, date: Date): Price[] | null {
  try {
    const raw = localStorage.getItem(makeKey(region, date));
    return raw ? (JSON.parse(raw) as Price[]) : null;
  } catch {
    return null;
  }
}