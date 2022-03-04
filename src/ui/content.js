import React from "react";
import styled from "styled-components";
import { Container } from "@material-ui/core";

const Content = ({ children, ...props }) => (
  <Main {...props}>
    <Container>{children}</Container>
  </Main>
);

const Main = styled.main`
  padding: ${({ theme }) => theme.spacing(3)}px;
  flex-grow: 1;
`;

export default Content;
