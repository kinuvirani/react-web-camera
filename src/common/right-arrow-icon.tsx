import React from "react";
import styled from "styled-components";

const StyledSvg = styled("svg")`
  fill: white;
  &:hover {
    fill: #c4c4c4;
  }
`;

const StyledPath = styled("path")``;

export const RightArrowIcon: React.FC = () => (
  <StyledSvg
    width="58"
    height="93"
    viewBox="0 0 58 93"
    xmlns="http://www.w3.org/2000/svg"
  >
    <StyledPath
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.227151 83.7049L9.86704 93L58 46.6304L9.63989 3.40162e-06L-3.11681e-07 9.29511L38.6985 46.6095L0.227151 83.7049Z"
    />
  </StyledSvg>
);
