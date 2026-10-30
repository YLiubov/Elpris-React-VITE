import type { Price } from "../../api/getPrices";
import { formatHour, getPriceColor } from "../../utils/prices";
import { PriceList } from "../atoms/PriceList";
import { PriceRow } from "../molecules/PriceRow";

// Organism: список строк «kl. HH.00 — цена» с цветом от зелёного (min) к красному (max).
// Только показывает: цены и статистику ему передают снаружи (см. usePriceStats).
type PriceTableProps = {
  prices: Price[];
  values: number[];
  min: number;
  max: number;
};

export function PriceTable({ prices, values, min, max }: PriceTableProps) {
  return (
    <PriceList>
      {prices.map((p, i) => (
        // key — уникальный id для React; values[i] соответствует p, потому что индексы совпадают
        <PriceRow
          key={p.time_start}
          hour={formatHour(p.time_start)}
          price={values[i]}
          color={getPriceColor(values[i], min, max)}
        />
      ))}
    </PriceList>
  );
}
