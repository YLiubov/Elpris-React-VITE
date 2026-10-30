// LabeledPrice component displays a price inside a circle with a label underneath.
// Компонент LabeledPrice отображает цену внутри круга, а под ним — подпись.



import styled from "styled-components";
import { PriceCircle } from "../organisms/PriceCircle";

// Wrapper styled component represents the container for the labeled price.
// Компонент Wrapper представляет собой контейнер для цены с подписью.
const Wrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
gap: 1rem;
`;

// Label styled component represents the label underneath the price circle.
// Компонент Label представляет собой подпись под кругом с ценой.
const Label = styled.span`
    font-size: 0.7rem;
    text-transform: uppercase;
`;

// LabeledPriceProps type defines the props for the LabeledPrice component.
// Тип LabeledPriceProps определяет свойства для компонента LabeledPrice.
type LabeledPriceProps = {
    label: string;
    price: number;
};

// LabeledPrice component displays a labeled price with a price circle and a label.
// Компонент LabeledPrice отображает цену с подписью, используя круг с ценой и подпись.
export function LabeledPrice ({ label, price }: LabeledPriceProps) {
    return (
        <Wrapper>
            <PriceCircle price={price} size="small"/>
            <Label>{label}</Label>
        </Wrapper>
    );
}