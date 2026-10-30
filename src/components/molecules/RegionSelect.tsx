import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { field } from "../../styles/mixins";
import type { Region } from "../../hooks/usePrices";

const Wrapper = styled.div`
  position: relative;
  width: 11rem;
  ${field}
  font-size: 0.7rem;
  text-transform: uppercase;
`;

const Trigger = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0.7rem 0.8rem;
  border: 0;
  background: none;
  color: ${({ theme }) => theme.colors.accent};
  font: inherit;
  text-transform: inherit;
  cursor: pointer;

  svg {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const List = styled.ul`
  margin: 0;
  padding: 0 0 0.4rem;
  list-style: none;
`;

const Option = styled.li`
  padding: 0.7rem 0.8rem;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};
`;

const OPTIONS: { value: Region; label: string }[] = [
  { value: "DK2", label: "Region Øst" },
  { value: "DK1", label: "Region Vest" },
];

type RegionSelectProps = {
  value: Region;
  onChange: (region: Region) => void;
};

export function RegionSelect({ value, onChange }: RegionSelectProps) {
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const selected = OPTIONS.find((option) => option.value === value) ?? OPTIONS[0];

  // Закрываем список при клике вне него или по Escape
  useEffect(() => {
    if (!open) return;

    function handleClick(event: MouseEvent) {
      if (!boxRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  return (
    <Wrapper ref={boxRef}>
      <Trigger
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((isOpen) => !isOpen)}
      >
        {selected.label}
        <FontAwesomeIcon icon={open ? faChevronUp : faChevronDown} />
      </Trigger>
      {open && (
        <List role="listbox">
          {OPTIONS.filter((option) => option.value !== value).map((option) => (
            <Option
              key={option.value}
              role="option"
              aria-selected={false}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
            >
              {option.label}
            </Option>
          ))}
        </List>
      )}
    </Wrapper>
  );
}
