// описывает тип темы для TypeScript, чтобы styled-components знали структуру темы

import "styled-components";
import type { Theme } from "./theme";

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}