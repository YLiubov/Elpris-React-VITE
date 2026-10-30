import { PageTitle } from "../components/atoms/PageTitle";
import { LabeledPrice } from "../components/molecules/LabeledPrice";
import { useSettings } from "../context/SettingsContext";
import { usePrices } from "../hooks/usePrices";
import { PriceTable } from "../components/organisms/PriceTable";
import { usePriceStats } from "../hooks/usePriceStats";
import { MinMax } from "../components/atoms/MinMax";

export function Oversigt() {
  const { region, includeVat } = useSettings();
  const { prices, isLoading, error } = usePrices(region);

  const { values, min, max } = usePriceStats(prices, includeVat);

  return (
    <>
      <PageTitle>Oversigt</PageTitle>
      {isLoading && <p>Henter priser…</p>}
      {error && <p>{error}</p>}
      {values.length > 0 && (
        <MinMax>
          <LabeledPrice price={min} label="Laveste pris" />
          <LabeledPrice price={max} label="Højeste pris" />
        </MinMax>
      )}
      <PriceTable prices={prices} values={values} min={min} max={max} />
    </>
  );
}
