import styled from "styled-components";

const Track = styled.span`
  position: relative;
  display: inline-block;
  flex-shrink: 0;
  width: 3.5rem;
  height: 2rem;
  border-radius: 1rem;
  background: ${({ theme }) => theme.colors.control};
  border: 1px dashed transparent;
  transition: border-color 0.2s;
`;

const Knob = styled.span`
  position: absolute;
  top: 50%;
  left: 0.2rem;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background: #5b7a50;
  transform: translateY(-50%);
  transition: left 0.2s, background 0.2s;
`;

const Input = styled.input`
  position: absolute;
  z-index: 1;
  opacity: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  cursor: pointer;

  &:checked + ${Track} {
    border-color: ${({ theme }) => theme.colors.accent};
  }

  &:checked + ${Track} ${Knob} {
    left: calc(100% - 1.7rem);
    background: ${({ theme }) => theme.colors.accent};
  }

  &:focus-visible + ${Track} {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 2px;
  }
`;

const Wrapper = styled.span`
  position: relative;
  display: inline-flex;
`;

type SwitchProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
};

export function Switch({ checked, onChange, label }: SwitchProps) {
  return (
    <Wrapper>
      <Input
        type="checkbox"
        role="switch"
        aria-label={label}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <Track>
        <Knob />
      </Track>
    </Wrapper>
  );
}
