import styled from "styled-components";
import { PageTitle } from "../components/atoms/PageTitle";
import { PriceCircle } from "../components/organisms/PriceCircle";
import { useSettings } from "../context/SettingsContext";
import { usePrices } from "../hooks/usePrices";
import { formatHour, getCurrentPrice, withVat } from "../utils/prices";
import { LabeledPrice } from "../components/molecules/LabeledPrice";
import { MinMax } from "../components/atoms/MinMax";
import { useIsDesktop } from "../hooks/useIsDesktop";
import { usePriceStats } from "../hooks/usePriceStats";
import { PriceInfo } from "../components/molecules/PriceInfo";

const Time = styled.p`
  margin: 1.5rem 0 0;
  text-align: center;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.accent};
`;

const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export function LigeNu() {
  const { region, includeVat } = useSettings();
  const { prices, isLoading, error } = usePrices(region);
  const isDesktop = useIsDesktop();
  const { min, max } = usePriceStats(prices, includeVat);
  const current = getCurrentPrice(prices);


  return (
    <Center>
      <PageTitle>Elprisen lige nu</PageTitle>
      {isLoading && <p>Henter priser…</p>}
      {error && <p>{error}</p>}
      {current && (
        <>
          <PriceCircle price={withVat(current.DKK_per_kWh, includeVat)} />
          <Time>
            {formatHour(current.time_start)} - {formatHour(current.time_end)}
          </Time>
          {isDesktop && (
            <MinMax>
              <LabeledPrice price={min} label="Laveste pris" />
              <LabeledPrice price={max} label="Højeste pris" />
            </MinMax>
          )}
          {isDesktop && <PriceInfo />}
        </>
      )}
    </Center>
  );
}
  