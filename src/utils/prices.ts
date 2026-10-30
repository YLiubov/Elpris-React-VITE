import type { Price } from "../api/getPrices";

const VAT = 1.25;

export function withVat(value: number, includeVat: boolean) {
  return includeVat ? value * VAT : value;
}

export function getCurrentPrice(prices: Price[]) {
  const now = Date.now();
  return prices.find(
    (p) =>
      now >= new Date(p.time_start).getTime() &&
      now < new Date(p.time_end).getTime(),
  );
}

export function formatHour(iso: string) {
  return new Date(iso).getHours().toString().padStart(2, "0") + ".00";
}

// Возвращает CSS-цвет для цены: зелёный у минимума дня, красный у максимума.
// Используем HSL, потому что там цвет задаётся одним числом — hue (оттенок):
// 120 = зелёный, 60 = жёлтый, 0 = красный. Значит, достаточно двигать hue от 120 к 0.
export function getPriceColor(value: number, min: number, max: number) {
  // ratio — "где цена между min и max": 0 = самая низкая, 1 = самая высокая.
  // Если min === max (цена весь день одинаковая), делить на 0 нельзя — берём 0 (зелёный).
  const ratio = max === min ? 0 : (value - min) / (max - min);
  // Чем выше ratio, тем ближе hue к 0 (красному). Math.round убирает дробную часть.
  const hue = Math.round(120 * (1 - ratio));
  // 100% saturation and 50% brightness — чистый яркий цвет.
  return `hsl(${hue}, 100%, 50%)`;
}

// Дата в формате из дизайна: 14-10-2023
export function formatDate(date: Date) {
  return date
    .toLocaleDateString("da-DK", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .replace(/\./g, "-");
}
