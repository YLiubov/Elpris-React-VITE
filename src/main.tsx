import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/700.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "styled-components";
import App from "./App";
import { GlobalStyle } from "./styles/GlobalStyle";
import { theme } from "./styles/theme";
import { BrowserRouter } from "react-router-dom";
import { SettingsProvider } from "./context/SettingsContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <SettingsProvider>
          <App />
        </SettingsProvider>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
);
