import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  Paper,
  Typography,
  Container,
  Divider as MaterialDivider,
  Button,
} from "@material-ui/core";
import { Content, OrderInfo, Title } from "../../ui";
import useAuth from "../../hooks/auth";
import FooterCheckout from "../checkout/footer-checkout";
import { HOME } from "../../routes";
import useOrder from "../../hooks/order";

function CheckoutSuccess() {
  const { userInfo } = useAuth();
  const { order } = useOrder();

  return (
    <>
      <Content>
        <Header>
          <Title variant="h4">Prontinho {userInfo.user.firstName}!</Title>
          <Typography>
            Seu pedido será entregue no endereço abaixo em até
          </Typography>
          <Typography>40 min! :D</Typography>
        </Header>
        <Container maxWidth="sm">
          <PaperContainer>
            <Typography variant="h6">Seu pedido:</Typography>
            <OrderInfo />
            <Divider />
            <Typography variant="h6">Endereço para entrega:</Typography>
            <Typography>
              {order.address.address}, {"nº"}
              {order.address.number}, {order.address.complement},{" "}
              {order.address.district}, {order.address.code},{" "}
              {order.address.city}/{order.address.state}
            </Typography>
            <Divider />
            <Typography variant="h6">Telefone para contato:</Typography>
            <Typography>{order.phone}</Typography>
          </PaperContainer>
        </Container>
      </Content>

      <FooterCheckout justifyContent="center">
        <Button color="secondary" size="large" component={Link} to={HOME}>
          {"< "}Voltar para a página inicial
        </Button>
      </FooterCheckout>
    </>
  );
}

const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing(3)}px;
  text-align: center;
`;

const PaperContainer = styled(Paper)`
  padding: ${({ theme }) => theme.spacing(3)}px;
`;

const Divider = styled(MaterialDivider)`
  margin: ${({ theme }) => theme.spacing(3, 0)};
`;

export default CheckoutSuccess;
