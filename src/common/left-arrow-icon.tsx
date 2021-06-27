import React from "react";
import styled from "styled-components";

const StyledSvg = styled("svg")`
  fill: white;
  &:hover {
    fill: #c4c4c4;
  }
`;

const StyledPath = styled("path")``;

export const LeftArrowIcon: React.FC = () => (
  <StyledSvg
    width="58"
    height="93"
    viewBox="0 0 58 93"
    xmlns="http://www.w3.org/2000/svg"
  >
    <StyledPath
      fillRule="evenodd"
      clipRule="evenodd"
      d="M57.7728 9.29511L48.133 4.20792e-06L-4.05376e-06 46.3696L48.3601 93L58 83.7049L19.3015 46.3905L57.7728 9.29511Z"
    />
  </StyledSvg>
);
