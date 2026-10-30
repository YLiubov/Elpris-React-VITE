 import styled from "styled-components";
 import { useSettings } from "../../context/SettingsContext";

 const Accent = styled.span`
  color: ${({ theme }) => theme.colors.accent};
`;
 
export function PriceInfo() {
    const { region, includeVat } = useSettings();

    return (
        <>
        <p>
          Priserne er <Accent>{includeVat ? "inkl. moms" : "ex. moms"}</Accent>{" "}
          og afgifter
        </p>
        <p>
          Du vises lige nu priserne for{" "}
          <Accent>{region === "DK1" ? "Vest Danmark" : "Øst Danmark"}</Accent>
        </p>
        </>
    );
}
