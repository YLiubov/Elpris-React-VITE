// PriceRow — молекула: одна строка списка цен («kl. 19.00 — 0.524 kr»).
// Она "глупая" (presentational): сама ничего не считает и не запрашивает,
// просто показывает то, что ей передали через props.

import styled from "styled-components";
import { card } from "../../styles/mixins";

// Row — это <li>, потому что строки будут лежать внутри <ul> на странице (List в Oversigt).
const Row = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0.9rem 1rem;
  ${card}
  font-size: 0.95rem;
`;

// Value — цена. Цвет приходит через prop $color, потому что он динамический
// (зависит от цены, min и max дня), и в theme его заранее не описать.
// Знак $ — transient prop: styled-components использует его для стилей
// и не передаёт в DOM-элемент (иначе React ругнётся на неизвестный атрибут).
// <{ $color: string }> — TypeScript-тип пропсов этого styled-компонента.
const Value = styled.span<{ $color: string }>`
  color: ${({ $color }) => $color};
`;

// Тип props самого компонента PriceRow:
// hour  — уже отформатированный час, например "19.00" (форматирует formatHour на странице);
// price — число, которое показываем (уже с учётом НДС);
// color — готовая CSS-строка цвета, например "hsl(60, 100%, 50%)" (её даёт getPriceColor).
type PriceRowProps = {
  hour: string;
  price: number;
  color: string;
};

// Деструктуризация { hour, price, color } достаёт значения прямо из props.
export function PriceRow({ hour, price, color }: PriceRowProps) {
  return (
    <Row>
      <span>kl. {hour}</span>
      {/* toFixed(3) — ровно 3 знака после точки: 0.5 → "0.500" */}
      <Value $color={color}>{price.toFixed(3)} kr</Value>
    </Row>
  );
}
