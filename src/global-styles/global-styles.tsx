import * as React from "react";
import { Override } from "./override";
import { Reset } from "./reset";

export const GlobalStyles: React.FC = () => (
  <>
    <Reset />
    <Override />
  </>
);
