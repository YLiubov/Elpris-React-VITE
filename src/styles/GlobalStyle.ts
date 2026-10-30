// применяет общие стили для всего приложения, включая сброс отступов и установку базовых стилей для body

import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    font-family: "Roboto", sans-serif;
  }
`;


