import React from "react";
import Transition from "react-transition-group/Transition";
import styled from "styled-components";

const Container = styled("div")`
  width: 67px;
  height: 45px;
  box-shadow: inset 0px 2px 2px rgba(0, 0, 0, 0.1);
  border-radius: 40px;
  position: relative;
  cursor: pointer;
`;

const Circle = styled("span")`
  width: 42px;
  height: 45px;
  border-radius: 50%;
  background: linear-gradient(180deg, #ffffff 0%, #ececff 100%);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.18);
  position: absolute;
  z-index: 1;
  top: 0;
  transition: all 2s ease-in-out;
  transition-property: all;
`;

const duration = 300;

const defaultStyle = {
  transition: `background ${duration}ms ease-in-out`,
  background: "#0090bb",
};

const transitionStyles = {
  entering: { background: "#0090bb" },
  entered: { background: "#0090bb" },
  exiting: { background: "#d6d6da" },
  exited: { background: "#d6d6da" },
};

const defaultStyle2 = {
  transition: `all ${duration}ms ease-in-out`,
  left: 0,
};

const transitionStyles2 = {
  entering: { left: 0, right: 25 },
  entered: { left: 0, right: 25 },
  exiting: { right: 0, left: 25 },
  exited: { right: 0, left: 25 },
};

export interface SwitcherProps {
  value: boolean;
  onChange(checked: boolean): void;
}

export const Switcher: React.FC<SwitcherProps> = ({ onChange, value }) => {
  const handleToggle = (): void => onChange(!value);

  return (
    <Transition in={value} timeout={500}>
      {(state) => (
        <Container
          style={{
            ...defaultStyle,
            // @ts-ignore
            ...transitionStyles[state],
          }}
          onClick={handleToggle}
        >
          <Circle
            style={{
              ...defaultStyle2,
              // @ts-ignore
              ...transitionStyles2[state],
            }}
          />
        </Container>
      )}
    </Transition>
  );
};
