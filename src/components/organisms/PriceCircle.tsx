import styled from "styled-components";
import { circle } from "../../styles/mixins";
import { PriceText } from "../atoms/PriceText";

// PriceCircle component displays a price inside a styled circle with a unit label.
// Компонент PriceCircle отображает цену внутри стилизованного круга с подписью единицы.
type Size = "large" | "small";

// Circle styled component represents the circular container for the price.
// Компонент Circle представляет собой круглый контейнер для цены.
const Circle = styled.div<{ $size: Size }>`
  ${({ $size }) => circle($size === "large" ? "min(65vw, 18rem)" : "min(28vw, 7rem)")}
  position: relative;
  font-size: ${({ $size }) => ($size === "large" ? "2.2rem" : "0.9rem")};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ $size }) =>
    $size === "large"
      ? "0 0 1.5rem rgba(85, 236, 32, 0.3), 0 0 3.5rem rgba(85, 236, 32, 0.15)"
      : "0 0 0.8rem rgba(0, 0, 0, 0.6)"};

  /* В small-круге цена белая и тонкая, как в эскизе */
  p {
    color: ${({ theme, $size }) => ($size === "small" ? theme.colors.text : theme.colors.accent)};
    font-weight: ${({ $size }) => ($size === "small" ? 400 : 700)};
  }

  &::before {
    content: "";
    position: absolute;
    inset: ${({ $size }) => ($size === "small" ? "5%" : "7%")};
    border-radius: 50%;
    border: 1px dashed ${({ theme }) => theme.colors.accent};
  }

  &::after {
    content: "";
    position: absolute;
    inset: 12%;
    display: ${({ $size }) => ($size === "small" ? "none" : "block")};
    border-radius: 50%;
    border: 1px dashed ${({ theme }) => theme.colors.accent};
  }
`;

// Unit styled component represents the unit label inside the circle.
// Компонент Unit представляет собой подпись единицы внутри круга.
const Unit = styled.span<{ $size: Size }>`
  font-size: ${({ $size }) => ($size === "small" ? "0.5em" : "0.4em")};
  font-weight: ${({ $size }) => ($size === "small" ? 400 : 700)};
  text-transform: uppercase;
  color: ${({ theme, $size }) => ($size === "small" ? theme.colors.text : theme.colors.accent)};
`;

// PriceCircleProps type defines the props for the PriceCircle component.
// Тип PriceCircleProps определяет свойства для компонента PriceCircle.
type PriceCircleProps = {
  price: number;
  size?: Size;
};

// PriceCircle component renders a price inside a circular container with a unit label.
// Компонент PriceCircle отображает цену внутри круглого контейнера с подписью единицы.
export function PriceCircle({ price, size = "large" }: PriceCircleProps) {
  return (
    <Circle $size={size}>
      <PriceText>{price.toFixed(3)} kr</PriceText>
      <Unit $size={size}>pr. kWh</Unit>
    </Circle>
  );
}