import styled from "styled-components";

// Прозрачный нативный input поверх красивой рамки (см. DateField):
// клик в любое место открывает календарь браузера, а видимый текст рисуем сами в формате dd-mm-yyyy
export const DateInput = styled.input.attrs({ type: "date" })`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;

  &::-webkit-calendar-picker-indicator {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
`;
