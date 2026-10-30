import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { DateInput } from "../atoms/DateInput";
import { field } from "../../styles/mixins";
import { formatDate } from "../../utils/prices";

const Wrapper = styled.div`
  ${field}
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.1rem 1.2rem;
  box-shadow: 0 0 0.6rem rgba(0, 0, 0, 0.5);

  svg {
    font-size: 1.4rem;
    color: ${({ theme }) => theme.colors.accent};
  }
`;

type DateFieldProps = {
  value: Date;
  onChange: (date: Date) => void;
  min: string;
  max: string;
};

export function DateField({ value, onChange, min, max }: DateFieldProps) {
  return (
    <Wrapper>
      <span>{formatDate(value)}</span>
      <FontAwesomeIcon icon={faCalendarDays} />
      <DateInput
        min={min}
        max={max}
        value={value.toLocaleDateString("sv-SE")}
        onChange={(e) => e.target.value && onChange(new Date(e.target.value))}
      />
    </Wrapper>
  );
}
