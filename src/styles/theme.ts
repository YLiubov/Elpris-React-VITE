// хранит значения дизайна, такие как цвета, шрифты и другие параметры темы

export const theme = {
  colors: {
    background: "#27282c",
    surface: "#201E1E",
    text: "#ffffff",
    accent: "#55EC20",
    bar: "#1a1a1a",
    control: "#1e1e1e",
    icon: "#55EC20",
  },
};

export type Theme = typeof theme;