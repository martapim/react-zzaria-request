import React from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import { Grid, Typography, Button as MaterialButton } from "@material-ui/core";
import useAuth from "../../hooks/auth";
import { singularOrPlural } from "../../utils";

function FooterWithOrderAndButtons({ buttons, location, history }) {
  const { userInfo } = useAuth();

  const { pizzaSize, PizzaFlavours } = location.state;
  const { name, slices, flavours } = pizzaSize;

  return (
    <Grid container>
      <OrderContainer>
        <Typography>
          <b>{userInfo.user.firstName}, seu pedido é:</b>
        </Typography>
        <Typography>
          Pizza <b>{name.toUpperCase()}</b> - ({slices} fatias, {flavours}{" "}
          {singularOrPlural(flavours, "sabor", "sabores")})
        </Typography>
        {PizzaFlavours && (
          <Typography>
            {singularOrPlural(PizzaFlavours.length, "no sabor", "nos sabores")}{" "}
            <b>{PizzaFlavours.map(({ name }) => name).join(", ")}</b>
          </Typography>
        )}
      </OrderContainer>
      <ButtonsContainer>
        <Button
          {...buttons.back}
          component="a"
          onClick={(e) => {
            e.preventDefault();
            history.goBack();
          }}
        />
        <Button {...buttons.action} color="primary" component={Link} />
      </ButtonsContainer>
    </Grid>
  );
}

const OrderContainer = styled(Grid).attrs({ item: true })`
  flex-grow: 1;
`;

const Button = styled(MaterialButton).attrs({
  variant: "contained",
})`
  margin-left: ${({ theme }) => theme.spacing(2)}px;
`;

const ButtonsContainer = styled(Grid).attrs({ itens: true })`
  display: flex;
  align-items: center;
`;

export default withRouter(FooterWithOrderAndButtons);
