import React from "react";
import styled from "styled-components";
import { Grid, Paper, Button } from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
import { Content, Title as UiTitle, OrderInfo } from "../../ui";
import { CHECKOUT_CONFIRMATION, HOME } from "../../routes";
import FooterCheckout from "./footer-checkout";
import useOrder from "../../hooks/order";
import FormAddress from "./form-address";

import PhoneField from "./phone-field";

function Checkout() {
  const { order, addPhone, addAddress } = useOrder();

  if (!order.pizzas.length) {
    return <Redirect to={HOME} />;
  }

  return (
    <>
      <Content>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Title>Qual o endereço para entrega?</Title>
            <PaperContainer>
              <FormAddress onUpdate={addAddress} />
            </PaperContainer>
            <PaperContainer>
              <PhoneField onUpdate={addPhone} />
            </PaperContainer>
          </Grid>

          <Grid container item xs={12} md={6} direction="column">
            <Title>Informações do seu pedido</Title>
            <PaperContainer>
              <OrderInfo showOptions />
            </PaperContainer>
          </Grid>
        </Grid>
      </Content>

      <FooterCheckout>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to={CHECKOUT_CONFIRMATION}
        >
          Confirmar pedido
        </Button>
      </FooterCheckout>
    </>
  );
}

const Title = styled(UiTitle).attrs({ variant: "h6" })`
  text-align: left;
`;

const PaperContainer = styled(Paper)`
  flex-grow: 1;
  margin-bottom: ${({ theme }) => theme.spacing(5)}px;
  padding: ${({ theme }) => theme.spacing(2)}px;
`;

export default Checkout;
