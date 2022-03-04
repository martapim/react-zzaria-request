import React from "react";
import styled from "styled-components";
import { Typography, Grid, Card } from "@material-ui/core";
import { CHOOSE_PIZZA_FLAVORS } from "../../routes";
import { singularOrPlural } from "../../utils";
import {
  Title,
  HeaderContent,
  PizzasGrid,
  Divider,
  CardLink,
  Content,
} from "../../ui";
import useAuth from "../../hooks/auth";
import useCollection from "../../hooks/db";

const ChoosePizzaSize = () => {
  const { userInfo } = useAuth();
  const pizzasSizes = useCollection("pizzasSizes");

  if (!pizzasSizes) {
    return "Carregando tamanhos...";
  }

  if (pizzasSizes.length === 0) {
    return "Não há dados.";
  }

  return (
    <Content>
      <HeaderContent>
        <Title variant="h3">
          O que vai ser hoje, {userInfo.user.firstName} ?
        </Title>
        <Title variant="h4">Escolha o tamanho das pizzas:</Title>
      </HeaderContent>

      <PizzasGrid>
        {pizzasSizes?.map((pizza) => (
          <Grid item key={pizza.id} xs>
            <Card>
              <CardLink
                to={{
                  pathname: CHOOSE_PIZZA_FLAVORS,
                  state: { pizzaSize: pizza },
                }}
              >
                <Pizza>
                  <PizzaText>{pizza.size}cm </PizzaText>
                </Pizza>
                <Divider />
                <Typography variant="h5">{pizza.name}</Typography>
                <Typography>
                  {pizza.slices} fatias, {pizza.flavours}{" "}
                  {singularOrPlural(pizza.flavours, "sabor", "sabores")}{" "}
                </Typography>
              </CardLink>
            </Card>
          </Grid>
        ))}
      </PizzasGrid>
    </Content>
  );
};

const PizzaText = styled(Typography).attrs({ variant: "h5" })`
  height: 80px;
  width: 80px;
  border-radius: 50%;
  background: ${({ theme }) => theme.palette.common.white};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
`;

const Pizza = styled.div`
  height: 200px;
  width: 200px;
  border: 1px solid ${({ theme }) => theme.palette.grey.A100};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background: ${({ theme }) => theme.palette.common.white};
  z-index: 1;

  &::before,
  &::after {
    content: "";
    background: ${({ theme }) => theme.palette.grey.A100};
    position: absolute;
    transform: rotate(45deg);
  }

  &::before {
    height: 1px;
    width: 160px;
  }

  &::after {
    height: 160px;
    width: 1px;
  }
`;

export default ChoosePizzaSize;
