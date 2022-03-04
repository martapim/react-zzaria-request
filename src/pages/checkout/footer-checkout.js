import React from "react";
import styled from "styled-components";
import { Footer } from "../../ui";

function FooterCheckout({ children, justifyContent }) {
  return (
    <Footer>
      <FooterContent justifyContent={justifyContent}>{children}</FooterContent>
    </Footer>
  );
}

const FooterContent = styled.div`
  display: flex;
  justify-content: ${({ justifyContent }) => justifyContent || "flex-end"};
`;

export default FooterCheckout;
