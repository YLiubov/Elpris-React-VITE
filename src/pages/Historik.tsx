import { useState } from "react";
import styled from "styled-components";
import { DateField } from "../components/molecules/DateField";
import { useSettings } from "../context/SettingsContext";
import { usePrices } from "../hooks/usePrices";
import { PageTitle } from "../components/atoms/PageTitle";
// Рисует список строк PriceRow внутри PriceList с цветом от зелёного к красному.
import { PriceTable } from "../components/organisms/PriceTable";
// Считает логику: values (цены с НДС или без), min и max. Ничего не рисует
import { usePriceStats } from "../hooks/usePriceStats";
import { formatDate } from "../utils/prices";

const Caption = styled.p`
  margin: 2.5rem 0 1rem;
  text-align: center;
  font-size: 0.8rem;
  text-transform: uppercase;
`;

export function Historik() {
  const { region, includeVat } = useSettings();
  const [selected, setSelected] = useState(new Date());
  const { prices, isLoading, error } = usePrices(region, selected);
  const { values, min, max } = usePriceStats(prices, includeVat);

  return (
    <>
      <PageTitle>Historik</PageTitle>
      <DateField
        min="2022-11-01"
        max={new Date().toLocaleDateString("sv-SE")}
        value={selected}
        onChange={setSelected}
      />
      <Caption>Elpriserne d. {formatDate(selected)}</Caption>
      {isLoading && <p>Henter priser…</p>}
      <PriceTable prices={prices} values={values} min={min} max={max} />
      {error && <p>{error}</p>}
    </>
  );
}
