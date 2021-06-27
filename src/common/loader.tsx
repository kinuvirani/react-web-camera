import React from "react";
import styled from "styled-components";

const Container = styled("div")`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #d6d6da;
  opacity: 0.8;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export interface LoaderProps {}

export const Loader: React.FC<LoaderProps> = () => (
  <Container>Loading...</Container>
);
