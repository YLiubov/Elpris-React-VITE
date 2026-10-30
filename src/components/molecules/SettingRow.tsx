import styled from "styled-components";
import type { ReactNode } from "react";

const Row = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
`;

const Label = styled.span`
  padding-top: 0.5rem;
  font-size: 0.8rem;
  text-transform: uppercase;
`;

type SettingRowProps = {
  label: string;
  children: ReactNode;
};

export function SettingRow({ label, children }: SettingRowProps) {
  return (
    <Row>
      <Label>{label}</Label>
      {children}
    </Row>
  );
}
