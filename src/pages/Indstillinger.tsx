import styled from "styled-components";
import { PageTitle } from "../components/atoms/PageTitle";
import { Switch } from "../components/atoms/Switch";
import { RegionSelect } from "../components/molecules/RegionSelect";
import { SettingRow } from "../components/molecules/SettingRow";
import { useSettings } from "../context/SettingsContext";

const Settings = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  max-width: 22rem;
  margin: 0 auto;
  padding: 0 0.5rem;
`;

export function Indstillinger() {
  const {
    region,
    setRegion,
    includeVat,
    setIncludeVat,
    lowestPriceAlarm,
    setLowestPriceAlarm,
  } = useSettings();

  return (
    <>
      <PageTitle>Indstillinger</PageTitle>
      <Settings>
        <SettingRow label="Priser inkl. moms">
          <Switch
            label="Priser inkl. moms"
            checked={includeVat}
            onChange={setIncludeVat}
          />
        </SettingRow>
        <SettingRow label="Laveste pris alarm">
          <Switch
            label="Laveste pris alarm"
            checked={lowestPriceAlarm}
            onChange={setLowestPriceAlarm}
          />
        </SettingRow>
        <SettingRow label="Vælg region">
          <RegionSelect value={region} onChange={setRegion} />
        </SettingRow>
      </Settings>
    </>
  );
}
