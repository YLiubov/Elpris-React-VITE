// css нужен для вложенных функций и интерполяций (например, ${({ theme }) => ...})

import { css } from 'styled-components';

export const flexCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const circle = (size: string) => css`
  ${flexCenter}
  flex-direction: column;
  width: ${size};
  height: ${size};
  border-radius: 50%;
`;

// Карточка: тёмная поверхность со скруглением и тенью (строки списка и т.п.)
export const card = css`
  border-radius: 0.6rem;
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: 0 0 0.6rem rgba(0, 0, 0, 0.5);
`;

// Поле/контрол: тёмный фон и небольшое скругление (dropdown, поле даты)
export const field = css`
  border-radius: 0.4rem;
  background: ${({ theme }) => theme.colors.control};
`;
