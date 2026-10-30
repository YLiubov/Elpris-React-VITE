import styled from "styled-components";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/logo.svg";
import { LigeNu } from "../../pages/LigeNu";
import { Oversigt } from "../../pages/Oversigt";
import { Historik } from "../../pages/Historik";

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  background: ${({ theme }) => theme.colors.bar};
  position: sticky;
  top: 0;
  z-index: 10;
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const Columns = styled.main`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
  padding: 3rem 4rem;
`;

const SettingsLink = styled(Link)`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.icon};
`;

export function DesktopLayout() {
  return (
    <>
      <Header>
        <Brand>
          <img src={logo} alt="ElPriser.nu" width={40} height={40} />
          <span>ELPrisen.nu</span>
        </Brand>
        <SettingsLink to="/indstillinger" aria-label="Indstillinger">
          <FontAwesomeIcon icon={faGear} />
        </SettingsLink>
      </Header>
      <Columns>
        <section>
          <LigeNu />
        </section>
        <section>
          <Oversigt />
        </section>
        <section>
          <Historik />
        </section>
      </Columns>
    </>
  );
}
