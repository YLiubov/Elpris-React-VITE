import styled from "styled-components";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { PriceInfo } from "../molecules/PriceInfo";
import logo from "../../assets/logo.svg";

const Shell = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  background: ${({ theme }) => theme.colors.bar};
`;

const LogoLink = styled(Link)`
  display: flex;
`;

const Logo = styled.img`
  width: 2.5rem;
  height: 2.5rem;
`;

const Nav = styled.nav`
  display: flex;
  gap: 1rem;
`;

const StyledLink = styled(NavLink)`
  color: ${({ theme }) => theme.colors.text};
  font-weight: 700;
  font-size: 0.85rem;
  text-decoration: none;
  text-transform: uppercase;

  &.active {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const Main = styled.main`
  position: relative;
  flex: 1;
  padding: 3.5rem 1rem 1.5rem;
`;

const SettingsLink = styled(Link)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.icon};
`;

const Footer = styled.footer`
  padding: 1rem;
  text-align: center;
  font-size: 0.85rem;
  background: ${({ theme }) => theme.colors.bar};

  p {
    margin: 0.25rem 0;
  }
`;

export function MobileLayout() {
  const { pathname } = useLocation();

  return (
    <Shell>
      <Header>
        <LogoLink to="/lige-nu" aria-label="Lige nu">
          <Logo src={logo} alt="ElPriser.nu" />
        </LogoLink>
        <Nav>
          <StyledLink to="/oversigt">Oversigt</StyledLink>
          <StyledLink to="/lige-nu">Lige nu</StyledLink>
          <StyledLink to="/historik">Historik</StyledLink>
        </Nav>
      </Header>
      <Main>
        {pathname !== "/indstillinger" && (
          <SettingsLink to="/indstillinger" aria-label="Indstillinger">
            <FontAwesomeIcon icon={faGear} />
          </SettingsLink>
        )}
        <Outlet />
      </Main>
      <Footer>
        <PriceInfo />
      </Footer>
    </Shell>
  );
}