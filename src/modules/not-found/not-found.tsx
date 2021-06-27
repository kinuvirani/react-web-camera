import React from "react";
import styled from "styled-components";

const Container = styled("div")``;

export interface NotFoundProps {}

export const NotFound: React.FC<NotFoundProps> = () => {
  return <Container>Not found</Container>;
};
