import React from "react";
import styled from "styled-components";
import { Container } from "@material-ui/core";
import FooterWithOrderAndButtons from "./fooder-with-order-and-buttons";

const Footer = ({ children, ...props }) => (
  <FooterContent>
    <Container>
      {children || <FooterWithOrderAndButtons {...props} />}
    </Container>
  </FooterContent>
);

const FooterContent = styled.footer`
  box-shadow: 0 0 3px ${({ theme }) => theme.palette.grey[400]};
  padding: ${({ theme }) => theme.spacing(3)}px;
  width: 100%;
`;

export default Footer;
